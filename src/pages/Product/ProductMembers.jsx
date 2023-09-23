import { useStore } from "../../stores/useStore"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { useState } from "react"
import { DeactivateUserModal } from "../../components/Modals/DeactivateUserModal"
import { ChangeAccountTypeModal } from "../../components/Modals/ChangeAccountTypeModal"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Spinner } from "../../components/Spinner"
import {
    activateProductMember,
    changeProductMemberAccountType,
    deactivateProductMember,
    deleteProductMember,
    getProductMembers,
} from "../../api/products"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { Tooltip } from "../../components/Tooltip"
import { Pfp } from "../../components/Pfp"
import { truncate } from "../../utils"
import { Popup } from "../../components/Popup"
import { useAuthStore } from "../../stores/useAuthStore"
import { useErrorToast } from "../../hooks/useErrorToast"
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal"
import { useNavigate } from "react-router-dom"

export const ProductMembers = () => {
    const { openModal, closeModal, openToast, modals } = useStore()
    const { user } = useAuthStore()
    const { editingProduct } = useEditProductStore()

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [clickedUser, setClickedUser] = useState(undefined)

    const { isLoading, data: members } = useQuery(
        ["products", "members", editingProduct?.id],
        () => getProductMembers(editingProduct?.id),
        {
            retry: false,
        }
    )

    const {
        isLoading: deactivateLoading,
        error: deactivateError,
        mutate: onDeactivate,
    } = useMutation(() => deactivateProductMember(clickedUser.id), {
        onSuccess: () => {
            queryClient.invalidateQueries([
                "products",
                "members",
                editingProduct?.id,
            ])
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
            queryClient.invalidateQueries([
                "products",
                "members",
                editingProduct?.id,
            ])
            openToast({ text: "User deleted!" })
            closeModal("deleteUser")
        },
    })
    const {
        isLoading: activateLoading,
        error: activateError,
        mutate: onActivate,
    } = useMutation(() => activateProductMember(clickedUser.id), {
        onSuccess: () => {
            queryClient.invalidateQueries([
                "products",
                "members",
                editingProduct?.id,
            ])
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
            changeProductMemberAccountType(
                clickedUser.id,
                editingProduct.id,
                accountType.value
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "products",
                    "members",
                    editingProduct?.id,
                ])
                openToast({ text: "Account type changed!" })
                closeModal("changeAccountType")
            },
        }
    )

    const accountTypeOptions = [
        {
            value: "Product Owner",
            subtitle:
                "Can make standard API requests and read basic organizational data",
        },
        {
            value: "Full Member",
            subtitle:
                "Can make standard API requests and read basic organizational data",
        },
    ]

    const [accountType, setAccountType] = useState(accountTypeOptions[0])

    const getOptions = (item) => {
        let options = []
        if (user.id === item.id) {
            options = [
                ...options,
                {
                    title: "Edit your profile",
                    onClick: () => openModal("editProfile"),
                },
            ]
        }
        if (
            editingProduct?.role.includes("Owner") &&
            item.id !== user.id &&
            !item.account_type.includes("Organization")
        ) {
            options = [
                ...options,
                {
                    title: "Change account type",
                    onClick: () => openModal("changeAccountType"),
                },
            ]
        }
        if (
            editingProduct?.role === "Primary Product Owner" &&
            item.id === user.id
        ) {
            options = [
                ...options,
                {
                    title: "Transfer ownership",
                    onClick: () => navigate("/dashboard/transfer-ownership"),
                },
            ]
        }
        if (
            item.is_active &&
            item.id !== user.id &&
            editingProduct?.role.includes("Owner")
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
        if (!item.is_active) {
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
                {editingProduct?.role.includes("Owner") && (
                    <button
                        className="button button--green"
                        onClick={() => openModal("sendInviteProduct")}
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
                    <div className="members-table">
                        <div className="members-table__caption">
                            <p>
                                {members.length}{" "}
                                {members.length === 1 ? "member" : "members"}
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
                            {members.length === 0 ? (
                                <p style={{ margin: ".75rem" }}>
                                    No members yet.
                                </p>
                            ) : (
                                members.map((item, idx) => {
                                    const fullName = item["Full Name"]

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setClickedUser(item)
                                                const userRole =
                                                    item.account_type
                                                const currRole =
                                                    accountTypeOptions.find(
                                                        (o) =>
                                                            o.value === userRole
                                                    )
                                                if (currRole) {
                                                    setAccountType(currRole)
                                                }
                                            }}
                                            data-highlighted={
                                                item.id === user.id ||
                                                !item.is_active
                                            }
                                            className="font-semibold text-white members-table__row"
                                        >
                                            <div className="fw-600">
                                                <span className="justify-between members-table__row-item">
                                                    <span className="members-table__header-item--mobile">
                                                        Full name
                                                    </span>
                                                    <span className="flex members-table__name">
                                                        <Pfp
                                                            name={
                                                                item[
                                                                    "Full Name"
                                                                ]
                                                            }
                                                            img={
                                                                item?.profile_image
                                                            }
                                                        />
                                                        {fullName.length >
                                                        15 ? (
                                                            <Tooltip
                                                                text={fullName}
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
                                                        {item.account_type.includes(
                                                            "Primary"
                                                        ) &&
                                                        item.id === user.id ? (
                                                            <Popup
                                                                options={getOptions(
                                                                    item
                                                                )}
                                                                item={item}
                                                            />
                                                        ) : (item.id ===
                                                              user.id ||
                                                              editingProduct?.role.includes(
                                                                  "Owner"
                                                              )) &&
                                                          !item.account_type.includes(
                                                              "Primary"
                                                          ) ? (
                                                            <Popup
                                                                options={getOptions(
                                                                    item
                                                                )}
                                                                item={item}
                                                            />
                                                        ) : null}
                                                    </span>
                                                </span>
                                            </div>
                                            <p>
                                                <span className="members-table__row-item">
                                                    <span className="members-table__header-item--mobile">
                                                        Email address
                                                    </span>
                                                    {item.email}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="members-table__row-item">
                                                    <span className="members-table__header-item--mobile">
                                                        Account type
                                                    </span>
                                                    {item.account_type}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="members-table__row-item">
                                                    <span className="members-table__header-item--mobile">
                                                        Status
                                                    </span>
                                                    {item.is_active
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
                )}
            </div>
        </div>
    )
}
