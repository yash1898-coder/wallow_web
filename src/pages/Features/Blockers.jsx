import { Hero } from "../../sections/features/Hero"
import drawing from "../../assets/blockers/heroDrawing.png"
import preview from "../../assets/progress/heroPreview.png"
import { Partners } from "../../sections/features/Partners"
import figma from "../../assets/figma.png"
import { Testimonials } from "../../sections/features/Testimonials"
import { SectionIntro } from "../../components/SectionIntro"
import { SectionIntroLink } from "../../components/SectionIntroLink"
import redMatch from "../../assets/dashboard/redMatch.png"
import testimonial1 from "../../assets/blockers/recurringBlockers.png"
import testimonial1Drawing from "../../assets/blockers/testimonial1Drawing.png"
import blockerGrouping from "../../assets/blockers/blockerGrouping.png"
import { Cards } from "../../sections/features/Cards"
import engineering from "../../assets/engineering.png"
import product from "../../assets/product.png"
import design from "../../assets/design.png"
import pointingDownDrawing from "../../assets/pointingDownDrawing.png"
import feature2Preview from "../../assets/progress/feature2Preview.png"
import { CTA } from "../../sections/features/CTA"
import lookingDownDrawing from "../../assets/lookingDownDrawing.png"
import ctaItem1 from "../../assets/progress/ctaItem1.png"
import { Card } from "../../components/Card"

export const Blockers = () => {
    const testimonials1 = [
        {
            title: "Recurring blockers",
            subtitle:
                "It’s hard to keep track of recurring blockers, Wallow makes it easy, so you can focus on improving performance.",
            wide: true,
            preview: testimonial1,
            previewAlt: "",
        },
    ]

    const testimonials3 = [
        {
            icon: redMatch,
            title: "Accelerate problem resolution with historical blocker matching",
            subtitle:
                "Wallow matches similar historical blockers real-time for faster issue resolution.",
            link: { text: "Learn more", href: "#", accentColor: "red" },
            wide: true,
            preview: feature2Preview,
            previewAlt: "",
        },
    ]

    const cards1 = [
        {
            title: "Daily blockers",
            subtitle:
                "Real-time notifications on blockers from cross-teams working on your product.",
            link: {
                text: "See how PMs use Wallow",
                href: "/product-managers",
                accentColor: "red",
            },
            img: {
                src: blockerGrouping,
                style: { marginLeft: "auto" },
                alt: "",
            },
        },
        {
            title: "AI-powered grouping of similar blockers",
            subtitle:
                "Grouping similar blockers across teams, fostering a comprehensive approach to problem-solving.",
            link: {
                text: "See how designers use Wallow",
                href: "/designers",
                accentColor: "red",
            },
            img: {
                src: blockerGrouping,
                style: { marginLeft: "auto" },
                alt: "",
            },
        },
        {
            title: "Swarm in on blockers",
            subtitle:
                "Empower team members and key stakeholders to swiftly overcome blockers by providing insightful comments and actionable guidance for unblocking.",
            link: {
                text: "See how engineers use Wallow",
                href: "/engineers",
                accentColor: "red",
            },
            img: {
                src: blockerGrouping,
                style: { marginLeft: "auto" },
                alt: "",
            },
        },
    ]
    const cards = [
        {
            title: "Product",
            subtitle:
                "Receive real-time notifications on blockers that impact product teams.",
            link: {
                text: "See how PMs use Wallow",
                href: "/product-managers",
                accentColor: "red",
            },
            img: { src: product, style: { paddingBottom: "1.5rem" }, alt: "" },
        },
        {
            title: "Design",
            subtitle:
                "Receive real-time notifications on blockers that impact design teams.",
            link: {
                text: "See how designers use Wallow",
                href: "/designers",
                accentColor: "red",
            },
            img: { src: design, style: { paddingBottom: "1.5rem" }, alt: "" },
        },
        {
            title: "Engineering",
            subtitle:
                "Receive real-time notifications on blockers that impact engineering teams.",
            link: {
                text: "See how engineers use Wallow",
                href: "/engineers",
                accentColor: "red",
            },
            img: {
                src: engineering,
                style: { paddingBottom: "1.5rem" },
                alt: "",
            },
        },
    ]

    const ctaItems = [
        {
            title: "Desktop App",
            preview: { src: ctaItem1, alt: "" },
        },
        {
            title: "Mobile App",
            preview: { src: ctaItem1, alt: "" },
        },
    ]

    return (
        <>
            <Hero
                title={"All work blockers in one place"}
                subtitle={`Wallow groups similar cross-team blockers
in your product's development, enabling
swift resolution and smoother teamwork.
Stay in the loop with instant notifications
whenever teams encounter blockers that
might influence your product's progress.`}
                accentColor={"red"}
                button={{ text: "Get Wallow Free", href: "/signup" }}
                drawing={{
                    src: drawing,
                    alt: "",
                    style: { marginBottom: "-.75rem" },
                }}
                preview={{ src: preview, alt: "" }}
            />
            <Partners
                title={`The new default for sharing
blockers with cross-teams with real-
time alerts, ensuring seamless
communication and rapid issue
resolution`}
                subtitle={
                    "Powering startups and Fortune 500 companies around the world."
                }
                partners={[
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                ]}
                cards={
                    <div className="cards-grid">
                        {cards1.map((item) => (
                            <Card
                                key={item.title}
                                {...item}
                            />
                        ))}
                    </div>
                }
                preview={false}
            />
            <Testimonials
                sectionIntro={
                    <SectionIntro
                        drawing={{
                            src: testimonial1Drawing,
                            alt: "",
                            style: { translate: "0px 0px" },
                            position: "right",
                            overlapLevel: 1,
                        }}
                        title={{
                            text: "Easily track recurring blockers to boost performance",
                            center: false,
                            style: {
                                alignSelf: "flex-end",
                                marginBottom: "1rem",
                            },
                        }}
                    />
                }
                testimonials={testimonials1}
            />
            <Cards
                title={"For PMs, designers, engineers, and everyone in between"}
                cards={cards}
            />
            <Testimonials
                testimonials={testimonials3}
                sectionIntro={
                    <SectionIntroLink
                        style={{ marginBottom: 0 }}
                        link={{
                            text: "See all integrations",
                            href: "#",
                            accentColor: "red",
                            style: { marginBottom: "1rem" },
                        }}
                        drawing={{
                            src: pointingDownDrawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 2,
                        }}
                    />
                }
            />
            <CTA
                title={"Boost performance with Wallow"}
                style={{ marginBottom: "1rem" }}
                subtitle={
                    "Play around with it first. Pay and add your team later."
                }
                drawing={{
                    src: lookingDownDrawing,
                    alt: "",
                    style: { marginBottom: "-2rem" },
                }}
                accentColor={"red"}
                button={{ text: "Get Wallow Free", href: "/signup" }}
                link={{
                    text: "Request a demo",
                    href: "https://calendly.com/d/2pm-dd9-xtr/wallow-intro",
                }}
                items={ctaItems}
            />
        </>
    )
}
