import { useSearch } from "../../hooks/useSearch"
import { SearchList } from "../SearchList"
import { ModalHeader } from "./ModalHeader"
import { useRef, useState } from "react"
import { Spinner } from "../Spinner"
import { ErrorMessage } from "../ErrorMessage"
import { ReactComponent as Send } from "../../assets/send.svg"
import { useStore } from "../../stores/useStore"
import { useSendInviteStore } from "../../stores/useSendInviteStore"
import { useQuery } from "react-query"
import { getProductMembers } from "../../api/products"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { useIsEmail } from "../../hooks/useIsEmail"

export const AddPeopleModal = ({
    existingMembers,
    isAddMembersLoading,
    sendInviteModal,
    inviteTo,
    onSubmit,
    error,
}) => {
    const { openModal, closeModal } = useStore()
    const { editingProduct } = useEditProductStore()
    const { setValue } = useSendInviteStore()
    const [options, setOptions] = useState([])
    const { isLoading } = useQuery(
        ["products", "members", editingProduct.id],
        () => getProductMembers(editingProduct.id),
        {
            retry: false,
            onSuccess: (members) => {
                setOptions(
                    members
                        .filter(
                            (m) =>
                                m.role !== "Organization Owner" &&
                                m.role !== "Primary Organization Owner"
                        )
                        .filter(
                            (o) => !existingMembers.some((m) => m.id === o.id)
                        )
                        .map((m) => ({ ...m, selected: false }))
                )
            },
        }
    )

    const onCheckboxChange = (e) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id.toString() === e.target.name
                    ? { ...o, selected: e.target.checked }
                    : o
            )
        )
    }

    const [q, setQ] = useState("")
    const { isNotFullEmail, isEmail } = useIsEmail(q, options)
    const search = useSearch(q, ["Full Name", "email"])

    const toRef = useRef()

    const content = () => {
        if (isEmail) {
            return (
                <button
                    className="flex mt button-reset link purple"
                    onClick={() => {
                        setValue(q)
                        closeModal("addPeople")
                        openModal(sendInviteModal)
                    }}
                    style={{ "--margin": ".75rem", "--_gap": "1rem" }}
                >
                    <Send />
                    Invite {q}
                </button>
            )
        } else if (isNotFullEmail) {
            return (
                <p
                    className="flex mt"
                    style={{ "--margin": ".75rem" }}
                >
                    <Send style={{ currentColor: "red" }} />
                    Keep typing a full email
                </p>
            )
        } else {
            return isLoading ? (
                <Spinner style={{ marginTop: "4rem" }} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <SearchList
                    options={search(options)}
                    onChange={onCheckboxChange}
                />
            )
        }
    }

    return (
        <dialog
            open
            className="modal modal--invite modal--form"
        >
            <ModalHeader
                title={`Invite people to ${inviteTo}`}
                modal={"addPeople"}
            />
            <div className="modal__content">
                <input
                    ref={toRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    required
                    name="to"
                    className={`input`}
                    type="email"
                    id="to"
                    placeholder={"Name, example@example.com"}
                />
                {content()}
            </div>
            <div className="modal__footer">
                <button
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                        const selectedPeople = options.filter((o) => o.selected)
                        selectedPeople.forEach((p) => onSubmit(p.email))
                    }}
                    disabled={
                        !options?.some((o) => o.selected) || isAddMembersLoading
                    }
                    form="invite-modal"
                    className="modal__button button button--icon-label-inverted"
                >
                    {isAddMembersLoading && <Spinner />}
                    Add
                </button>
            </div>
        </dialog>
    )
}
