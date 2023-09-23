import { useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { Spinner } from "../../components/Spinner"
import { useAuthStore } from "../../stores/useAuthStore"
import { SearchDropdown } from "../../components/SearchDropdown"
import { pageSpinnerStyle } from "../../utils"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { TransferOwnershipModal } from "../../components/Modals/TransferOwnershipModal"
import { useStore } from "../../stores/useStore"
import { ErrorMessage } from "../../components/ErrorMessage"
import { useTransferOwnership } from "../../hooks/useTransferOwnership"
import { getTeam, transferTeamOwnership } from "../../api/teams"
import { useEffect } from "react"
import { RequireRoleModal } from "../../components/Modals/RequireRoleModal"

export const TransferTeamOwnership = () => {
    const { user } = useAuthStore()
    const { id } = useParams()
    const { modals, closeModal, openToast, openModal } = useStore()

    const navigate = useNavigate()

    const memberRef = useRef()
    const passwordRef = useRef()

    const { isLoading, data: team } = useQuery(
        ["teams", id],
        () => getTeam(id),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    )

    const members = team?.members.map((m) => ({
        ...m,
        "Full Name": `${m.first_name} ${m.last_name}`,
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
    } = useMutation(() => transferTeamOwnership(selectedMember.id, id), {
        onSuccess: () => {
            openToast({ text: "Ownership transferred!" })
            navigate(`/dashboard/teams/${id}`)
            closeModal("transferOwnership")
        },
    })

    const allowed = team?.role === "Team Manager" || isLoading

    useEffect(() => {
        if (!allowed) openModal("requireRole")
    }, [allowed])

    if (!allowed) {
        return (
            <ModalWrapper open={modals["requireRole"]}>
                <RequireRoleModal backUrl={`/dashboard/teams/${id}`} />
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
                        The new Team Manager will have ultimate authority over
                        the team — including promoting others to ownership
                        roles.
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
                            New Team Owner:
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
                            to={`/dashboard/teams/${id}`}
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
