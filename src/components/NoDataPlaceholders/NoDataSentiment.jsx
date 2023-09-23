import { useStore } from "../../stores/useStore"
import img from "../../assets/products/hero.png"

export const NoDataSentiment = () => {
    const { openModal } = useStore()

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-800 fw-700 ">Monitor delivery sentiment </h1>

                <button
                    className="button"
                    onClick={() => openModal("sendInviteProduct")}
                >
                    Invite people
                </button>
            </div>
            <img
                className="preview-img"
                src={img}
                alt=""
            />
            <div className="flow">
                <h2 className="fs-700 fw-700">Wallow sentiment</h2>
                <p>
                    Wallow Sentiment utilizes advanced analysis to decode the
                    emotional tone within team updates. By deciphering language,
                    it offers a comprehensive view of progress
                    sentiment—positive, negative, or neutral— enabling trend
                    tracking and pinpointing areas for growth. Elevate
                    collaboration and productivity through real- time emotional
                    intelligence, unleashing your team's potential with Wallow.
                </p>
            </div>
        </div>
    )
}
