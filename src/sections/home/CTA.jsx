import { Link } from "react-router-dom"
import { ReactComponent as Arrow } from "../../assets/arrowRightBlue.svg"
import img from "../../assets/home/ctaDrawing.png"

export const CTA = () => {
    return (
        <section className="home-cta container ">
            <div
                className="flow"
                data-spacing="large"
            >
                <h2 className="fs-800 fw-700 text-center">
                    Get started for free
                </h2>
                <p className="text-center">
                    Play around with it first. Pay and add your team later.
                </p>
                <div className="flex justify-center">
                    <Link
                        to="/signup"
                        className="button"
                    >
                        Try Wallow free
                    </Link>
                    <Link
                        target="_blank"
                        to={"https://calendly.com/d/2pm-dd9-xtr/wallow-intro"}
                        className="link"
                    >
                        Request a demo <Arrow />
                    </Link>
                </div>
            </div>
            <div className="home-cta__img-wrapper">
                <img
                    className="home-cta__img"
                    src={img}
                    alt=""
                />
            </div>
        </section>
    )
}
