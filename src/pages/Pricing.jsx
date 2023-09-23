import icon1 from "../assets/pricing/1.png"
import icon2 from "../assets/pricing/2.png"
import icon3 from "../assets/pricing/3.png"
import { PricingCard } from "../components/PricingCard"
import check from "../assets/check.svg"
import drawing from "../assets/pricingDrawing.png"
import ctaDrawing from "../assets/pricingCtaDrawing.png"
import { ReactComponent as ArrowRight } from "../assets/arrowRight.svg"
import { Accordion } from "../components/Accordion"
import { Link } from "react-router-dom"
import { ModalWrapper } from "../components/Modals/ModalWrapper"
import { CalculatorModal } from "../components/Modals/CalculatorModal"
import { useStore } from "../stores/useStore"
import { PartnerLogos } from "../sections/PartnerLogos"

export const Pricing = () => {
    const { modals, openModal, setPlanCost } = useStore()

    return (
        <>
            <ModalWrapper open={modals["calculator"]}>
                <CalculatorModal />
            </ModalWrapper>
            <div className="pricing">
                <section className="pricing__hero">
                    <h1 className="fs-800 fw-700">
                        One tool for cross-team <br /> communication and
                        collaboration. <br /> Free for teams to try.
                    </h1>
                    <p className="uppercase  fs-300 mt ">Trusted by teams at</p>
                    <PartnerLogos full={false} />
                </section>

                <section className="pricing__cards-grid">
                    <PricingCard>
                        <header className="pricing-card__header">
                            <img
                                className="pricing-card__icon"
                                src={icon1}
                                alt=""
                            />
                            <h3 className="text-orange-500 fw-700 fs-700">
                                Free
                            </h3>
                            <p>
                                For staying aligned to your team’s work
                                progress.
                            </p>
                        </header>
                        <div className="pricing-card__body">
                            <h3 className="fw-700 fs-800">Free</h3>
                            <p className="fs-300 ">Unlimited team members</p>
                            <p className="fs-300 "> Up to two teams</p>
                            <p className="fs-300 ">Up to one product</p>
                            <Link
                                to={"/signup"}
                                className="button pricing-card__button button--inverted button--shadow"
                            >
                                Get started
                            </Link>
                            <ul className="pricing-card__list">
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Daily cross-team work progress summaries
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time blocker alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time impediments alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Retrospectives
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Insights
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Product areas
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Delivery sentiment charts
                                </li>
                            </ul>
                        </div>
                    </PricingCard>
                    <PricingCard className="pricing-card--accent">
                        <p className="pricing-card__accent">Most popular</p>
                        <header className="pricing-card__header">
                            <img
                                className="pricing-card__icon"
                                src={icon2}
                                alt=""
                            />
                            <div className="flex">
                                <h3 className="text-blue-700 fw-700 fs-700">
                                    Plus
                                </h3>
                                <small className="pricing-card__badge">
                                    Formerly Team
                                </small>
                            </div>
                            <p>
                                For startups using Wallow to get work progress
                                from cross-teams.
                            </p>
                        </header>
                        <div className="pricing-card__body">
                            <h3 className="fw-700 fs-800">$29.95</h3>
                            <p className="fs-300 ">per user / month</p>
                            <p className="fs-300 "> billed monthly </p>
                            <p className="fs-300 ">Up to ten teams</p>
                            <p className="fs-300 ">Up to two products</p>
                            <Link
                                to={"/signup"}
                                className="button pricing-card__button"
                            >
                                Get started
                            </Link>
                            <button
                                className="button pricing-card__button button--inverted button--shadow"
                                onClick={() => {
                                    setPlanCost(29.95)
                                    openModal("calculator")
                                }}
                            >
                                Estimate savings
                            </button>
                            <h4
                                className="fw-700 mt"
                                style={{ "--margin": "1rem" }}
                            >
                                Everything in Free, and
                            </h4>
                            <ul className="pricing-card__list">
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Daily cross-team work progress summaries
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time blocker alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time impediments alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Retrospectives
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Insights
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Product areas
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Delivery sentiment charts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    SAML SSO
                                </li>
                            </ul>
                        </div>
                    </PricingCard>
                    <PricingCard>
                        <header className="pricing-card__header">
                            <img
                                className="pricing-card__icon"
                                src={icon3}
                                alt=""
                            />
                            <div className="flex">
                                <h3 className="text-red-700 fw-700 fs-700">
                                    Business
                                </h3>
                                <small className="pricing-card__badge">
                                    New
                                </small>
                            </div>
                            <p>
                                For companies using Wallow to get work progress
                                from cross-teams.
                            </p>
                        </header>
                        <div className="pricing-card__body">
                            <h3 className="fw-700 fs-800">$35.95</h3>
                            <p className="fs-300 ">per user / month</p>
                            <p className="fs-300 "> billed monthly </p>
                            <p className="fs-300 ">Unlimited teams</p>
                            <p className="fs-300 ">Unlimited products</p>
                            <Link
                                to={"/signup"}
                                className="button pricing-card__button"
                            >
                                Get started
                            </Link>
                            <button
                                className="button pricing-card__button button--inverted button--shadow"
                                onClick={() => {
                                    setPlanCost(35.95)
                                    openModal("calculator")
                                }}
                            >
                                Estimate savings
                            </button>
                            <Link
                                target="_blank"
                                to={
                                    "https://calendly.com/d/2pm-dd9-xtr/wallow-intro"
                                }
                                className="button-reset link underline-link mt"
                                style={{ "--margin": "1rem" }}
                            >
                                or Request a Trial
                            </Link>
                            <h4
                                className="fw-700 mt"
                                style={{ "--margin": ".5rem" }}
                            >
                                Everything in Plus, and
                            </h4>
                            <ul className="pricing-card__list">
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Daily cross-team work progress summaries
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time blocker alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Real-time impediments alerts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Retrospectives
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Insights
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Product areas
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Delivery sentiment charts
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    SAML SSO
                                </li>
                                <li className="flex pricing-card__list-item">
                                    <img
                                        src={check}
                                        alt="checkmark"
                                    />
                                    Primary support
                                </li>
                            </ul>
                        </div>
                    </PricingCard>
                </section>

                <section
                    className="mt"
                    style={{ "--margin": "min(10vw, 5rem)" }}
                >
                    <h2 className="fs-800 fw-600">
                        Compare Wallow, Jira, & Slack
                    </h2>
                    <div className="pricing-table">
                        <div className="pricing-table__header">
                            <h3 className="">Content</h3>
                            <h3 className="text-orange-500">Wallow</h3>
                            <h3 className="text-blue-700">Jira</h3>
                            <h3 className="text-red-700">Slack</h3>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Purpose</p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Cross-team collaboration and progress tracking
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Issue and project management</p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p>Team communication and collaboration</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Work Progress </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Daily work progress summaries from cross-teams
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Limited reporting of work progress</p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p>Limited visibility outside of channels </p>
                        </div>
                        <div className="pricing-table__row">
                            <p className=""> Blockers</p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Real-time grouping, alerts, and historical
                                matching for streamlined problem-solving
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Individual issue tracking </p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p>No dedicated blocker grouping</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Impediments </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Swift resolution with real-time grouping,
                                alerts, and historical matching
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Issue management</p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p> No specific impediment grouping</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Insights </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                AI-driven analytics for performance optimization
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p> Reporting and analytics features</p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p> No built-in insights or analytics</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Retrospective </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Real-time retrospectives for growth-focused
                                teams
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Retrospective features </p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p>No integrated retrospective analysis </p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Sentiment </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Delivery sentiment analysis with natural
                                language understanding
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>No sentiment analysis feature </p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p> No built-in sentiment analysis</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className="">Daily Work Progress Summary </p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>Summarized daily progress for cross-teams</p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Limited reporting of work progress </p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p> No dedicated daily progress summary</p>
                        </div>
                        <div className="pricing-table__row">
                            <p className=""> Function Teams</p>
                            <h3 className="text-orange-500 pricing-table__row-title">
                                Wallow
                            </h3>
                            <p>
                                Grouping of function teams aligned to a product
                            </p>
                            <h3 className="text-blue-700 pricing-table__row-title">
                                Jira
                            </h3>
                            <p>Ability to create boards for teams </p>
                            <h3 className="text-red-700 pricing-table__row-title">
                                Slack
                            </h3>
                            <p>
                                Channels for team organization and collaboration
                            </p>
                        </div>
                    </div>
                </section>

                <section className="pricing-section">
                    <div className="flow">
                        <h2 className="fs-800 fw-700">
                            Used by the world’s most <br />
                            innovative teams
                        </h2>
                        <Link
                            style={{ width: "fit-content" }}
                            to={"/customer-stories"}
                            className="button button--inverted"
                        >
                            Read all customer stories
                            <ArrowRight />
                        </Link>
                    </div>
                    <img
                        className="pricing-drawing"
                        src={drawing}
                        alt=""
                    />
                </section>

                <section className="pricing__faq">
                    <h2 className="fs-700 fw-700 text-center">
                        Questions & answers
                    </h2>
                    <p
                        className=" mt text-center"
                        style={{ "--margin": "1rem" }}
                    >
                        Can’t find the answer here?{" "}
                        <a
                            href="#"
                            className="underline"
                        >
                            Contact support
                        </a>
                    </p>
                    <Accordion
                        summary={"What is Wallow?"}
                        text={`Wallow is a cloud-based communication and collaboration platform commonly used by 
cross-teams to share work progress, blockers, and impediments. It provides time-boxed 
messaging and real-time collaboration features through daily blockers and impediments. 
Wallow aims to streamline communication and improve team productivity by bringing 
together work progress, blockers, and impediments in one place.`}
                    />

                    <Accordion
                        summary={
                            "How does Wallow facilitate better communication and collaboration among teams?"
                        }
                        text={
                            " Wallow offers a dedicated space for teams to share updates, communicate on blockers, and collaborate on solutions. With features like comments, cross-team visibility, and integrated notifications, Wallow fosters open and transparent communication. It enables cross-pollination of ideas, aligns efforts across teams, and enhances collaboration to achieve project objectives."
                        }
                    />
                    <Accordion
                        summary={
                            "What features does Wallow offer to track and manage work progress, blockers, and impediments?"
                        }
                        text={
                            "Wallow provides a range of features to track and manage work progress, blockers, and impediments. These include real-time updates and summaries, grouping of similar blockers, sentiment analysis, retrospective capabilities, and a centralized repository for documentation. These features help teams gain insights, identify recurring issues, and facilitate proactive problem-solving."
                        }
                    />
                    <Accordion
                        summary={
                            "Is Wallow customizable to fit the specific needs and workflows of my team?"
                        }
                        text={
                            "Absolutely! Wallow offers flexibility and customization options to fit the unique needs and workflows of your team. You can tailor Wallow to align with your specific terminology, workflows, and reporting requirements. The tool is designed to adapt to your team's way of working, ensuring a seamless integration into your existing processes."
                        }
                    />
                    <Accordion
                        summary={
                            "How secure is the data stored in Wallow? What measures are in place to protect our confidential information?"
                        }
                        text={
                            "We take data security seriously. Wallow implements robust security measures to protect your data. This includes encrypted connections, secure user authentication, access controls, and regular security audits. We adhere to industry best practices to ensure the confidentiality, integrity, and availability of your data."
                        }
                    />
                    <Accordion
                        summary={
                            "Can Wallow provide real-time insights and analytics on recurring blockers and team performance?"
                        }
                        text={
                            "Yes, Wallow offers real-time insights and analytics on recurring blockers and team performance. Through advanced data analysis and reporting capabilities, you can identify patterns, trends, and areas for improvement. These insights help you make informed decisions, optimize processes, and foster continuous improvement within your teams."
                        }
                    />
                    <Accordion
                        summary={
                            "What kind of support and assistance can I expect from the Wallow team during implementation and ongoing usage?"
                        }
                        text={
                            "We provide comprehensive support during your journey with Wallow. Our dedicated support team is available to assist you with onboarding, implementation, and any questions or issues you may encounter. We offer training resources, documentation, and regular updates to ensure a smooth and successful experience with Wallow."
                        }
                    />

                    <p
                        className=" mt"
                        style={{ "--margin": "1rem" }}
                    >
                        Still have more questions? <br />
                        Learn more in our{" "}
                        <a
                            href="#"
                            className="underline"
                        >
                            help center
                        </a>
                    </p>
                </section>
                <section className="pricing__cta container ">
                    <h2 className="fs-800 fw-700 text-center">
                        Try Wallow today
                    </h2>
                    <p className="text-center ">
                        Get started for free. <br />
                        Add your whole team as your needs grow.
                    </p>
                    <Link
                        to="/signup"
                        className="button"
                    >
                        Try Wallow free
                    </Link>
                    <p className="pricing__cta-link-text">
                        On big team?{" "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://calendly.com/d/2pm-dd9-xtr/wallow-intro"
                            className="link"
                        >
                            Request a demo <ArrowRight />
                        </a>{" "}
                    </p>
                    <img
                        width={500}
                        src={ctaDrawing}
                        alt=""
                    />
                </section>
            </div>
        </>
    )
}
