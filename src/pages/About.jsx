import { AboutSection } from "../sections/about/AboutSection"
import { Hero } from "../sections/about/Hero"
import img1 from "../assets/about/1.png"
import img2 from "../assets/about/2.png"
import img3 from "../assets/about/3.png"
import img4 from "../assets/about/4.png"
import img5 from "../assets/about/5.png"
import member1 from "../assets/about/member1.png"
import member2 from "../assets/about/member2.png"
import member3 from "../assets/about/member3.png"
import member4 from "../assets/about/member4.png"
import member5 from "../assets/about/member5.png"
import member6 from "../assets/about/member6.png"
import member7 from "../assets/about/member7.png"
import member8 from "../assets/about/member8.png"
import member9 from "../assets/about/member9.png"
import member10 from "../assets/about/member10.png"
import { TeamMember } from "../components/TeamMember"

export const About = () => {
    const team = [
        {
            name: "Joakim Marner",
            position: "Agile Coach",
            img: member1,
        },
        {
            name: "Charles Polanco",
            position: "Head of Product",
            img: member2,
        },
        {
            name: "Prima Marte",
            position: "UX/UI Designer",
            img: member3,
        },
        {
            name: "Vasyl Polishchuk",
            position: "Engineer",
            img: member4,
        },
        {
            name: "Vitaly K",
            position: "Illustrator",
            img: member5,
        },
        {
            name: "Mohin Patel",
            position: "Head of Sales",
            img: member6,
        },
        {
            name: "Mateo Paris",
            position: "Designer",
            img: member7,
        },
        {
            name: "Pratik Hadawale",
            position: "Engineer",
            img: member8,
        },
        {
            name: "Waleed Khan",
            position: "Engineer",
            img: member9,
        },
        {
            name: "Manish Babbar",
            position: "ML Engineer",
            img: member10,
        },
    ]

    return (
        <div className="container--lg">
            <Hero />
            <h2
                className=" fs-700 fw-700 mt"
                style={{ "--margin": "3.5rem" }}
            >
                Mission
            </h2>
            <p
                className="mt"
                style={{ maxWidth: "60ch", "--margin": ".8rem" }}
            >
                Our mission is to empower product leaders and their teams to
                drive innovation and success through seamless communication and
                collaboration.
            </p>
            <h2
                className=" fs-800 fw-700 mt"
                style={{ "--margin": "min(6vw, 5rem)" }}
            >
                A short story on communicating work <br /> happening across
                teams
            </h2>
            <AboutSection img={img1}>
                <div className="flow">
                    <p>
                        Jack, an engineer, works on a team responsible for
                        building a new digital product. Each day, he meets with
                        his team to share his progress, blockers, and
                        impediments. However, Jack often feels disconnected from
                        the progress of the other five teams working on the same
                        project. The lack of real-time updates leaves him
                        wondering if they encounter similar obstacles. As a
                        result, valuable time and resources are wasted as teams
                        unknowingly duplicate their efforts to overcome shared
                        blockers.
                    </p>
                </div>
            </AboutSection>
            <AboutSection img={img2}>
                <p>
                    Jill, a dedicated product owner, collaborates with Jack's
                    engineering team. She understands the importance of staying
                    informed about the progress of other non-engineering teams,
                    such as design, marketing, operations, HR, and the other
                    engineering teams. However, attending countless meetings to
                    gather updates consumes her time and hinders her ability to
                    focus on quality work and support her team effectively. Jill
                    contemplates sending work progress summary emails, but with
                    six teams involved, it's clear that a more efficient
                    communication method is needed.
                </p>
            </AboutSection>
            <AboutSection img={img3}>
                <p>
                    Supporting both Jack and Jill, Sue, an engineer, attends
                    weekly sync-up events with other engineers. During these
                    meetings, she realizes that similar blockers and impediments
                    plague multiple teams. Independent efforts to find solutions
                    to these recurring challenges result in wasted resources and
                    limit the collective effectiveness of the teams.
                    Additionally, Sue observes a gap between sharing insights
                    and implementing improvements. Despite discussing potential
                    solutions during the sync-ups, it often feels like the
                    shared information isn't fully utilized, and resolutions to
                    blockers are already discovered before they can be addressed
                    as a group.
                </p>
            </AboutSection>
            <AboutSection img={img5}>
                <div className="flow">
                    <p>
                        Together, Jack, Jill, and Sue represent the common
                        challenges faced by teams working in silos, lacking
                        real-time updates, and struggling to leverage shared
                        insights effectively. They yearn for a more cohesive and
                        efficient approach to collaboration. Recognizing the
                        need for improved communication, transparency, and
                        knowledge sharing, they seek a solution that can bridge
                        these gaps and facilitate seamless collaboration across
                        the teams involved in the project.
                    </p>
                    <p>
                        Hopefully you've gotten a good sense of why we started
                        Wallow.
                    </p>
                    <p>
                        Challenging the status quo is not an easy task. Check
                        out the product! Write in! We need early adopters like
                        you to start a movement.
                    </p>
                    <p>See you soon!</p>
                </div>
            </AboutSection>
            <section className="about-section container--sm">
                <p className="fs-600 fw-700">
                    “The best way to predict the future is to invent it.”
                </p>
                <p className="fs-500">Alan Kay, computing pioneer</p>
            </section>
            <section className="about-section container--sm flow">
                <h2 className="fw-700 fs-700">Join us</h2>
                <p style={{ maxWidth: "500px" }}>
                    Wallow is based in New York. We are a diverse group of
                    people interested in computing, history, art, alternative
                    programming languages, and skateboarding.
                </p>

                <p>
                    Interested in joining us?{" "}
                    <a
                        className="link inline"
                        href="#"
                    >
                        Learn more here
                    </a>{" "}
                    👈
                </p>
            </section>
            <section className="about-section container--sm about-team-members flow">
                <h2 className="fw-700 fs-700">Who we are</h2>
                <p>
                    We are fortunate to work with some of the best talent in the
                    world.
                </p>

                <div className="about-team-members__grid">
                    {team.map((m) => (
                        <TeamMember
                            key={m.name}
                            {...m}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
