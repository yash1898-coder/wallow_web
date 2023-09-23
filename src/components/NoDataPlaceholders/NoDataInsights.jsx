import img from "../../assets/products/hero.png"
import { useStore } from "../../stores/useStore"
import { useLocation, Link } from "react-router-dom"

export const NoDataInsights = () => {
    const { openModal } = useStore()
    const { pathname } = useLocation()
    const isOnDashboard = pathname.includes("dashboard")

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700 ">
                    Uncover Recurring Patterns <br /> Impacting Productivity.
                </h1>

                {isOnDashboard ? (
                    <button
                        className="button"
                        onClick={() => openModal("sendInviteProduct")}
                    >
                        {" "}
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
                    Identify and Address Key Insights: Uncover recurring
                    blockers and impediments impacting your team's productivity
                    with Wallow Insights
                </p>
            </div>
        </div>
    )
}
