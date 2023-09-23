import { useThreadStore } from "../stores/useThreadStore"
import messageIcon from "../assets/message.png"
import { useStore } from "../stores/useStore"

export const ReplyButton = ({ feedbackItem }) => {
    const { openModal } = useStore()
    const { setFeedbackItem } = useThreadStore()

    return (
        <button
            className="button--icon reply-button button-reset"
            style={{ marginLeft: "auto" }}
            onClick={() => {
                openModal("thread")
                setFeedbackItem(feedbackItem)
            }}
        >
            <img
                src={messageIcon}
                alt="message icon"
            />
        </button>
    )
}
