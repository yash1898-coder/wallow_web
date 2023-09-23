import img from "../../assets/products/hero.png"
import { useStore } from "../../stores/useStore"
import { useLocation, Link } from "react-router-dom"

export const NoDataBlockers = () => {
    const { openModal } = useStore()
    const { pathname } = useLocation()
    const isOnDashboard = pathname.includes("dashboard")

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700 ">
                    All work blockers in one place.
                </h1>
                {isOnDashboard ? (
                    <button
                        className="button"
                        onClick={() => openModal("sendInviteProduct")}
                    >
                        Invite people
                    </button>
                ) : (
                    <Link
                        className="button"
                        to={"/signup"}
                    >
                        Try Wallow Free
                    </Link>
                )}
            </div>
            <img
                className="preview-img"
                src={img}
                alt=""
            />
            <div className="flow">
                <p>
                    Wallow Blockers is a valuable tool that allows teams to
                    quickly identify and tackle issues that impede their work.
                    With Wallow Blockers, teams can efficiently communicate and
                    collaborate to overcome obstacles, ensuring seamless
                    progress towards project goals.
                </p>
            </div>
        </div>
    )
}
