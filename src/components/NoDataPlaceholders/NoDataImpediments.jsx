import img from "../../assets/products/hero.png"
import { useLocation, Link } from "react-router-dom"
import { useStore } from "../../stores/useStore"

export const NoDataImpediments = () => {
    const { openModal } = useStore()
    const { pathname } = useLocation()
    const isOnDashboard = pathname.includes("dashboard")

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700 ">
                    All your impediments in one place.{" "}
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
                    Wallow Impediments is a powerful feature that helps teams
                    identify and address obstacles that hinder their progress.
                    With Wallow Impediments, teams can easily capture, track,
                    and resolve impediments, enabling smoother workflows and
                    improved productivity.
                </p>
            </div>
        </div>
    )
}
