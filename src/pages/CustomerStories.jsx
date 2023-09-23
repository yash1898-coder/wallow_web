import ctaDrawing from "../assets/pricingCtaDrawing.png"
import hero from "../assets/customerStories/hero.png"
import { ReactComponent as ArrowRight } from "../assets/arrowRight.svg"
import { Link } from "react-router-dom"
import { PartnerLogos } from "../sections/PartnerLogos"
import lookingDownDrawing from "../assets/lookingDownDrawing.png"
import partner1 from "../assets/partners/partner1.webp"
import partner2 from "../assets/partners/partner2.svg"
import partner3 from "../assets/partners/partner3.svg"
import partner4 from "../assets/partners/partner4.svg"
import partner5 from "../assets/partners/partner5.svg"
import partner6 from "../assets/partners/partner6.svg"
import partner7 from "../assets/partners/partner7.png"
import partner8 from "../assets/partners/partner8.webp"
import partner1Story from "../assets/customerStories/customerStory1.png"
import partner2Story from "../assets/customerStories/customerStory2.png"
import partner3Story from "../assets/customerStories/customerStory3.png"
import partner4Story from "../assets/customerStories/customerStory4.png"
import partner5Story from "../assets/customerStories/customerStory5.png"
import partner6Story from "../assets/customerStories/customerStory6.png"
import partner7Story from "../assets/customerStories/customerStory7.png"
import partner8Story from "../assets/customerStories/customerStory8.png"
import ctaItem1 from "../assets/progress/ctaItem1.png"
import { CTA } from "../sections/features/CTA"

export const CustomerStories = () => {
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
        <div className="customer-stories container--xl">
            <section className="customer-stories__hero">
                <div className="flow">
                    <h1 className="fs-800 fw-700">Customer stories</h1>
                    <p className=" fs-300  ">
                        Explore how Wallow saves companies time, boost <br />{" "}
                        collaboration, and bring peace of mind.
                    </p>
                    <PartnerLogos full={false} />
                </div>
                <img
                    className="customer-stories__hero-img"
                    src={hero}
                    alt="drawing of people chatting"
                />
            </section>
            <section className="customer-stories__section">
                <CustomerStory
                    text={
                        "How Unqork product managers use Wallow to get real-time updates on work progress "
                    }
                    logo={partner1}
                    alt={"unqork logo"}
                    img={partner1Story}
                />
                <CustomerStory
                    text={
                        "MANTL monitors cross-team delivery sentiment real-time"
                    }
                    logo={partner3}
                    alt={"MANTL logo"}
                    img={partner3Story}
                />
            </section>
            <section className="customer-stories__section">
                <CustomerStory
                    text={
                        "Capchase gets insights to improve delivery experiences and productivity"
                    }
                    logo={partner2}
                    alt={"Capchase logo"}
                    img={partner2Story}
                />
                <CustomerStory
                    text={
                        "Headway uses Wallow to keep everyone aligned to product development updates from teams in engineering to HR"
                    }
                    logo={partner4}
                    alt={"Headway logo"}
                    img={partner4Story}
                />
            </section>
            <section className="customer-stories__section">
                <CustomerStory
                    text={
                        "Ava Labs uses Wallow to unblock teams, faster, improving project timelines"
                    }
                    logo={partner6}
                    alt={"Ava Labs logo"}
                    img={partner6Story}
                />
                <CustomerStory
                    text={
                        "Twelve assess bi-weekly what’s working, and what could’ve been better for engineering teams"
                    }
                    logo={partner8}
                    alt={"Twelve logo"}
                    img={partner8Story}
                />
            </section>
            <section className="customer-stories__section">
                <CustomerStory
                    text={
                        "How Blue Apron saves time by eliminating duplication of efforts to solve issues"
                    }
                    logo={partner5}
                    alt={"Blue Apron logo"}
                    img={partner5Story}
                />
                <CustomerStory
                    text={
                        "How Twitch reduces the repetition of blockers and impediments"
                    }
                    logo={partner7}
                    alt={"Twitch logo"}
                    img={partner7Story}
                />
            </section>
            <CTA
                style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                subtitle={
                    "Play around with it first. Pay and add your team later."
                }
                drawing={{
                    src: lookingDownDrawing,
                    alt: "",
                    style: { marginBottom: "-2rem" },
                }}
                button={{ text: "Get Wallow Free", href: "/signup" }}
                link={{
                    text: "Request a demo",
                    href: "https://calendly.com/d/2pm-dd9-xtr/wallow-intro",
                }}
                items={ctaItems}
            />
        </div>
    )
}

const CustomerStory = ({ text, img, logo, alt }) => {
    return (
        <div className="customer-story">
            <img
                src={img}
                className="customer-story__img preview-img"
                alt={text}
            />
            <img
                className="customer-story__logo"
                src={logo}
                alt={alt}
            />
            <p className="fw-700 ">{text}</p>
        </div>
    )
}
