import { Link } from "react-router-dom"
import member4 from "../../../../assets/about/member4.png"

export const CustomerPersona = () => {
    const persona = {
        name: "Vasyl Polishchuk",
        age: "20",
        gender: "Male",
        location: "Lorem ipsum",
        educationLevel: "Lorem ipsum",
        jobTitle: "Lorem ipsum",
        professionalBackground: "Lorem ipsum",
        yearsOfExperience: "Lorem ipsum",
        currentJobResponsibilities: "Lorem ipsum",
        decisionMakingAuthority: "Lorem ipsum",
        professionalGoals: "Lorem ipsum",
        personalAspirations: "Lorem ipsum",
        aims: "Lorem ipsum",
        workRelatedChallenges: "Lorem ipsum",
        obstacles: "Lorem ipsum",
        problemsToSolve: "Lorem ipsum",
        researchWay: "Lorem ipsum",
        communicationChannels: "Lorem ipsum",
        factorsOnPurchasingDecisions: "Lorem ipsum",
        drivesDecisions: "Lorem ipsum",
        valuesAndPrinciples: "Lorem ipsum",
        typesOfContentEngagement: "Lorem ipsum",
        topicsOfInterest: "Lorem ipsum",
        personalInterests: "Lorem ipsum",
        hobbies: "Lorem ipsum",
        techFamiliarity: "Lorem ipsum",
        digitalToolsComfortLevel: "Lorem ipsum",
        influencersTheyFollow: "Lorem ipsum",
        websitesTheyVisit: "Lorem ipsum",
        competitors: "Lorem ipsum",
        whySwitchToOurSolution: "Lorem ipsum",
        reviews: "Lorem ipsum",
        recommendations: "Lorem ipsum",
        communicationPreferences: "Lorem ipsum",
        language: "Lorem ipsum",
        quotes: "Lorem ipsum",
    }

    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <Link
                style={{ width: "fit-content" }}
                className="button"
                to={"/dashboard/customer-personas"}
            >
                Go back
            </Link>
            <h1 className="fs-700 fw-600 mt">{persona.name} </h1>
            <img
                style={{ maxWidth: 150 }}
                src={member4}
                alt={persona.name}
            />
            <h2 className="fs-600 fw-600 mt">Basic Demographics:</h2>{" "}
            <div>
                <p className="fw-500">
                    <b>Name</b> {persona.name}
                </p>
                <p>
                    <b>Age:</b> {persona.age} years old
                </p>
                <p>
                    <b>Gender: </b>
                    {persona.gender.label}
                </p>
                <p>
                    <b>Location:</b> {persona.location}
                </p>
                <p>
                    <b>Education level:</b> {persona.educationLevel}
                </p>
                <p>
                    <b>Job title:</b> {persona.jobTitle}
                </p>
            </div>
            <h2 className="fs-600 fw-600 mt">Background and Role:</h2>
            <p>
                <b>
                    {" "}
                    Professional background: <br />
                </b>{" "}
                {persona.professionalBackground}
            </p>
            <p>
                <b>
                    {" "}
                    Years of experience: <br />
                </b>{" "}
                {persona.yearsOfExperience}
            </p>
            <p>
                <b>
                    {" "}
                    Current job responsibilities: <br />
                </b>{" "}
                {persona.currentJobResponsibilities}
            </p>
            <p>
                <b>
                    {" "}
                    Decision making authority: <br />
                </b>{" "}
                {persona.decisionMakingAuthority}
            </p>
            <h2 className="fs-600 fw-600 mt">Goals and Objectives:</h2>
            <p>
                <b>
                    {" "}
                    Professional goals: <br />
                </b>{" "}
                {persona.professionalGoals}
            </p>
            <p>
                <b>
                    {" "}
                    Personal aspirations: <br />
                </b>{" "}
                {persona.personalAspirations}
            </p>
            <p>
                <b> What they aim to achieve with your product or service</b>:{" "}
                <br /> {persona.aims}
            </p>
            <h2 className="fs-600 fw-600 mt">Challenges and Pain Points:</h2>
            <p>
                <b>
                    {" "}
                    Work-related challenges: <br />
                </b>{" "}
                {persona.challenges}
            </p>
            <p>
                <b>
                    {" "}
                    Frustrations or obstacles they face: <br />
                </b>{" "}
                {persona.obstacles}
            </p>
            <p>
                <b>
                    {" "}
                    Problems they're looking to solve with your solution: <br />
                </b>{" "}
                {persona.problemsToSolve}
            </p>
            <h2 className="fs-600 fw-600 mt">Buying Behavior:</h2>
            <p>
                <b>
                    {" "}
                    How they research products/services: <br />
                </b>{" "}
                {persona.researchWay}
            </p>
            <p>
                <b>
                    {" "}
                    Preferred communication channels: <br />
                </b>{" "}
                {persona.communicationChannels}
            </p>
            <p>
                <b>
                    {" "}
                    Factors influencing purchasing decisions: <br />
                </b>{" "}
                {persona.purchasingDecisionsFactors}
            </p>
            <h2 className="fs-600 fw-600 mt">Motivations and Values:</h2>
            <p>
                <b>
                    {" "}
                    What drives their decisions: <br />
                </b>{" "}
                {persona.drivesDecisions}
            </p>
            <p>
                <b>
                    {" "}
                    Values and principles they prioritize: <br />
                </b>{" "}
                {persona.valuesAndPrinciples}
            </p>
            <h2 className="fs-600 fw-600 mt">
                Preferred Content and Information:
            </h2>
            <p>
                <b>
                    {" "}
                    Types of content they engage with (e.g., blogs, videos,
                    webinars): <br />
                </b>{" "}
                {persona.typesOfContentEngagement}
            </p>
            <p>
                <b>
                    {" "}
                    Topics they're interested in: <br />
                </b>{" "}
                {persona.topicsOfInterest}
            </p>
            <h2 className="fs-600 fw-600 mt">Interests and Hobbies:</h2>
            <p>
                <b>
                    Personal interests outside of work: <br />
                </b>{" "}
                {persona.personalInterests}
            </p>
            <p>
                <b>
                    {" "}
                    Hobbies and leisure activities: <br />
                </b>{" "}
                {persona.hobbies}
            </p>
            <h2 className="fs-600 fw-600 mt">Tech Savviness:</h2>
            <p>
                <b>
                    {" "}
                    Familiarity with technology: <br />
                </b>{" "}
                {persona.techFamiliarity}
            </p>
            <p>
                <b>
                    {" "}
                    Comfort level with using digital tools: <br />
                </b>{" "}
                {persona.digitalToolsComfortLevel}
            </p>
            <h2 className="fs-600 fw-600 mt">
                Influences and Sources of Information:
            </h2>
            <p>
                <b>
                    {" "}
                    Industry influencers they follow: <br />
                </b>{" "}
                {persona.influencersTheyFollow}
            </p>
            <p>
                <b>
                    {" "}
                    Websites, publications, or forums they visit: <br />
                </b>{" "}
                {persona.websitesTheyVisit}
            </p>
            <h2 className="fs-600 fw-600 mt">
                Preferred Solutions and Alternatives:
            </h2>
            <p>
                <b>
                    {" "}
                    Current solutions they use (competitors): <br />
                </b>{" "}
                {persona.competitors}
            </p>
            <p>
                <b>
                    {" "}
                    Why they might consider switching to your solution: <br />
                </b>{" "}
                {persona.whySwitchToOurSolution}
            </p>
            <h2 className="fs-600 fw-600 mt">Feedback and Recommendations:</h2>
            <p>
                <b>
                    {" "}
                    Reviews and feedback they've given or received: <br />
                </b>{" "}
                {persona.reviews}
            </p>
            <p>
                <b>
                    {" "}
                    Recommendations they've made to peers: <br />
                </b>{" "}
                {persona.recommendations}
            </p>
            <h2 className="fs-600 fw-600 mt">Communication Style:</h2>
            <p>
                <b>
                    {" "}
                    How they prefer to communicate: <br />
                </b>{" "}
                {persona.communicationPreferences}
            </p>
            <p>
                <b>
                    {" "}
                    Tone and language they resonate with: <br />
                </b>{" "}
                {persona.language}
            </p>
            <h2 className="fs-600 fw-600 mt">Key quotes:</h2>
            <p>
                <b>
                    Direct quotes or statements that reflect their opinions or
                    needs: <br />
                </b>{" "}
                {persona.quotes}
            </p>
        </div>
    )
}
