import { useStore } from "../stores/useStore"
import { useThreadStore } from "../stores/useThreadStore"
import { Pfp } from "./Pfp"

export const RepliesCount = ({ feedbackItem, replies=[] }) => {
    const { openModal } = useStore()
    const { setFeedbackItem } = useThreadStore();

    return (
        <button
            onClick={() => {
                openModal("thread")
                setFeedbackItem(feedbackItem)
            }}
            className="fs-200 text-neutral-800 fw-500 button-reset replies-count underline-hover"
        >
            <span
                className="flex"
                style={{ "--gap": ".5rem" }}
            >
                {replies.length > 0 && (
                    <Pfp
                        className="message-card__img"
                        img={`https://44.209.155.89${replies?.at(-1)?.User.profile_image}`}
                        name={replies?.at(-1)?.User.first_name}
                    />
                )}
                {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </span>
        </button>
    )
}
