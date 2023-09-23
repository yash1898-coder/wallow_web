import { ModalHeader } from "../ModalHeader"
import { useState } from "react"
import { ReactComponent as Close } from "../../../assets/close.svg"
import { useSendInviteStore } from "../../../stores/useSendInviteStore"
import { ErrorMessage } from "../../ErrorMessage"
import { Spinner } from "../../Spinner"
import { useStore } from "../../../stores/useStore"
import { useQueryClient } from "react-query"
import { emailRegex } from "../../../utils"
import { useOrganization } from "../../../hooks/useOrganization"
import { Pfp } from "../../Pfp"
import { useSearch } from "../../../hooks/useSearch"
import { useProductMembers } from "../../../hooks/useProductMembers"

export const SendInviteModal = ({
    isLoading,
    sendInviteError,
    modal,
    id,
    inviteTo,
    members,
    onSend,
    onCheckForOrgMember,
}) => {
    const { closeModal } = useStore()
    const [error, setError] = useState({ show: false, message: "" })
    const [emailItems, setEmailItems] = useState([])
    const { value, setValue } = useSendInviteStore()

    const queryClient = useQueryClient()

    const onSubmit = async (value) => {
        const checkRes = await onCheckForOrgMember(value, id)
        if (checkRes !== true) {
            setError({ show: true, message: checkRes })
        } else if (emailItems.includes(value)) {
            setError({
                show: true,
                message: "This email is already in the list.",
            })
        } else if (members.some((m) => m.email === value)) {
            setError({
                show: true,
                message: "A user with that email is already a member.",
            })
        } else {
            setError({ show: false, message: "" })
            console.log(value)
            setEmailItems((prev) => [...prev, value.trim()])
            setValue("")
        }
    }

    const onRemove = (email) =>
        setEmailItems((prev) => prev.filter((item) => item !== email))

    return (
        <dialog
            open
            className="modal send-invite-modal modal--mobile modal--form"
        >
            {window.innerWidth < 800 ? (
                <header className="modal__header">
                    <button
                        onClick={() => closeModal(modal)}
                        className="button button--inverted"
                    >
                        Cancel
                    </button>
                    <h2 className="modal__title fs-600 fw-600">
                        Invite people
                    </h2>
                    <button
                        disabled={emailItems.length === 0}
                        onClick={() =>
                            emailItems.forEach((item) => {
                                onSend(item)
                                queryClient.invalidateQueries(["notifications"])
                            })
                        }
                        className="button button--green"
                    >
                        Add
                    </button>
                </header>
            ) : (
                <ModalHeader
                    title={`Invite people to ${inviteTo}`}
                    modal={modal}
                />
            )}

            <form
                autoComplete="new-password"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(value)
                }}
                className="modal__content "
            >
                <label
                    className="fs-400  label"
                    htmlFor="sendInviteTo"
                >
                    To
                </label>
                <SearchDropdown
                    name="sendInviteTo"
                    q={value}
                    setQ={setValue}
                    onSelect={(o) => {
                        onSubmit(o)
                        setError({ show: false })
                    }}
                />
                {/* <input
                    required
                    value={value}
                    name="sendInviteTo"
                    className={`input`}
                    type="email"
                    id="sendInviteTo"
                /> */}
                {error.show && <ErrorMessage message={error.message} />}
                <div className="send-invite-modal__email-items">
                    {emailItems.map((item) => (
                        <p
                            key={item}
                            className="send-invite-modal__email-item"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => onRemove(item)}
                                className="button-reset"
                            >
                                <Close />
                            </button>
                        </p>
                    ))}
                </div>
            </form>
            {sendInviteError && (
                <ErrorMessage message={sendInviteError.message} />
            )}
            {window.innerWidth > 800 && (
                <div
                    className="modal__footer"
                    style={{ justifyContent: "flex-end" }}
                >
                    <button
                        onClick={() =>
                            emailItems.forEach((item) => onSend(item))
                        }
                        disabled={emailItems.length === 0 || isLoading}
                        className="button"
                    >
                        {isLoading && <Spinner />}
                        Send
                    </button>
                </div>
            )}
        </dialog>
    )
}

/* eslint-disable react/display-name */
const SearchDropdown = ({ q, setQ, onSelect }) => {
    const search = useSearch(q, ["email", "first_name", "last_name"])
    const [open, setOpen] = useState(false)
    const { membersData } = useOrganization()
    const { members } = useProductMembers()

    const options = membersData?.Members.map((m) => ({
        ...m.User,
        role: m.role,
    })).filter(
        (m) =>
            m.role !== "Primary Organization Owner" &&
            m.role !== "Organization Owner" &&
            !members?.some((productM) => productM.id === m.id)
    )

    return (
        <div
            aria-expanded={open}
            onClick={() => {
                setOpen((prev) => !prev)
            }}
            style={{ zIndex: open ? "9" : "" }}
            className={`search-dropdown`}
            tabIndex={0}
            onBlur={(e) => {
                if (!e.relatedTarget) {
                    setOpen(false)
                } else if (!e.currentTarget.contains(e.relatedTarget)) {
                    setOpen(false)
                }
            }}
        >
            <div className={"search-dropdown__input-wrapper"}>
                <input
                    id={"sendInviteTo"}
                    pattern={emailRegex}
                    required
                    value={q}
                    onChange={(e) => {
                        setOpen(true)
                        setQ(e.target.value)
                    }}
                    className={`input search-dropdown__input`}
                    type={"email"}
                    placeholder={"name@gmail.com"}
                />
            </div>
            <div
                className="search-dropdown__options"
                data-visible={open && search(options).length > 0}
            >
                {search(options).length === 0 ? (
                    <p className="search-dropdown__not-found">Nothing found.</p>
                ) : (
                    <ul
                        className="search__options"
                        data-visible={open}
                    >
                        {search(options).length > 0 &&
                            search(options).map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        className={`button-reset search-dropdown__option`}
                                        onClick={() => {
                                            onSelect(option.email)
                                        }}
                                    >
                                        <Pfp
                                            img={option.profile_image}
                                            name={option["Full Name"]}
                                            size="25px"
                                            fontSize="1rem"
                                        />
                                        {option.first_name +
                                            " " +
                                            option.last_name}
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
