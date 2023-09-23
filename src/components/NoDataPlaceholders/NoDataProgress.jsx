import img from "../../assets/products/hero.png"
import { useStore } from "../../stores/useStore"
import { useLocation, Link } from "react-router-dom"

export const NoDataProgress = () => {
    const { openModal } = useStore()
    const { pathname } = useLocation()
    const isOnDashboard = pathname.includes("dashboard")

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700 ">
                    All work progress in one place
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
                    Track and Accelerate Progress: Keep teams aligned and on
                    track with Wallow Progress, the platform that provides
                    real-time updates on work progress and promotes cross-team
                    collaboration.
                </p>
            </div>
        </div>
    )
}
