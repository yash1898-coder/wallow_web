import drawing from "../../assets/insights/heroDrawing.png"
import screen1 from "../../assets/insights/screen1.png"
import { Partners } from "../../sections/features/Partners"
import figma from "../../assets/figma.png"
import { Testimonials } from "../../sections/features/Testimonials"
import { SectionIntro } from "../../components/SectionIntro"
import feature1Drawing from "../../assets/blockers/testimonial1Drawing.png"
import feature2Drawing from "../../assets/impediments/testimonial1Drawing.png"
import screen2 from "../../assets/insights/screen2.png"
import { CTA } from "../../sections/features/CTA"
import lookingDownDrawing from "../../assets/lookingDownDrawing.png"
import ctaItem1 from "../../assets/progress/ctaItem1.png"
import { HeroWithOverlap } from "../../sections/features/HeroWithOverlap"

export const Insights = () => {
    const testimonials1 = [
        {
            title: "All your recurring blockers in one place.",
            subtitle:
                "See the bigger picture of how recurring blockers impact teams working on your product in the past 1 week up to 1 year.",
            wide: true,
            preview: "testimonial1",
            previewAlt: "",
        },
    ]

    const testimonials3 = [
        {
            title: "What’s impeding your teams from moving faster, all in one place.",
            subtitle:
                "Ever wonder what’s slowing down teams working on your product, stop wondering, quickly asses recurring impediments in the past 1 week up to 1 year. ",
            wide: true,
            preview: screen2,
            previewAlt:
                "Identify recurring impediments in the past 1W up to 1Y.",
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
            <HeroWithOverlap
                title={
                    "Insights to boost performance derived from delivery experiences "
                }
                subtitle={
                    "Uncover the delivery experiences that are holding back productivity and performance, and empower your team to excel."
                }
                accentColor={"blue"}
                button={{ text: "Get Wallow Free", href: "/signup" }}
                drawing={{
                    src: drawing,
                    alt: "",
                    style: { marginBottom: "-.75rem" },
                }}
                preview={{
                    src: screen1,
                    alt: "Insights to boost performance derived from delivery experiences",
                }}
            />
            <Partners
                subtitle={"Trusted by teams of 100 to 1000+"}
                partners={[
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                    { src: figma, alt: "" },
                ]}
                preview={false}
            />
            <Testimonials
                sectionIntro={
                    <SectionIntro
                        drawing={{
                            src: feature1Drawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 1,
                        }}
                        title={{
                            text: "Identify recurring blockers in the past 1W up to 1Y.  ",
                            center: false,
                            style: {
                                alignSelf: "flex-end",
                                marginBottom: "2rem",
                            },
                        }}
                    />
                }
                testimonials={testimonials1}
            />
            <Testimonials
                testimonials={testimonials3}
                sectionIntro={
                    <SectionIntro
                        style={{ marginBottom: 0, alignItems: "flex-end" }}
                        title={{
                            text: "Identify recurring impediments in the past 1W up to 1Y.  ",
                            style: {
                                alignSelf: "flex-end",
                                marginBottom: "2rem",
                            },
                        }}
                        drawing={{
                            src: feature2Drawing,
                            alt: "",
                            position: "right",
                            overlapLevel: 0,
                            style: { marginBottom: "-.5rem" },
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
                accentColor={"blue"}
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
