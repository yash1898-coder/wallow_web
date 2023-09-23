import { useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { Spinner } from "../../components/Spinner"
import { useAuthStore } from "../../stores/useAuthStore"
import {
    getOrganizationMembers,
    transferOrganizationOwnership,
} from "../../api/organization"
import { SearchDropdown } from "../../components/SearchDropdown"
import { pageSpinnerStyle } from "../../utils"
import { Link, useNavigate } from "react-router-dom"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { TransferOwnershipModal } from "../../components/Modals/TransferOwnershipModal"
import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../../components/ErrorMessage"
import { useTransferOwnership } from "../../hooks/useTransferOwnership"
import { useEffect } from "react"
import { RequireRoleModal } from "../../components/Modals/RequireRoleModal"

export const TransferOwnership = () => {
    const { user, setUser } = useAuthStore()
    const { modals, closeModal, openToast, openModal } = useStore()

    const navigate = useNavigate()

    const memberRef = useRef()
    const passwordRef = useRef()

    const { isLoading, data: membersData } = useQuery(
        ["organization", "members"],
        () => getOrganizationMembers(),
        {
            retry: false,
        }
    )

    const members = membersData?.Members.map((m) => ({
        ...m.User,
        "Full Name": `${m.User.first_name} ${m.User.last_name}`,
    }))

    const {
        memberInvalid,
        passwordInvalid,
        password,
        selectedMember,
        onSelectedMemberChange,
        checkMemberValidity,
        checkPasswordValidity,
        makeMemberValid,
        onPasswordChange,
        onCheckPassword,
        error,
        loginLoading,
    } = useTransferOwnership(members, memberRef, passwordRef)

    const {
        isLoading: transferLoading,
        error: transferError,
        mutate: onSubmit,
    } = useMutation(() => transferOrganizationOwnership(selectedMember.id), {
        onSuccess: () => {
            openToast({ text: "Ownership transferred!" })
            navigate("/organization/members")
            closeModal("transferOwnership")
            setUser({ ...user, role: membersData?.Role })
        },
    })

    const allowed = user.role === "Primary Organization Owner"

    useEffect(() => {
        if (!allowed) openModal("requireRole")
    }, [allowed])

    if (!allowed) {
        return (
            <ModalWrapper open={modals["requireRole"]}>
                <RequireRoleModal />
            </ModalWrapper>
        )
    }

    if (isLoading) {
        return <Spinner style={pageSpinnerStyle} />
    }

    return (
        <>
            <ModalWrapper open={modals["transferOwnership"]}>
                <TransferOwnershipModal
                    onSubmit={onSubmit}
                    error={transferError}
                    isLoading={transferLoading}
                    selectedMember={selectedMember}
                    members={members}
                />
            </ModalWrapper>
            <div
                className="container container--sm "
                style={{ paddingTop: "5rem" }}
            >
                <h1 className="fs-700 fw-700">Transfer Ownership</h1>
                <div
                    className="flow mt"
                    data-spacing="small"
                >
                    <h3 className="fw-600">
                        Transferring ownership is a one-way street.
                    </h3>
                    <p>You cannot undo this, and the transfer is immediate.</p>
                    <p>
                        The new Primary Organization Owner will have ultimate
                        authority over the organization — including promoting
                        others to ownership roles.
                    </p>
                </div>
                <div
                    style={{ maxWidth: "32rem" }}
                    className="mt flow"
                    autoComplete="off"
                >
                    <div>
                        <label
                            className="fs-300  label"
                            htmlFor="member"
                        >
                            New Organization Owner:
                        </label>
                        <SearchDropdown
                            name={"member"}
                            onChange={(o) => onSelectedMemberChange(o)}
                            ref={memberRef}
                            makeValid={makeMemberValid}
                            invalid={memberInvalid}
                            options={members?.filter((m) => m.id !== user.id)}
                            searchParams={["Full Name", "email"]}
                            placeholder={"Search for a member..."}
                        />
                    </div>
                    <div>
                        <label
                            className="fs-300  label"
                            htmlFor="password"
                        >
                            Wallow Password
                        </label>
                        <input
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$"
                            ref={passwordRef}
                            onChange={onPasswordChange}
                            value={password}
                            required
                            className={`input auth-form__input ${
                                passwordInvalid ? "invalid" : ""
                            }`}
                            type="password"
                            id="password"
                            placeholder="Enter password..."
                        />
                        {error && <ErrorMessage message={error.message} />}
                    </div>
                    <div className="flex justify-between">
                        <Link
                            to="/organization/members"
                            className="button button--inverted"
                        >
                            Go Back
                        </Link>
                        <button
                            onClick={() => {
                                checkPasswordValidity()
                                checkMemberValidity()
                                if (password.length > 0 && !memberInvalid) {
                                    onCheckPassword()
                                }
                            }}
                            form="transfer-ownership-form"
                            disabled={
                                loginLoading ||
                                password.length < 1 ||
                                memberInvalid ||
                                !selectedMember
                            }
                            className="modal__button button button--green button--icon-label-inverted"
                        >
                            {loginLoading && <Spinner />}
                            Transfer Ownership
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
