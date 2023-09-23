import { Link } from "react-router-dom"
import img from "../../assets/products/hero.png"
import progress from "../../assets/sidebar/Progress.png"
import blocker from "../../assets/sidebar/Blocker.png"
import impediment from "../../assets/sidebar/Impediment.png"
import insights from "../../assets/sidebar/insights.png"
import retrospective from "../../assets/sidebar/Retrospective.png"
import sentiment from "../../assets/sidebar/Sentiment.png"

export const Products = () => {
    return (
        <div className="container--sm dashboard-preview">
            <div className="flex justify-between">
                <h1 className="fs-800 fw-700 ">
                    Empowering seamless collaboration and productivity{" "}
                </h1>

                <Link
                    className="button"
                    to="/signup"
                >
                    Try Wallow Free
                </Link>
            </div>
            <img
                className="preview-img"
                src={img}
                alt=""
            />
            <div className="flow mt">
                <h2 className="fs-700 fw-700">Manage digital products</h2>
                <p>
                    Wallow is the ultimate platform designed to revolutionize
                    collaboration, communication, transparency, and knowledge
                    sharing among teams working on the same product. With a wide
                    array of powerful features, Wallow takes your team's
                    performance to the next level.
                </p>
                <h3 className="fs-600 fw-700 mt">Features</h3>
                <div className="flex dashboard-preview__section">
                    <img
                        src={progress}
                        alt="Progress"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Progress</h4>
                        <p>
                            Effortlessly stay in the loop with daily updates on
                            your product's advancement. Receive timely work
                            progress reports from your teams, ensuring you're
                            always informed
                        </p>
                        <Link
                            to={"/features/progress"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="flex dashboard-preview__section">
                    <img
                        src={blocker}
                        alt="Blockers"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Blockers</h4>
                        <p>
                            Stay ahead of potential roadblocks with instant
                            alerts when teams encounter issues. Streamline
                            resolution through Wallow's intelligent grouping,
                            which efficiently groups similar blockers affecting
                            your cross-teams. Boost your issue-solving speed by
                            leveraging historical blocker matching, leading to
                            swifter resolutions in real-time.
                        </p>
                        <Link
                            to={"/features/blockers"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="flex dashboard-preview__section">
                    <img
                        src={impediment}
                        alt="Impediments"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Impediments</h4>
                        <p>
                            Stay informed about hurdles teams face while working
                            on your product. Simplify issue resolution by
                            consolidating similar impediments using Wallow's
                            intuitive grouping. Keep your teams laser-focused on
                            productivity while Wallow's historical impediment
                            matching optimizes goal attainment, ensuring
                            efficient real-time solutions.
                        </p>
                        <Link
                            to={"/features/impediments"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="flex dashboard-preview__section">
                    <img
                        src={insights}
                        alt="Insights"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Insights</h4>
                        <p>
                            Unlock valuable performance optimization insights
                            from your delivery experiences. Wallow's analytical
                            tools spotlight blockers and impediments that hinder
                            productivity, driving continuous enhancements.
                        </p>
                        <Link
                            to={"/features/insights"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="flex dashboard-preview__section">
                    <img
                        src={retrospective}
                        alt="Retrospective"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Retrospective</h4>
                        <p>
                            Evaluate your team's performance effortlessly with
                            Wallow's insightful retrospectives. Identify
                            achievements and areas for growth, nurturing a
                            culture of improvement.
                        </p>
                        <Link
                            to={"/features/retrospective"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="flex dashboard-preview__section">
                    <img
                        src={sentiment}
                        alt="Sentiment"
                    />
                    <div>
                        <h4 className="fs-500 fw-700">Sentiment</h4>
                        <p>
                            Decode delivery sentiment with natural language
                            understanding. Wallow's sentiment analysis provides
                            real-time insights, enriching collaboration and
                            productivity. Maximize your teams' potential,
                            elevate productivity, and achieve remarkable
                            outcomes with Wallow by your side.
                        </p>
                        <Link
                            to={"/features/sentiment"}
                            className="link underline "
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
                <p className="mt">
                    With Wallow at your side, unleash the full potential of your
                    teams, enhance productivity, and deliver exceptional
                    results. Experience the power of seamless collaboration
                    today!
                </p>
            </div>
        </div>
    )
}
