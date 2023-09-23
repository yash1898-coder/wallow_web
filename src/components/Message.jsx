import { Pfp } from "./Pfp"
import pencil from "../assets/pencil.svg"
import deleteIcon from "../assets/delete.svg"
import { useAuthStore } from "../stores/useAuthStore"
import { useEffect, useState } from "react"
import { ErrorMessage } from "./ErrorMessage"
import { Spinner } from "./Spinner"
import { useErrorToast } from "../hooks/useErrorToast"

export const Message = ({
    item,
    isLoading,
    deleteLoading,
    deleteError,
    onDelete,
    error,
    onEdit,
}) => {
    const [reply, setReply] = useState(item.reply)
    const [editing, setEditing] = useState(false)
    const [clickedReply, setClickedReply] = useState("")
    const { user } = useAuthStore()

    const {
        User: { first_name, last_name, profile_image, id },
    } = item
    console.log("Get Response:::",item)
    useEffect(() => {
        if (!isLoading && !error) {
            setEditing(false)
        }
    }, [isLoading, error])

    useErrorToast(deleteError)

    return (
        <div
            className="flow message-wrapper"
            data-spacing="small"
        >
            <div className="message">
                <Pfp
                    size="35px"
                    fontSize=".95rem"
                    className="message__img"
                    img={`https://44.209.155.89${profile_image}`}
                    name={first_name}
                />
                <div className="message__content">
                    <h3 className="fw-600 fs-500 message__title">
                        {first_name} {last_name}
                    </h3>
                    {editing ? (
                        <textarea
                            onChange={(e) => setReply(e.target.value)}
                            className="input"
                            value={reply}
                        ></textarea>
                    ) : (
                        <p className="">{item.reply}</p>
                    )}
                    {editing && (
                        <div className="flex message__buttons">
                            <div className="flex">
                                <button
                                    disabled={isLoading}
                                    onClick={() => {
                                        onEdit({
                                            id: item.id,
                                            reply,
                                        })
                                    }}
                                    className="button button--green"
                                >
                                    {isLoading && <Spinner />}
                                    Save
                                </button>
                                {error && (
                                    <ErrorMessage message={error.message} />
                                )}
                            </div>
                            <button
                                className="button"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                {!editing && id === user.id && (
                    <button
                        className="icon-button"
                        onClick={() => setEditing(true)}
                    >
                        <img
                            src={pencil}
                            alt="edit"
                        />
                    </button>
                )}
                {id === user.id && (
                    <button
                        disabled={deleteLoading && clickedReply.id === item.id}
                        className="icon-button"
                        onClick={() => {
                            setClickedReply(item)
                            onDelete(item.id)
                        }}
                    >
                        {deleteLoading && clickedReply.id === item.id ? (
                            <Spinner />
                        ) : (
                            <img
                                src={deleteIcon}
                                alt="delete"
                            />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
