import { ReactComponent as Arrow } from "../../assets/arrowRightBlue.svg"
import usageWay1Preview from "../../assets/home/usageWay1Preview.webp"
import products from "../../assets/sidebar/Product.png"
import progress from "../../assets/sidebar/Progress.png"
import blockers from "../../assets/sidebar/Blocker.png"
import impediments from "../../assets/sidebar/Impediment.png"
import insights from "../../assets/sidebar/insights.png"
import retrospective from "../../assets/sidebar/Retrospective.png"
import sentiment from "../../assets/sidebar/Sentiment.png"
import usageWaysDrawing from "../../assets/pointingDownDrawing.png"
import { SectionIntro } from "../../components/SectionIntro"
import { UsageWay } from "../../components/UsageWay"

export const UsageWays = () => {
    const ways = [
        {
            icon: products,
            title: "Products",
            link: {
                href: "/features/products",
                text: "Explore",
                icon: <Arrow />,
            },
            preview: usageWay1Preview,
            previewAlt: "",
        },
        {
            icon: progress,
            title: "Progress",
            link: {
                href: "/features/progress",
                text: "Explore",
                icon: <Arrow />,
            },
        },
        {
            icon: blockers,
            title: "Blockers",
            link: {
                href: "/features/blockers",
                text: "Explore",
                icon: <Arrow />,
            },
        },
        {
            icon: impediments,
            title: "Impediments",
            link: {
                href: "/features/impediments",
                text: "Explore",
                icon: <Arrow />,
            },
        },
        {
            icon: insights,
            title: "Insights",
            link: {
                href: "/features/insights",
                text: "Explore",
                icon: <Arrow />,
            },
        },
        {
            icon: retrospective,
            title: "Retrospective",
            link: {
                href: "/features/retrospective",
                text: "Explore",
                icon: <Arrow />,
            },
        },
        {
            icon: sentiment,
            title: "Sentiment",
            link: {
                href: "/features/sentiment",
                text: "Explore",
                icon: <Arrow />,
            },
        },
    ]

    return (
        <section className="home-usage-ways container">
            <SectionIntro
                link={{ text: "Browse all templates", href: "#" }}
                drawing={{
                    src: usageWaysDrawing,
                    alt: "",
                    overlapLevel: 2,
                    position: "right",
                }}
                title={{ text: "Endless ways to use it" }}
            />
            <div className="home-usage-ways__grid">
                {ways.map((way) => (
                    <UsageWay
                        key={way.title}
                        {...way}
                    />
                ))}
            </div>
        </section>
    )
}
