import React, { useRef, useEffect, useState } from "react"
import {
    formatDateTimestamp,
    getCurrentTimestamp,
    getGroupedByDate,
    getJumpToOptions,
    getTodayOrYesterdayDate,
    onJumpTo,
    pageSpinnerStyle,
    setFirstStringToEmptyIfStartsWithSecond,
    stringToDate,
} from "../../utils"
import { useNavigate, useParams } from "react-router-dom"
import { ReactComponent as Send } from "../../assets/send.svg"
import { ReactComponent as Close } from "../../assets/close.svg"
import { useInputValidation } from "../../hooks/useInputValidation"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { useStore } from "../../stores/useStore"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
    deleteFeedbackReply,
    deleteTeam,
    editFeedbackReply,
    getDailyScrum,
    getTeam,
    getTeamMembers,
    getTeamWithChart,
    inviteToTeam,
    inviteToTeamCheck,
    replyToFeedback,
    submitFeedback,
} from "../../api/teams"
import { Spinner } from "../../components/Spinner"
import { ThreadModal } from "../../components/Modals/ThreadModal"
import { useThreadStore } from "../../stores/useThreadStore"
import { NoFeedbackCard } from "../../components/NoFeedbackCard"
import { JumpToDropdown } from "../../components/JumpToDropdown"
import { useErrorToast } from "../../hooks/useErrorToast"
import { Pfp } from "../../components/Pfp"
import { ReplyButton } from "../../components/ReplyButton"
import { RepliesCount } from "../../components/RepliesCount"
import { useAuthStore } from "../../stores/useAuthStore"
import { FileButton } from "../../components/FileButton"
import { useImagePreviewStore } from "../../stores/useImagePreviewStore"
import { MentionDropdown } from "../../components/MentionDropdown"
import { db } from "../../firebase"
import { Howl } from "howler"
import notificationSound from "/notification.mp3"

import { doc, onSnapshot } from "firebase/firestore"
import moment from "moment"
import { usePopover } from "../../hooks/usePopover"
import { PeopleButton } from "../../components/PeopleButton"
import { Popup } from "../../components/Popup"
import { EditTeamModal } from "../../components/Modals/EditTeamModal"
import { MembersModal } from "../../components/Modals/MembersModal"
import { AddPeopleModal } from "../../components/Modals/AddPeopleModal"
import { SendInviteModal } from "../../components/Modals/SendInviteModal/SendInviteModal"
import { DeletionConfirmationModal } from "../../components/Modals/DeletionConfirmationModal"
import { useEditTeamStore } from "../../stores/useEditTeamStore"
import { TeamFunctionIcon } from "../../components/TeamFunctionIcon"
import { timezoneOptions } from "../../stores/useCreateTeamStore"

export const Team = () => {
    const { modals, openModal, openToast, closeModal } = useStore()
    const { id } = useParams()
    const { user } = useAuthStore()
    const { feedbackItem, setFeedbackItem, formData } = useThreadStore()
    const [feedback, setFeedback] = useState("")
    const [img, setImg] = useState(undefined)
    const { setEditingTeam } = useEditTeamStore()
    const navigate = useNavigate()

    useQuery(["teams", id], () => getTeamWithChart(id), {
        retry: false,
        refetchOnWindowFocus: true,
        onSuccess: (team) => {
            setEditingTeam({
                ...team,
                label: team.team_name,
                value: team.team_name,
                id: team.team_id,
                duration: { value: team.duration },
                function: {
                    value: team.function,
                    icon: (
                        <TeamFunctionIcon
                            team={team.function}
                            color={team.color}
                        />
                    ),
                },
                timezone: {
                    value: team.timezone,
                    label: timezoneOptions?.find(
                        (t) => t.value === team.timezone
                    )?.label,
                },
            })
        },
    })

    const [sound, setSound] = useState(null)
    const prefCharFeedback = useRef(null)

    const { data: team } = useQuery(["teams", id], () => getTeam(id), {
        retry: false,
        refetchOnWindowFocus: true,
    })

    const { error: submitFeedbackError, mutate: onSubmitFeedback } =
        useMutation(() => submitFeedback({ Team: id, feedback, image: img }), {
            onMutate: async () => {
                // Stop the queries that may affect this operation
                await queryClient.cancelQueries(teamFeedbackQueryKey)

                const prevData = queryClient.getQueryData(teamFeedbackQueryKey)

                const newFeedback = {
                    feedback,
                    Replies: [],
                    created_at: getCurrentTimestamp(),
                    repliesNotReady: true,
                    image: img,
                    User: {
                        first_name: user.first_name,
                        profile_image: user.profile_image,
                    },
                }

                queryClient.setQueryData(teamFeedbackQueryKey, {
                    ...prevData,
                    All: [newFeedback, ...prevData.All],
                })

                setFeedback("")
                setImg(undefined)

                return {
                    prevData,
                }
            },
            onError: (_error, _, context) => {
                if (context?.prevData) {
                    queryClient.setQueryData(
                        teamFeedbackQueryKey,
                        context.prevData
                    )
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries(teamFeedbackQueryKey)
            },
        })

    const {
        popoverFocused,
        popoverQuery,
        popoverVisible,
        onKeyDown,
        onKeyUp,
        setPopoverVisible,
    } = usePopover({
        prevCharRef: prefCharFeedback,
        onSubmit: onSubmitFeedback,
        value: feedback,
    })

    const queryClient = useQueryClient()
    const containerRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {
        // Load the sound file when the component mounts
        const sound = new Howl({
            //   src: [require('../../assets/sound/notification.mp3')], // Replace with the path to your sound file
            src: ["/notification.mp3"], // Replace with the path to your sound file
            autoplay: false,
            loop: false,
            volume: 0.5,
            //   onend: function() {
            //     console.log('Finished!');
            //   }
        })
        setSound(sound)

        return () => {
            // Clean up the sound when the component unmounts
            sound.unload()
        }
    }, [])

    useEffect(() => {
        const sound = new Howl({
            src: ["/notification.mp3"],
            autoplay: false,
            loop: false,
            volume: 0.5,
        })
        setSound(sound)

        return () => {
            sound.unload()
        }
    }, [])

    const teamFeedbackQueryKey = ["teams", "analysis", id]

    const { isLoading: dailyScrumLoading, data: dailyScrum } = useQuery(
        teamFeedbackQueryKey,
        () => getDailyScrum(id),
        {
            retry: false,
        }
    )

 const [dailyScrumStringDates, setDailyScrumStringDates] = useState([])
    

    useEffect(() => {
        const fetchedMessages = []
        const unsubscribe = onSnapshot(
            doc(db, "chat", id?.toString()),
            (doc) => {
                const fetchedMessages2 = []
                fetchedMessages.push(doc.data()?.chat)
                fetchedMessages2.push(doc.data()?.chat)

                const sortedMessages =
                    fetchedMessages2[0]?.sort((a, b) => {
                        const dateA = moment(a.created_at)
                        const dateB = moment(b.created_at)

                        if (dateA.isBefore(dateB)) return 1
                        if (dateA.isAfter(dateB)) return -1
                        return 0
                    }) ?? []

                // if (sortedMessages[0]?.User.email !== user?.email) {
                //     audioRef.current.play()
                // }

                setDailyScrumStringDates(
                    sortedMessages
                        ?.map((i) => ({
                            ...i,
                            created_at: stringToDate(
                                moment(
                                    i.created_at,
                                    "YYYY-MM-DD HH:mm:ss.SSSSSSZ"
                                ).format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")
                            ),
                            timestamp: i.created_at,
                        }))
                        .reverse()
                )

                const newItem = sortedMessages?.find((i) => i.id?.toString() == feedbackItem?.id?.toString())
                
                if(newItem){
                    setFeedbackItem({...feedbackItem, Replies:newItem?.replies })
                }
               
            }
        )

        return () => {
            unsubscribe()
        }
    }, [db, id, user?.email])

    const { error: replyError, mutate: onReplyToFeedback } = useMutation(
        () =>
            replyToFeedback({
                FeedBack: feedbackItem.id,
                reply: formData.message,
            }),
        {
            onMutate: async () => {
                await queryClient.cancelQueries(teamFeedbackQueryKey)

                const prevData = queryClient.getQueryData(teamFeedbackQueryKey)

                const newReply = {
                    FeedBack: feedbackItem.id,
                    reply: formData.message,
                    created_at: getCurrentTimestamp(),
                    User: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        profile_image: user.profile_image,
                    },
                }

                queryClient.setQueryData(teamFeedbackQueryKey, {
                    ...prevData,
                    All: prevData.All.map((item) =>
                        item.id === feedbackItem.id
                            ? { ...item, Replies: [...item.Replies, newReply] }
                            : item
                    ),
                })

                return {
                    prevData,
                }
            },
            onError: (_error, _, context) => {
                if (context?.prevData) {
                    queryClient.setQueryData(
                        teamFeedbackQueryKey,
                        context.prevData
                    )
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries(teamFeedbackQueryKey)
            },
        }
    )

    const {
        isLoading: editReplyLoading,
        error: editReplyError,
        mutate: onEditFeedbackReply,
    } = useMutation(({ id, reply }) => editFeedbackReply(id, reply), {
        onSuccess: () => {
            queryClient.invalidateQueries(teamFeedbackQueryKey)
        },
    })

    const {
        isLoading: deleteReplyLoading,
        error: deleteReplyError,
        mutate: onDeleteFeedbackReply,
    } = useMutation((id) => deleteFeedbackReply(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(teamFeedbackQueryKey)
        },
    })

    useEffect(() => {
        if (dailyScrum && feedbackItem) {

            const newItem = dailyScrum.All.find((i) => i.id?.toString() === feedbackItem.id?.toString())
       
            if (newItem) {
                setFeedbackItem({ ...newItem, Replies: newItem.Replies ?? [] })
            }
        }
    }, [dailyScrum, dailyScrumStringDates])

    const feedbackRef = useRef()
    const { makeValid, checkValidity, invalid } =
        useInputValidation(feedbackRef)

    useErrorToast(submitFeedbackError)

    const onImageChange = (e) => {
        if (e.target.files === null || e.target.files.length === 0) return

        setImg(e.target.files[0])
    }

    const onFeedbackChange = (e) => {
        const { value } = e.target
        makeValid()
        setFeedback(value)
    }

    useEffect(() => {
        if (dailyScrumStringDates.length > 0) {
            document.documentElement.scrollTop =
                document.documentElement.scrollHeight
        }
    }, [dailyScrumStringDates])

    const { isLoading: isMembersLoading, data: members } = useQuery(
        ["teams", "members", team?.team_id],
        () => getTeamMembers(team?.team_id),
        { retry: false }
    )

    const getPopupOptions = () => {
        if (team?.role === "Team Manager") {
            return [
                {
                    title: "Edit team",
                    onClick: () => openModal("editTeam"),
                },
                {
                    title: "Delete team",
                    onClick: () => openModal("deletionConfirmation"),
                },
                {
                    title: "Transfer ownership",
                    onClick: () =>
                        navigate(`/dashboard/teams/${id}/transfer-ownership`),
                },
            ]
        } else if (
            team?.role === "Team Manager" ||
            team?.role.includes("Organization")
        ) {
            return [
                {
                    title: "Edit team",
                    onClick: () => openModal("editTeam"),
                },
                {
                    title: "Delete team",
                    onClick: () => openModal("deletionConfirmation"),
                },
            ]
        } else {
            return []
        }
    }

    const {
        isLoading: isSendInviteLoading,
        error: sendInviteError,
        mutate: onSend,
    } = useMutation((value) => inviteToTeam({ team_id: id, email: value }), {
        onSuccess: () => {
            queryClient.invalidateQueries(["teams"])
            queryClient.invalidateQueries(["teams", "invite"])
            openToast({ text: "Invite(s) sent!" })
            closeModal("sendInviteTeam")
            closeModal("addPeople")
        },
    })

    const {
        isLoading: deleteTeamLoading,
        error,
        mutate: onDelete,
    } = useMutation(() => deleteTeam(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["teams", id])
            queryClient.invalidateQueries(["teams"])
            setEditingTeam(undefined)
            openToast({ text: "Team deleted!" })
            closeModal("deletionConfirmation")
            navigate("/dashboard/progress")
        },
    })

    return (
        <>
            <ModalWrapper open={modals["members"]}>
                <MembersModal
                    teamManager={team?.role === "Team Manager"}
                    canDelete={
                        team?.role === "Team Manager" ||
                        team?.role.includes("Organization")
                    }
                    name={team?.team_name}
                    members={members}
                    sendInviteModal={"sendInviteTeam"}
                />
            </ModalWrapper>

            <ModalWrapper open={modals["addPeople"]}>
                <AddPeopleModal
                    inviteTo={team?.team_name}
                    existingMembers={team?.members}
                    sendInviteModal={"sendInviteTeam"}
                    onSubmit={onSend}
                />
            </ModalWrapper>

            <ModalWrapper open={modals["editTeam"]}>
                <EditTeamModal
                    team={team}
                    id={id}
                />
            </ModalWrapper>
            {(team?.role === "Team Manager" ||
                team?.role.includes("Organization")) && (
                <ModalWrapper open={modals["deletionConfirmation"]}>
                    <DeletionConfirmationModal
                        isLoading={deleteTeamLoading}
                        modal={"deletionConfirmation"}
                        error={error}
                        onClick={onDelete}
                        toDelete={team?.team_name}
                    />
                </ModalWrapper>
            )}

            <ModalWrapper open={modals["sendInviteTeam"]}>
                <SendInviteModal
                    members={members}
                    isLoading={isSendInviteLoading}
                    sendInviteError={sendInviteError}
                    onSend={onSend}
                    id={id}
                    onCheckForOrgMember={(value, id) =>
                        inviteToTeamCheck(value, id)
                    }
                    modal={"sendInviteTeam"}
                    inviteTo={team?.team_name}
                />
            </ModalWrapper>

            <div className="dashboard-team-form container">
                <form
                    className="dashboard-team-form__form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmitFeedback()
                    }}
                >
                    <div className="dashboard-team-form__input-wrapper">
                        <p className="dashboard-team-form__char-limit">
                            {feedback.length} / 500
                        </p>
                        <FileButton onChange={onImageChange} />
                        <button
                            onClick={() => {
                                checkValidity()
                            }}
                            className="dashboard-team-form__button"
                            disabled={feedback.length === 0}
                        >
                            <Send />
                        </button>
                        <textarea
                            onPaste={(evt) => {
                                const dT =
                                    evt.clipboardData || window.clipboardData
                                const file = dT.files[0]
                                setImg(file)
                            }}
                            maxLength={500}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                            ref={feedbackRef}
                            value={feedback}
                            onChange={onFeedbackChange}
                            required
                            name="feedback"
                            className={`input ${invalid ? "invalid" : ""}`}
                            type="text"
                            id="feedback"
                            placeholder="Message"
                        />
                        <MentionDropdown
                            focused={popoverFocused}
                            textareaRef={feedbackRef}
                            query={popoverQuery}
                            onChange={(name) =>
                                setFeedback((prev) =>
                                    setFirstStringToEmptyIfStartsWithSecond(
                                        prev,
                                        name
                                    )
                                )
                            }
                            setOpen={setPopoverVisible}
                            open={popoverVisible}
                        />
                    </div>
                </form>
                {img && (
                    <div className="dashboard-team-form__img-wrapper">
                        <button onClick={() => setImg(undefined)}>
                            <Close />
                        </button>
                        <img src={URL.createObjectURL(img)} />
                    </div>
                )}
            </div>
            {dailyScrumLoading  ? (
                <Spinner style={pageSpinnerStyle} />
            ) : (
                <div
                    className=" dashboard-team"
                    style={{
                        backgroundColor: "#fff",
                    }}
                >
                    <div className="dashboard-team__header">
                        <div className="container">
                            <div className="flex dashboard-page-header">
                                <h1 className="fs-700 fw-700">
                                    {team?.team_name}
                                </h1>
                                {(team?.role === "Team Manager" ||
                                    team?.role.includes("Organization")) && (
                                    <Popup options={getPopupOptions()} />
                                )}
                            </div>
                            <div className="flex">
                                <PeopleButton
                                    isLoading={isMembersLoading}
                                    onClick={() => openModal("members")}
                                    people={members ?? []}
                                />
                                <button
                                    onClick={() => openModal("addPeople")}
                                    className="button"
                                >
                                    Add people
                                </button>
                            </div>
                        </div>
                    </div>
                    <ModalWrapper open={modals["thread"]}>
                        <ThreadModal
                            error={replyError}
                            deleteError={deleteReplyError}
                            deleteLoading={deleteReplyLoading}
                            onDelete={onDeleteFeedbackReply}
                            editError={editReplyError}
                            onEdit={onEditFeedbackReply}
                            editLoading={editReplyLoading}
                            onSubmit={onReplyToFeedback}
                        />
                    </ModalWrapper>

                    {dailyScrumLoading  ? (
                        <Spinner className="mt" />
                    ) : dailyScrum?.All?.length < 1 ? (
                        <div
                            className="container"
                            style={{ marginTop: "2rem" }}
                        >
                            <NoFeedbackCard text={"Radio silence"} />
                        </div>
                    ) : (
                        <section
                            ref={containerRef}
                            className=" flow"
                            data-spacing="small"
                        >
                            {Object.values(
                                getGroupedByDate(dailyScrumStringDates ?? [])
                            ).map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <JumpToDropdown
                                        onJumpTo={(timePeriod) =>
                                            onJumpTo(
                                                timePeriod,
                                                dailyScrumStringDates
                                            )
                                        }
                                        options={getJumpToOptions(
                                            dailyScrumStringDates
                                        )}
                                        placeholder={getTodayOrYesterdayDate(
                                            item[0].created_at
                                        )}
                                    />
                                    {item.map((i, idx) => (
                                        <FeedbackItem
                                            id={item[0].created_at.setHours(
                                                0,
                                                0,
                                                0,
                                                0
                                            )}
                                            key={idx}
                                            item={i}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </section>
                    )}
                </div>
            )}

            <audio
                ref={audioRef}
                src={notificationSound}
                preload="auto"
            />
        </>
    )
}

const FeedbackItem = ({ item, id }) => {
    const { User } = item || {}
    const Replies = item?.replies ?? [];
    const { openModal } = useStore()
    const { onCurrentImageChange } = useImagePreviewStore()

    const feedbackItem = { ...item, Replies: item.replies ?? [] }

    console.log('Get Replyyy>>',item)

    return (
        <div
            id={id}
            className="hover-card-wrapper "
            style={{ paddingBlock: "2.75rem" }}
        >
            <div
                className={`message-card container flow`}
                data-spacing="extrasmall"
            >
                <div className="flex">
                    <Pfp
                        className="message-card__img"
                        img={User.profile_image&&`https://44.209.155.89${User.profile_image}`}
                        name={User.first_name}
                    />
                    <div className="message-card__content">
                        <div className="message-card__labels">
                            {item.new_blockers && (
                                <small className="message-card__label red">
                                    Blocked
                                </small>
                            )}
                            {item.new_impediments && (
                                <small className="message-card__label yellow">
                                    Impediment
                                </small>
                            )}
                            {item.progress && (
                                <small className="message-card__label progress">
                                    Progress
                                </small>
                            )}
                            {item.blockers && (
                                <small className="message-card__label red">
                                    Blocker match
                                </small>
                            )}
                            {item.impediments && (
                                <small className="message-card__label yellow">
                                    Impediment match
                                </small>
                            )}
                        </div>
                        <div
                            className="flex message-card__header"
                            style={{ "--gap": ".5rem" }}
                        >
                            <div className="message-card__name-label-wrapper">
                                <div className="flex">
                                    <h3 className="fw-600 message-card__title">
                                        {User.first_name}
                                    </h3>
                                    <span className=" fs-200">
                                        {formatDateTimestamp(item.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p
                            className=""
                            dangerouslySetInnerHTML={{ __html: item.feedback }}
                        ></p>
                        {item.image && (
                            <button
                                className="message-card__image-attachment mt"
                                onClick={() => {
                                    onCurrentImageChange(item.image)
                                    openModal("imagePreview")
                                }}
                            >
                                <img
                                    style={{ "--margin": ".5rem" }}
                                    src={item.image}
                                    alt={``}
                                />
                            </button>
                        )}
                        {!item.repliesNotReady && (
                            <div className="flex justify-between message-card__replies">
                                <RepliesCount
                                    feedbackItem={feedbackItem}
                                    replies={Replies}
                                />
                            </div>
                        )}
                    </div>
                    {!item.repliesNotReady && (
                        <ReplyButton feedbackItem={feedbackItem} />
                    )}
                </div>
            </div>
        </div>
    )
}
