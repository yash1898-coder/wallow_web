import React, { useEffect, useState } from "react"
import {
    containsSpecialChars,
    formatDate,
    getCurrentTimestamp,
    getGroupedByUpdatedDate,
    getJumpToOptionsUpdatedAt,
    getTodayOrYesterdayDate,
    isDateToday,
    onJumpToUpdatedAt,
    pageSpinnerStyle,
    stringToDate,
} from "../../utils"
import { JumpToDropdown } from "../../components/JumpToDropdown"
import { NoDataImpediments } from "../../components/NoDataPlaceholders/NoDataImpediments"
import { useEditProductStore } from "../../stores/useEditProductStore"
import {
    deleteImpedimentReply,
    editImpedimentReply,
    getImpediments,
    replyToImpediment,
} from "../../api/impediments"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Spinner } from "../../components/Spinner"
import { ErrorMessage } from "../../components/ErrorMessage"
import { Pfp } from "../../components/Pfp"
import { useHighlightImpactCard } from "../../hooks/useHighlightImpactCard"
import { useStore } from "../../stores/useStore"
import { ReplyButton } from "../../components/ReplyButton"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { ThreadModal } from "../../components/Modals/ThreadModal"
import { useThreadStore } from "../../stores/useThreadStore"
import { RepliesCount } from "../../components/RepliesCount"
import { useAuthStore } from "../../stores/useAuthStore"

export const DashboardImpediments = () => {
    const { modals, animatedImpactCard } = useStore()
    const { editingProduct } = useEditProductStore()
    const { feedbackItem, setFeedbackItem, formData } = useThreadStore()
    const { user } = useAuthStore()

    const queryClient = useQueryClient()

    const queryKey = ["impediments", editingProduct.id]

    const {
        isLoading,
        error,
        data: impediments,
    } = useQuery(queryKey, () => getImpediments(editingProduct.id), {
        retry: false,
    })

    const { error: replyError, mutate: onReplyToFeedback } = useMutation(
        () =>
            replyToImpediment({
                DailyImpediments: feedbackItem.id,
                reply: formData.message,
            }),
        {
            onMutate: async () => {
                await queryClient.cancelQueries(queryKey)

                const prevData = queryClient.getQueryData(queryKey)

                const newReply = {
                    DailyImpediment: feedbackItem.id,
                    reply: formData.message,
                    created_at: getCurrentTimestamp(),
                    User: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        profile_image: user.profile_image,
                    },
                }

                queryClient.setQueryData(
                    queryKey,
                    prevData.map((item) =>
                        item.id === feedbackItem.id
                            ? {
                                  ...item,
                                  impediment_replies: [
                                      ...item.impediment_replies,
                                      newReply,
                                  ],
                              }
                            : item
                    )
                )
                return {
                    prevData,
                }
            },
            onError: (_error, _, context) => {
                if (context?.prevData) {
                    queryClient.setQueryData(queryKey, context.prevData)
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey)
            },
        }
    )

    const {
        isLoading: editReplyLoading,
        error: editReplyError,
        mutate: onEditFeedbackReply,
    } = useMutation(({ id, reply }) => editImpedimentReply(id, reply), {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey)
        },
    })

    const {
        isLoading: deleteReplyLoading,
        error: deleteReplyError,
        mutate: onDeleteFeedbackReply,
    } = useMutation((id) => deleteImpedimentReply(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey)
        },
    })

    useEffect(() => {
        if (impediments && feedbackItem) {
            const found = impediments.find((i) => i.id === feedbackItem.id)
            if (found) {
                setFeedbackItem({
                    ...found,
                    Replies: found.impediment_replies,
                })
            }
        }
    }, [impediments])

    useEffect(() => {
        if (animatedImpactCard && !containsSpecialChars(animatedImpactCard)) {
            const target = document.querySelector(
                `#impediment-${animatedImpactCard}`
            )
            if (target && !isLoading) {
                target.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [animatedImpactCard, isLoading])

    useHighlightImpactCard()

    if (!isLoading && impediments?.length < 1) {
        return <NoDataImpediments />
    }

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <div
            style={{ paddingBlock: "1.5rem" }}
            className="dashboard-impediments flow"
            data-spacing="small"
        >
            <ModalWrapper open={modals["thread"]}>
                <ThreadModal
                    deleteError={deleteReplyError}
                    deleteLoading={deleteReplyLoading}
                    onDelete={onDeleteFeedbackReply}
                    editError={editReplyError}
                    onEdit={onEditFeedbackReply}
                    editLoading={editReplyLoading}
                    error={replyError}
                    onSubmit={onReplyToFeedback}
                />
            </ModalWrapper>
            {Object.values(
                getGroupedByUpdatedDate(
                    impediments
                        .sort((a, b) => {
                            return (
                                new Date(b.updated_at) - new Date(a.updated_at)
                            )
                        })
                        .map((i) => ({
                            ...i,
                            updated_at: stringToDate(i.updated_at),
                        }))
                )
            ).map((impediment, idx) => (
                <React.Fragment key={idx}>
                    <JumpToDropdown
                        onJumpTo={(timePeriod) =>
                            onJumpToUpdatedAt(
                                timePeriod,
                                impediments.map((i) => ({
                                    ...i,
                                    updated_at: stringToDate(i.updated_at),
                                }))
                            )
                        }
                        options={getJumpToOptionsUpdatedAt(
                            impediments.map((i) => ({
                                ...i,
                                updated_at: stringToDate(i.updated_at),
                            }))
                        )}
                        placeholder={getTodayOrYesterdayDate(
                            impediment[0].updated_at
                        )}
                    />
                    {impediment.map((item) => (
                        <ImpedimentItem
                            id={impediment[0].updated_at.setHours(0, 0, 0, 0)}
                            key={item.id}
                            item={item}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

const ImpedimentItem = ({ item, id }) => {
    const { animatedImpactCard } = useStore()
    const uniqueUsersMap = new Map()

    item.impediment_statement.forEach((currentObject) => {
        const userId = currentObject.user.id

        if (uniqueUsersMap.has(userId)) {
            uniqueUsersMap.get(userId).statement.push({
                text: currentObject.statement,
                created_at: currentObject.created_at,
            })

            // Sort statements array for this user
            uniqueUsersMap.get(userId).statement.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at)
            })
        } else {
            uniqueUsersMap.set(userId, {
                user: currentObject.user,
                statement: [
                    {
                        text: currentObject.statement,
                        created_at: currentObject.created_at,
                    },
                ],
            })
        }
    })

    const uniqueUsersWithMergedStatement = Array.from(uniqueUsersMap.values())

    const statementsToday = uniqueUsersWithMergedStatement.flatMap((entry) => {
        const user = entry.user

        const todayStatements = entry.statement.filter((statement) => {
            const statementDate = new Date(statement.created_at)
            return isDateToday(statementDate)
        })

        if (todayStatements.length > 0) {
            return {
                user,
                statement: todayStatements,
            }
        } else {
            return []
        }
    })

    const statementsNotToday = uniqueUsersWithMergedStatement.flatMap(
        (entry) => {
            const user = entry.user

            const notTodayStatements = entry.statement.filter((statement) => {
                const statementDate = new Date(statement.created_at)
                return !isDateToday(statementDate)
            })

            if (notTodayStatements.length > 0) {
                return {
                    user,
                    statement: notTodayStatements,
                }
            } else {
                return []
            }
        }
    )

    return (
        <div
            className={`impact-card hover-card-wrapper`}
            id={`impediment-${item.id}`}
        >
            <div
                id={id}
                className="container impact-card__content card-bg  flow"
            >
                <div className="flex ">
                    <p
                        className={` ${
                            animatedImpactCard === item.id.toString()
                                ? "text-yellow"
                                : ""
                        }`}
                    >
                        {item.impediment_summary}
                    </p>
                    <ReplyButton
                        feedbackItem={{
                            ...item,
                            Replies: item.impediment_replies,
                        }}
                    />
                </div>
                <div className="flex flex-wrap">
                    {statementsToday.length > 0 && (
                        <>
                            <div
                                className={
                                    "impact-card__pfps flex impact-card__tooltip-wrapper"
                                }
                            >
                                {statementsToday.map((item, idx) => (
                                    <ImpedimentStatement
                                        item={item}
                                        key={idx}
                                    />
                                ))}
                            </div>
                            <p>
                                {statementsToday.length}{" "}
                                {statementsToday.length === 1
                                    ? "user was"
                                    : "users were"}{" "}
                                impacted today.
                            </p>
                        </>
                    )}
                </div>
                <div className="flex flex-wrap">
                    {statementsNotToday.length > 0 && (
                        <>
                            <div
                                className={
                                    "impact-card__pfps flex impact-card__tooltip-wrapper"
                                }
                            >
                                {statementsNotToday.map((item, idx) => (
                                    <ImpedimentStatement
                                        item={item}
                                        key={idx}
                                    />
                                ))}
                            </div>
                            <p>
                                {statementsNotToday.length}{" "}
                                {statementsNotToday.length === 1
                                    ? "user was"
                                    : "users were"}{" "}
                                impacted in the past.
                            </p>
                        </>
                    )}
                </div>
                <div className="flex justify-between message-card__replies">
                    <RepliesCount
                        feedbackItem={{
                            ...item,
                            Replies: item.impediment_replies,
                        }}
                        replies={item.impediment_replies}
                    />
                </div>
            </div>
        </div>
    )
}

const ImpedimentStatement = ({ item }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)

    return (
        <div
            onMouseOver={() => setTooltipVisible(true)}
            onMouseOut={() => setTooltipVisible(false)}
            onClick={() => setTooltipVisible((visible) => !visible)}
        >
            <Pfp img={item.user.profile_image} />
            <div
                className="impact-card__tooltip tooltip"
                data-visible={tooltipVisible}
            >
                <div className="flow">
                    {item.statement.map((s, idx) => (
                        <p key={idx}>
                            {s.text}{" "}
                            <span className=" fs-200">
                                &mdash; {formatDate(stringToDate(s.created_at))}
                            </span>
                        </p>
                    ))}
                    <div
                        className="flex fs-300 "
                        style={{ marginTop: "1rem" }}
                    >
                        <Pfp img={item.user.profile_image} />{" "}
                        {item.user.first_name} {item.user.last_name}
                    </div>
                </div>
            </div>
        </div>
    )
}
