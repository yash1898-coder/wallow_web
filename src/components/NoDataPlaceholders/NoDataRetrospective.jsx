import img from "../../assets/products/hero.png"
import { useStore } from "../../stores/useStore"
import { useLocation, Link } from "react-router-dom"

export const NoDataRetrospective = () => {
    const { openModal } = useStore()
    const { pathname } = useLocation()
    const isOnDashboard = pathname.includes("dashboard")

    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-700 fw-700 ">
                    Retrospective derived from <br /> delivery experiences{" "}
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
                <h2 className="fs-700 fw-700">Wallow retrospective</h2>
                <p>
                    Amplify Cross-Team Insights: Wallow Retrospective unveils
                    collaborative dynamics, spotlighting successes and enhancing
                    areas for growth, including communication and dependency
                    management, to elevate shared product excellence.
                </p>
            </div>
        </div>
    )
}
