import { Hero } from "../../sections/howTeamsUse/Hero"
import hero from "../../assets/designers/hero.png"
import section1Drawing from "../../assets/productManagers/section1Drawing.png"
import section1Img from "../../assets/designers/section1Img.png"
import section2Drawing from "../../assets/productManagers/section2Drawing.png"
import section2Img from "../../assets/designers/section2Img.png"
import section3Drawing from "../../assets/productManagers/section3Drawing.png"
import section3Img from "../../assets/designers/section3Img.png"
import heroDrawing from "../../assets/designers/heroDrawing.png"
import { PartnerLogos } from "../../sections/PartnerLogos"
import { Quote } from "../../sections/Quote"
import { Section } from "../../sections/howTeamsUse/Section"
import { Testimonials } from "../../sections/howTeamsUse/Testimonials"
import { CTA } from "../../sections/howTeamsUse/CTA"

export const ProductManagers = ({ testimonials }) => {
    return (
        <div className="container ">
            <Hero
                drawing={{ src: heroDrawing, alt: "" }}
                title={`Stay aligned to cross-teams progress, blockers,
                & impediments `}
                description={`Get daily progress summaries and real-time
alerts on blockers and impediments from all
teams, spanning engineering, product, HR,
operations, and marketing.`}
                eyebrow={"Wallow for product management "}
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
                    Product development progress <br /> in Wallow
                </h2>
                <PartnerLogos />
            </section>
            <Quote
                title={`“Wallow centralizes work progress, blockers & impediments for every function team, side by side, for effortless product management.”`}
                author={{ name: "Scott Belsky", position: "CPO of Adobe" }}
            />
            <Section
                title={"Share daily progress with cross-teams, faster"}
                description={`Share your prototypes in Figma, product ideas, blockers, 
                impediments — daily, with cross-teams working on 
                your product with little effort so your teams can stay 
                aligned to your product work.`}
                drawing={{ src: section1Drawing, alt: "file folders in a box" }}
                img={{
                    src: section1Img,
                    alt: "Share daily progress with cross-teams, faster",
                }}
            />

            <Quote
                title={`“Before, we had to attend synchronous meetings to get progress updates, blockers & impediments.”`}
                author={{
                    name: "Ken Seeno",
                    position: "Product Design Manager",
                }}
            />
            <Section
                title={"Manage all your products in Wallow"}
                description={`Centralize engineering and non-engineering teams, side by side, 
                by product, to stay aligned to progress, blockers, & impediments. 
                Improve delivery sentiment. Boost cross-team collaboration to get products to market faster with built-in quality.`}
                drawing={{
                    src: section2Drawing,
                    alt: "a drawing of a map with an X destination",
                }}
                img={{
                    src: section2Img,
                    alt: "Manage all your products in Wallow",
                }}
            />

            <Quote
                title={`“Without a tool like Wallow, you run the risk of misalignment with cross-teams.”`}
                author={{
                    name: "Marie Gosal",
                    position: "Design Director, MetaLab",
                }}
            />
            <Section
                title={"Share without attending multiple meetings"}
                description={`Share new ideas with every team, side by side, 
                from engineering, product, HR, operations, to marketing. `}
                drawing={{ src: section3Drawing, alt: "a drawing paper plane" }}
                img={{
                    src: section3Img,
                    alt: "Share without attending multiple meetings",
                }}
                button={"Try Wallow Free"}
            />

            <Testimonials
                title={"A platform for every team"}
                description={`Wallow isn’t just for product management. It’s a
place for all functions to converge to share
progress, tackle blockers, and overcome
impediments.`}
                items={testimonials}
            />

            <CTA />
        </div>
    )
}
