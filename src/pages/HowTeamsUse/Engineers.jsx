import { Hero } from "../../sections/howTeamsUse/Hero"
import hero from "../../assets/designers/hero.png"
import section1Drawing from "../../assets/engineers/section1Drawing.png"
import section1Img from "../../assets/designers/section1Img.png"
import section2Drawing from "../../assets/engineers/section2Drawing.png"
import section2Img from "../../assets/designers/section2Img.png"
import section3Drawing from "../../assets/engineers/section3Drawing.png"
import section3Img from "../../assets/designers/section3Img.png"
import heroDrawing from "../../assets/designers/heroDrawing.png"
import { PartnerLogos } from "../../sections/PartnerLogos"
import { Quote } from "../../sections/Quote"
import { Section } from "../../sections/howTeamsUse/Section"
import { Testimonials } from "../../sections/howTeamsUse/Testimonials"
import { CTA } from "../../sections/howTeamsUse/CTA"

export const Engineers = ({ testimonials }) => {
    return (
        <div className="container ">
            <Hero
                drawing={{ src: heroDrawing, alt: "" }}
                title={`Stay in sync with other teams' progress, blockers, & impediments.`}
                description={`Receive daily work progress summaries from
                other engineering and non-engineering teams
                working on the same product.`}
                eyebrow={"Wallow for engineers"}
            />
            <img
                className=" preview-img"
                src={hero}
                alt="Keep cross-teams aligned to your design work"
            />
            <section
                className="mt"
                style={{ paddingTop: "min(8vw, 5rem)" }}
            >
                <h2 className="fs-700  fw-700 text-center">
                    Engineering work progress <br /> in Wallow
                </h2>
                <PartnerLogos />
            </section>
            <Quote
                title={`“Wallow groups similar daily blockers so cross-teams can collaborate on blockers more effectively.”`}
                author={{ name: "Scott Belsky", position: "CPO of Adobe" }}
            />
            <Section
                title={`Collaborate with other 
engineering teams on blockers & impediments`}
                description={`Engineering teams share progress, blockers, & impediments 
                — daily, Wallow group similar daily blockers & impediments 
                to help reduce duplication of efforts and boost cross-team
                collaboration.`}
                drawing={{ src: section1Drawing, alt: "file folders in a box" }}
                img={{
                    src: section1Img,
                    alt: `Collaborate with other 
                engineering teams on blockers & impediments`,
                }}
            />

            <Quote
                title={`“Before, we had to attend synchronous meetings to share blockers and impediments.”`}
                author={{
                    name: "Ken Seeno",
                    position: "Product Design Manager",
                }}
            />
            <Section
                title={"Put your progress in context to stay aligned"}
                description={`Work doesn’t live in a vacuum. Centralize dozens of 
                conversations with engineering, product and design 
                to stay on top of all iterations and decisions.`}
                drawing={{
                    src: section2Drawing,
                    alt: "a drawing of a map with an X destination",
                }}
                img={{
                    src: section2Img,
                    alt: "Put your progress in context to stay aligned",
                }}
            />

            <Quote
                title={`“Without a tool like Wallow, you run the risk of duplicating efforts to solve similar challenges.”`}
                author={{
                    name: "Marie Gosal",
                    position: "Design Director, MetaLab",
                }}
            />
            <Section
                title={"Share without attending multiple meetings"}
                description={`Share new progress, blockers, & impediments with every team, 
                side by side, from engineering, product, HR, operations, to marketing.  `}
                drawing={{ src: section3Drawing, alt: "a drawing paper plane" }}
                img={{
                    src: section3Img,
                    alt: "Share without attending multiple meetings",
                }}
                button={"Try Wallow Free"}
            />

            <Testimonials
                title={"A platform for every team"}
                description={`Wallow isn’t just for engineers. It’s a place for
all functions to converge to share progress, tackle
blockers, and overcome impediments.`}
                items={testimonials}
            />

            <CTA />
        </div>
    )
}
