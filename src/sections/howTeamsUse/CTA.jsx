import { Link } from "react-router-dom"

export const CTA = () => {
    return (
        <section className="flow how-teams-use-cta">
            <div>
                <h2 className="fs-700 fw-700">Try Wallow today</h2>
                <p className="">
                    Get started for free, then add your whole team.
                </p>
                <Link
                    to="/signup"
                    className="button"
                >
                    Try Wallow Free
                </Link>
            </div>

            <div>
                <h2 className="fs-700 fw-700">Get a custom demo</h2>
                <p className="">
                    If you’re a team of 100+, our Enterprise plan has advanced
                    permissions and security features to give you more control
                    over your workspace.
                </p>
                <Link
                    to={"https://calendly.com/d/2pm-dd9-xtr/wallow-intro"}
                    target="_blank"
                    className="button"
                >
                    Request a demo
                </Link>
            </div>
        </section>
    )
}
