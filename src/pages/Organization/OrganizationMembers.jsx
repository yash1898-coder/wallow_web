import { useStore } from "../../stores/useStore"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { useState } from "react"
import { DeactivateUserModal } from "../../components/Modals/DeactivateUserModal"
import { ChangeAccountTypeModal } from "../../components/Modals/ChangeAccountTypeModal"
import { TransferOwnershipModal } from "../../components/Modals/TransferOwnershipModal"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Spinner } from "../../components/Spinner"
import { deleteProductMember } from "../../api/products"
import { Tooltip } from "../../components/Tooltip"
import { Pfp } from "../../components/Pfp"
import { truncate } from "../../utils"
import { Popup } from "../../components/Popup"
import { useAuthStore } from "../../stores/useAuthStore"
import { useErrorToast } from "../../hooks/useErrorToast"
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal"
import {
    activateOrganizationMember,
    changeOrganizationMemberAccountType,
    deactivateOrganizationMember,
    getOrganizationMembers,
} from "../../api/organization"
import { useNavigate } from "react-router-dom"

export const OrganizationMembers = () => {
    const { openModal, closeModal, openToast, modals } = useStore()
    const { user } = useAuthStore()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [clickedUser, setClickedUser] = useState(undefined)

    const { isLoading, data: membersData } = useQuery(
        ["organization", "members"],
        () => getOrganizationMembers(),
        {
            retry: false,
        }
    )

    const {
        isLoading: deactivateLoading,
        error: deactivateError,
        mutate: onDeactivate,
    } = useMutation(() => deactivateOrganizationMember(clickedUser.id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["organization", "members"])
            openToast({ text: "User deactivated!" })
            closeModal("deactivateUser")
        },
    })

    const {
        isLoading: deleteLoading,
        error: deleteError,
        mutate: onDelete,
    } = useMutation(() => deleteProductMember(clickedUser.id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["organization", "members"])
            openToast({ text: "User deleted!" })
            closeModal("deleteUser")
        },
    })
    const {
        isLoading: activateLoading,
        error: activateError,
        mutate: onActivate,
    } = useMutation(() => activateOrganizationMember(clickedUser.id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["organization", "members"])
            openToast({ text: "User activated!" })
            closeModal("activateUser")
        },
    })
    useErrorToast(activateError)

    const {
        isLoading: changeAccountTypeLoading,
        error: changeAccountTypeError,
        mutate: onChangeAccountType,
    } = useMutation(
        () =>
            changeOrganizationMemberAccountType({
                id: membersData.Organization.id,
                email: clickedUser.email,
                role: accountType.value,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["organization", "members"])
                openToast({ text: "Account type changed!" })
                closeModal("changeAccountType")
            },
        }
    )

    const accountTypeOptions = [
        {
            value: "Organization Owner",
            subtitle:
                "Can modify billing information and manage organization members",
        },
        {
            value: "Full Member",
            subtitle:
                "Can make standard API requests and read basic organizational data",
        },
    ]

    const [accountType, setAccountType] = useState(accountTypeOptions[0])

    const getOptions = (item) => {
        const { id, is_active } = item.User

        let options = []

        if (user.id === id) {
            options = [
                ...options,
                {
                    title: "Edit your profile",
                    onClick: () => openModal("editProfile"),
                },
            ]
        }
        if (
            user.role.includes("Owner") &&
            id !== user.id &&
            item.role !== "Primary Organization Owner"
        ) {
            options = [
                ...options,
                {
                    title: "Change account type",
                    onClick: () => openModal("changeAccountType"),
                },
            ]
        }
        if (user.role === "Primary Organization Owner" && id === user.id) {
            options = [
                ...options,
                {
                    title: "Transfer ownership",
                    onClick: () => navigate("/organization/transfer-ownership"),
                },
            ]
        }
        if (
            is_active &&
            id !== user.id &&
            item.role !== "Primary Organization Owner"
        ) {
            options = [
                ...options,
                {
                    title: "Deactivate Account",
                    color: "var(--clr-red-700)",
                    onClick: () => openModal("deactivateUser"),
                },
            ]
        }
        if (!is_active) {
            options = [
                ...options,
                {
                    title: "Activate Account",
                    color: "var(--clr-green-700)",
                    isLoading: activateLoading,
                    onClick: () => onActivate(),
                },
                {
                    title: "Delete Account",
                    color: "var(--clr-red-700)",
                    onClick: () => openModal("deleteUser"),
                },
            ]
        }
        return options
    }

    return (
        <div
            className="container container--lg "
            style={{ paddingTop: "5rem" }}
        >
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700">Members</h1>
                {user.role.includes("Owner") && (
                    <button
                        className="button button--green"
                        onClick={() => openModal("sendInviteOrganization")}
                    >
                        Invite People
                    </button>
                )}

                <ModalWrapper open={modals["deactivateUser"]}>
                    <DeactivateUserModal
                        onSubmit={onDeactivate}
                        error={deactivateError}
                        isLoading={deactivateLoading}
                    />
                </ModalWrapper>
                <ModalWrapper open={modals["deleteUser"]}>
                    <DeleteUserModal
                        onSubmit={onDelete}
                        error={deleteError}
                        user={clickedUser}
                        isLoading={deleteLoading}
                    />
                </ModalWrapper>
                <ModalWrapper open={modals["changeAccountType"]}>
                    <ChangeAccountTypeModal
                        isLoading={changeAccountTypeLoading}
                        error={changeAccountTypeError}
                        user={clickedUser ?? ""}
                        options={accountTypeOptions}
                        onChange={(o) => setAccountType(o)}
                        accountType={accountType}
                        onSubmit={onChangeAccountType}
                    />
                </ModalWrapper>
            </div>
            <div
                className="mt flow"
                style={{
                    display: isLoading ? "flex" : "",
                    paddingTop: isLoading ? "5rem" : "",
                    justifyContent: "center",
                }}
            >
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="members-table">
                            <div className="members-table__caption">
                                <p>
                                    {membersData?.Members.length}{" "}
                                    {membersData?.Members.length === 1
                                        ? "member"
                                        : "members"}
                                </p>
                                <button className="button-reset link">
                                    Export full member list
                                </button>
                            </div>
                            <div className="members-table__header">
                                <h3>
                                    <span className="members-table__header-item">
                                        Full name
                                    </span>
                                </h3>
                                <h3>
                                    <span className="members-table__header-item">
                                        Email address
                                    </span>
                                </h3>
                                <h3>
                                    <span className="members-table__header-item">
                                        Account type
                                    </span>
                                </h3>
                                <h3>
                                    <span className="members-table__header-item">
                                        Status
                                    </span>
                                </h3>
                            </div>
                            <div className="members-table__body">
                                {membersData?.Members.length === 0 ? (
                                    <p style={{ margin: ".75rem" }}>
                                        No members yet.
                                    </p>
                                ) : (
                                    membersData?.Members.map((item, idx) => {
                                        const {
                                            first_name,
                                            last_name,
                                            id,
                                            email,
                                            profile_image,
                                            is_active,
                                        } = item.User
                                        const fullName = `${first_name} ${last_name}`

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setClickedUser(item.User)
                                                    const userRole = item.role
                                                    setAccountType(
                                                        accountTypeOptions.find(
                                                            (o) =>
                                                                o.value ===
                                                                userRole
                                                        )
                                                    )
                                                }}
                                                data-highlighted={
                                                    id === user.id || !is_active
                                                }
                                                className="members-table__row font-semibold text-white"
                                            >
                                                <div className="fw-600">
                                                    <span className="members-table__row-item justify-between">
                                                        <span className="flex">
                                                            <span
                                                                className="flex members-table__row-text"
                                                                style={{
                                                                    "--gap":
                                                                        ".75rem",
                                                                }}
                                                            >
                                                                <Pfp
                                                                    name={
                                                                        item[
                                                                            "Full Name"
                                                                        ]
                                                                    }
                                                                    img={
                                                                        profile_image
                                                                    }
                                                                />
                                                            </span>
                                                            {fullName.length >
                                                            15 ? (
                                                                <Tooltip
                                                                    text={
                                                                        fullName
                                                                    }
                                                                >
                                                                    {truncate(
                                                                        fullName,
                                                                        15
                                                                    )}
                                                                </Tooltip>
                                                            ) : (
                                                                truncate(
                                                                    fullName,
                                                                    15
                                                                )
                                                            )}
                                                        </span>
                                                        {item.role ===
                                                            "Primary Organization Owner" &&
                                                        id === user.id ? (
                                                            <Popup
                                                                options={getOptions(
                                                                    item
                                                                )}
                                                                item={item}
                                                            />
                                                        ) : (id === user.id ||
                                                              user.role.includes(
                                                                  "Owner"
                                                              )) &&
                                                          item.role !==
                                                              "Primary Organization Owner" ? (
                                                            <Popup
                                                                options={getOptions(
                                                                    item
                                                                )}
                                                                item={item}
                                                            />
                                                        ) : null}
                                                    </span>
                                                </div>
                                                <p>
                                                    <span className="members-table__row-item">
                                                        {email}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="members-table__row-item">
                                                        {item.role}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="members-table__row-item">
                                                        {is_active
                                                            ? "Active"
                                                            : "Deactivated"}
                                                    </span>
                                                </p>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
