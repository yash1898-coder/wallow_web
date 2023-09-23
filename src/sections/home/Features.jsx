import { Feature } from "../../components/Feature"
import progress from "../../assets/sidebar/Progress.png"
import blockers from "../../assets/sidebar/Blocker.png"
import impediments from "../../assets/sidebar/Impediment.png"
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg"
import feature1Preview from "../../assets/home/feature1Preview.png"
import feature1Drawing from "../../assets/home/feature1Drawing.png"
import feature2Drawing from "../../assets/home/feature2Drawing.png"
import feature3Drawing from "../../assets/home/feature3Drawing.png"

export const Features = () => {
    const data = [
        {
            title: "Progress",
            icon: progress,
            subtitle:
                "Stay informed about daily progress from teams contributing to your product's success.",
            link: {
                text: "Explore",
                href: "/features/progress",
                icon: <ArrowRight />,
            },
            accentColor: "green",
            preview: feature1Preview,
            previewAlt: "",
            drawing: feature1Drawing,
            drawingAlt: "",
        },
        {
            title: "Blockers",
            icon: blockers,
            subtitle:
                "Receive real-time alerts when teams encounter obstacles that could impact your product's development.",
            link: {
                text: "Explore",
                href: "/features/blockers",
                icon: <ArrowRight />,
            },
            accentColor: "red",
            preview: feature1Preview,
            previewAlt: "",
            drawing: feature2Drawing,
            drawingAlt: "",
        },
        {
            title: "Impediments",
            icon: impediments,
            subtitle:
                "Stay in the loop with immediate notifications when your team encounters challenges that may hinder the growth of your product.",
            link: {
                text: "Explore",
                href: "/features/impediments",
                icon: <ArrowRight />,
            },
            accentColor: "orange",
            preview: feature1Preview,
            previewAlt: "",
            drawing: feature3Drawing,
            drawingAlt: "",
        },
    ]

    return (
        <section className="home-features container">
            <h2 className="fs-800 fw-700 text-center">
                The #1 messaging app for teams
            </h2>
            <div className="home-features__features-container">
                {data.map((item) => (
                    <Feature
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </section>
    )
}
