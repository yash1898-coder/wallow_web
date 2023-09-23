import { Hero } from "../../sections/howTeamsUse/Hero"
import hero from "../../assets/designers/hero.png"
import section1Drawing from "../../assets/designers/section1Drawing.png"
import section1Img from "../../assets/designers/section1Img.png"
import section2Drawing from "../../assets/designers/section2Drawing.png"
import section2Img from "../../assets/designers/section2Img.png"
import section3Drawing from "../../assets/designers/section3Drawing.png"
import section3Img from "../../assets/designers/section3Img.png"
import heroDrawing from "../../assets/designers/heroDrawing.png"
import { PartnerLogos } from "../../sections/PartnerLogos"
import { Quote } from "../../sections/Quote"
import { Section } from "../../sections/howTeamsUse/Section"
import { Testimonials } from "../../sections/howTeamsUse/Testimonials"
import { CTA } from "../../sections/howTeamsUse/CTA"

export const Designers = ({ testimonials }) => {
    return (
        <div className="container ">
            <Hero
                drawing={{ src: heroDrawing, alt: "" }}
                title={"Keep cross-teams aligned to your <br /> design work"}
                description={`Share your design assets and specs with cross-teams in Wallow. So your teams stay aligned to 
            design progress, blockers, and impediments.`}
                eyebrow={"Wallow for designers"}
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
                    Design work progress in Wallow
                </h2>
                <PartnerLogos />
            </section>
            <Quote
                title={`“Wallow is the easiest to share new design assets and specs with my teams, daily. I simply share. That's where Wallow comes in.”`}
                author={{ name: "Scott Belsky", position: "CPO of Adobe" }}
            />
            <Section
                title={"Share daily design progress with cross-teams, faster"}
                description={`Share your prototypes in Figma, logos in Google Drive, and tasks
            in Trello, blockers, impediments — daily, with cross-teams working 
            on the same product with little effort so you can stay focused on
            your creative work.`}
                drawing={{ src: section1Drawing, alt: "file folders in a box" }}
                img={{
                    src: section1Img,
                    alt: "Share daily design progress with cross-teams, faster",
                }}
            />

            <Quote
                title={`“Before, we had to attend synchronous meetings to share design work progress.”`}
                author={{
                    name: "Ken Seeno",
                    position: "Product Design Manager",
                }}
            />
            <Section
                title={"Put your designs in context to stay aligned"}
                description={`Designs don't live in a vacuum. Centralize dozens of 
                conversations with engineering and marketing to stay 
                on top of all iterations and decisions.`}
                drawing={{
                    src: section2Drawing,
                    alt: "a drawing of a map with an X destination",
                }}
                img={{
                    src: section2Img,
                    alt: "Put your designs in context to stay aligned",
                }}
            />

            <Quote
                title={`“Without a tool like Wallow, you run the risk of ideas not being shared and context not being captured.”`}
                author={{
                    name: "Marie Gosal",
                    position: "Design Director, MetaLab",
                }}
            />
            <Section
                title={"Share without attending multiple meetings"}
                description={`Share new design ideas with every team, side by side, 
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
                description={`Wallow isn’t just for designers. It’s a place for all functions to converge to share progress, tackle blockers,
and overcome impediments.`}
                items={testimonials}
            />

            <CTA />
        </div>
    )
}
