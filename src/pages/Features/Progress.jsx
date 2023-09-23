import { Hero } from "../../sections/features/Hero"
import drawing from "../../assets/progress/heroDrawing.png"
import preview from "../../assets/progress/heroPreview.png"
import { Partners } from "../../sections/features/Partners"
import figma from "../../assets/figma.png"
import { Testimonials } from "../../sections/features/Testimonials"
import { SectionIntro } from "../../components/SectionIntro"
import { Feature } from "../../sections/features/Feature"
import pointingDownDrawing from "../../assets/pointingDownDrawing.png"
import feature1Preview from "../../assets/progress/feature1Preview.png"
import lookingDownDrawing from "../../assets/lookingDownDrawing.png"
import analyticsPreview from "../../assets/progress/analyticsPreview.png"
import { SectionIntroLink } from "../../components/SectionIntroLink"
import testimonial3Icon from "../../assets/progress/testimonial3Icon.png"
import target from "../../assets/progress/target.png"
import notification from "../../assets/progress/notification.png"
import analytics from "../../assets/progress/analytics.png"
import retrospective from "../../assets/progress/retrospective.png"
import testimonial1 from "../../assets/progress/testimonial1Preview.png"
import testimonial2 from "../../assets/progress/testimonial2Preview.png"
import testimonialsDrawing from "../../assets/progress/testimonialsDrawing.png"
import { Cards } from "../../sections/features/Cards"
import engineering from "../../assets/engineering.png"
import product from "../../assets/product.png"
import design from "../../assets/design.png"
import feature2Drawing from "../../assets/progress/feature2Drawing.png"
import feature2Preview from "../../assets/progress/feature2Preview.png"
import { CTA } from "../../sections/features/CTA"
import ctaDrawing from "../../assets/progress/ctaDrawing.png"
import ctaItem1 from "../../assets/progress/ctaItem1.png"

export const Progress = () => {
    const testimonials1 = [
        {
            icon: target,
            title: "Get the information you need — while allowing your teams to stay focused.",
            subtitle:
                "Attending synchronous meetings can be a daunting task for some teams, Wallow makes it easy to share progress, blockers, and impediments anytime without the need for meetings.",
            wide: true,
            preview: testimonial1,
            previewAlt: "",
        },
        {
            icon: notification,
            title: "Notification",
            subtitle:
                "Never wonder “are my teams on track?” Wallow keeps you up- to - date on work progress.",
            preview: testimonial2,
            previewAlt: "",
        },
        {
            quote: {
                img: testimonial3Icon,
                alt: "",
                text: "Wallow provides a single source of truth and helps us avoid redundant information.",
                name: "Brian Blount",
                position: "VP of Technology, Paper",
            },
        },
    ]
    const testimonials2 = [
        {
            icon: analytics,
            title: "Analytics to stayed informed delivery experiences",
            subtitle:
                "Monitor your team’s delivery experiences over time, you can track progress and see if experiences are trending in the desired direction.",
            wide: true,
            preview: analyticsPreview,
            previewAlt: "",
        },
    ]

    const testimonials3 = [
        {
            icon: retrospective,
            title: "Retrospective derived from delivery experiences",
            subtitle:
                "Retrospective derived from delivery experiences —  quickly assess what’s working, and what could’ve been better.",
            link: { text: "Learn more", href: "#", accentColor: "green" },
            wide: true,
            preview: feature2Preview,
            previewAlt: "",
        },
    ]

    const cards = [
        {
            title: "Engineering",
            subtitle:
                "Get resolution on blockers & impediments faster, share work progress, all in one place.",
            link: {
                text: "See how engineers use Wallow",
                href: "/engineers",
                accentColor: "green",
            },
            img: {
                src: engineering,
                style: { paddingBottom: "1.5rem" },
                alt: "",
            },
        },
        {
            title: "Product",
            subtitle:
                "Share progress on new features, blockers & impediments with engineering, design, and sales, etc., all in one place.",
            link: {
                text: "See how PMs use Wallow",
                href: "/product-managers",
                accentColor: "green",
            },
            img: { src: product, style: { paddingBottom: "1.5rem" }, alt: "" },
        },
        {
            title: "Design",
            subtitle:
                "Share new product design changes, blockers & impediments with product, design, engineering, etc., anytime, all in one place.",
            link: {
                text: "See how designers use Wallow",
                href: "/designers",
                accentColor: "green",
            },
            img: { src: design, style: { paddingBottom: "1.5rem" }, alt: "" },
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
                title={"All work progress in one place"}
                subtitle={
                    "It’s hard to keep up to date on work progress when multiple teams are simultaneously involved in your product's development. Wallow provides you with daily updates on the advancement achieved by your teams."
                }
                accentColor={"green"}
                button={{ text: "Get Wallow Free", href: "/signup" }}
                drawing={{ src: drawing, alt: "" }}
                preview={{ src: preview, alt: "" }}
            />
            <Partners
                title={
                    "The new default for sharing progress & staying informed"
                }
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
                preview={{ src: preview, alt: "" }}
            />
            <Testimonials
                sectionIntro={
                    <SectionIntro
                        drawing={{
                            src: testimonialsDrawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 0,
                        }}
                        title={{ text: "Clear your calendar", center: true }}
                    />
                }
                testimonials={testimonials1}
            />
            <Feature
                sectionIntro={
                    <SectionIntro
                        link={{
                            text: "See all integrations",
                            href: "#",
                            accentColor: "green",
                        }}
                        drawing={{
                            src: pointingDownDrawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 2,
                        }}
                        title={{
                            text: "Centralize all your cross-teams work progress in Wallow.",
                        }}
                    />
                }
                preview={{ src: feature1Preview, alt: "" }}
            />
            <Testimonials
                testimonials={testimonials2}
                sectionIntro={
                    <SectionIntroLink
                        link={{
                            text: "Talk to sales",
                            href: "#",
                            accentColor: "green",
                        }}
                        drawing={{
                            src: lookingDownDrawing,
                            alt: "",
                            position: "left",
                            overlapLevel: 1,
                        }}
                    />
                }
            />
            <Cards
                title={"Designed to be loved by every type of team"}
                cards={cards}
            />
            <Testimonials
                testimonials={testimonials3}
                sectionIntro={
                    <SectionIntroLink
                        link={{
                            text: "Explore the template gallery",
                            href: "#",
                            accentColor: "green",
                        }}
                        drawing={{
                            src: feature2Drawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 0,
                            style: { marginBottom: "-2.65rem" },
                        }}
                    />
                }
            />
            <CTA
                subtitle={
                    "Play around with it first. Pay and add your team later."
                }
                drawing={{
                    src: ctaDrawing,
                    alt: "",
                    nestingLevel: 1,
                    style: { marginBottom: "-3rem" },
                }}
                accentColor={"green"}
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
