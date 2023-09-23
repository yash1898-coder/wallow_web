import { useState } from "react"
import member4 from "../../../../assets/about/member4.png"
import { Link } from "react-router-dom"
import { Select } from "../../../../components/Select"

export const CustomerPersonas = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: { value: "Choose...", label: "Choose..." },
        location: "",
        educationLevel: "",
        jobTitle: "",
        professionalBackground: "",
        yearsOfExperience: "",
        currentJobResponsibilities: "",
        decisionMakingAuthority: "",
        professionalGoals: "",
        personalAspirations: "",
        aims: "",
        workRelatedChallenges: "",
        obstacles: "",
        problemsToSolve: "",
        researchWay: "",
        communicationChannels: "",
        purchasingDecisionsFactors: "",
        drivesDecisions: "",
        valuesAndPrinciples: "",
        typesOfContentEngagement: "",
        topicsOfInterest: "",
        personalInterests: "",
        hobbies: "",
        techFamiliarity: "",
        digitalToolsComfortLevel: "",
        influencersTheyFollow: "",
        websitesTheyVisit: "",
        competitors: "",
        whySwitchToOurSolution: "",
        reviews: "",
        recommendations: "",
        communicationPreferences: "",
        language: "",
        quotes: "",
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const [editing, setEditing] = useState(false)

    const data = [
        {
            id: 1,
            name: "Vasyl Polishchuk",
            age: "20",
            gender: { value: "Male", label: "Male" },
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
        },
        {
            id: 1,
            name: "Vasyl Polishchuk",
            age: "20",
            gender: { value: "Male", label: "Male" },
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
        },
    ]

    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <div
                className="flex justify-between"
                style={{ minHeight: "40px" }}
            >
                <h1 className="fs-700 fw-600">Customer Personas</h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Add customer
                    </button>
                )}
            </div>
            {editing && (
                <form
                    style={{ maxWidth: 500 }}
                    className="flow customer-personas-form"
                >
                    <h2 className="fs-600 fw-600 mt">Basic Demographics:</h2>
                    <div className="flex w-full">
                        <div style={{ width: "50%" }}>
                            <label htmlFor="age">Age</label>
                            <input
                                onChange={onChange}
                                value={formData.age}
                                required
                                name="age"
                                id="age"
                                type="text"
                                className="input"
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="gender">Gender</label>
                            <Select
                                options={[
                                    { value: "Male", label: "Male" },
                                    { value: "Female", label: "Female" },
                                    { value: "Other", label: "Other" },
                                ]}
                                currOption={formData.gender}
                                onChange={(o) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        gender: o,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            onChange={onChange}
                            value={formData.location}
                            required
                            name="location"
                            id="location"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="educationLevel">Education level</label>
                        <input
                            onChange={onChange}
                            value={formData.educationLevel}
                            required
                            name="educationLevel"
                            id="educationLevel"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="jobTitle">Job title</label>
                        <input
                            onChange={onChange}
                            value={formData.jobTitle}
                            required
                            name="jobTitle"
                            id="jobTitle"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Background and Role:</h2>
                    <div>
                        <label htmlFor="professionalBackground">
                            Professional background
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.professionalBackground}
                            required
                            name="professionalBackground"
                            id="professionalBackground"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="yearsOfExperience">
                            Years of experience
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.yearsOfExperience}
                            required
                            name="yearsOfExperience"
                            id="yearsOfExperience"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="currentJobResponsibilities">
                            Current job responsibilities
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.currentJobResponsibilities}
                            required
                            name="currentJobResponsibilities"
                            id="currentJobResponsibilities"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="decisionMakingAuthority">
                            Decision making authority
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.decisionMakingAuthority}
                            required
                            name="decisionMakingAuthority"
                            id="decisionMakingAuthority"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Goals and Objectives:</h2>
                    <div>
                        <label htmlFor="professionalGoals">
                            Professional goals
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.professionalGoals}
                            required
                            name="professionalGoals"
                            id="professionalGoals"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="personalAspirations">
                            Personal aspirations
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.personalAspirations}
                            required
                            name="personalAspirations"
                            id="personalAspirations"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="aims">
                            What they aim to achieve with your product or
                            service
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.aims}
                            required
                            name="aims"
                            id="aims"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Challenges and Pain Points:
                    </h2>
                    <div>
                        <label htmlFor="challenges">
                            Work-related challenges
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.challenges}
                            required
                            name="challenges"
                            id="challenges"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="obstacles">
                            Frustrations or obstacles they face
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.obstacles}
                            required
                            name="obstacles"
                            id="obstacles"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="problemsToSolve">
                            Problems they're looking to solve with your solution
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.problemsToSolve}
                            required
                            name="problemsToSolve"
                            id="problemsToSolve"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Buying Behavior:</h2>
                    <div>
                        <label htmlFor="researchWay">
                            How they research products/services
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.researchWay}
                            required
                            name="researchWay"
                            id="researchWay"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="communicationChannels">
                            Preferred communication channels
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.communicationChannels}
                            required
                            name="communicationChannels"
                            id="communicationChannels"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="purchasingDecisionsFactors">
                            Factors influencing purchasing decisions
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.purchasingDecisionsFactors}
                            required
                            name="purchasingDecisionsFactors"
                            id="purchasingDecisionsFactors"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Motivations and Values:
                    </h2>
                    <div>
                        <label htmlFor="drivesDecisions">
                            What drives their decisions
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.drivesDecisions}
                            required
                            name="drivesDecisions"
                            id="drivesDecisions"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="valuesAndPrinciples">
                            Values and principles they prioritize
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.valuesAndPrinciples}
                            required
                            name="valuesAndPrinciples"
                            id="valuesAndPrinciples"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Preferred Content and Information:
                    </h2>
                    <div>
                        <label htmlFor="typesOfContentEngagement">
                            Types of content they engage with (e.g., blogs,
                            videos, webinars)
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.typesOfContentEngagement}
                            required
                            name="typesOfContentEngagement"
                            id="typesOfContentEngagement"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="topicsOfInterest">
                            Topics they're interested in
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.topicsOfInterest}
                            required
                            name="topicsOfInterest"
                            id="topicsOfInterest"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Interests and Hobbies:</h2>
                    <div>
                        <label htmlFor="personalInterests">
                            Personal interests outside of work
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.personalInterests}
                            required
                            name="personalInterests"
                            id="personalInterests"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="hobbies">
                            Hobbies and leisure activities
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.hobbies}
                            required
                            name="hobbies"
                            id="hobbies"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Tech Savviness:</h2>
                    <div>
                        <label htmlFor="techFamiliarity">
                            Familiarity with technology
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.techFamiliarity}
                            required
                            name="techFamiliarity"
                            id="techFamiliarity"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="digitalToolsComfortLevel">
                            Comfort level with using digital tools
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.digitalToolsComfortLevel}
                            required
                            name="digitalToolsComfortLevel"
                            id="digitalToolsComfortLevel"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Influences and Sources of Information:
                    </h2>
                    <div>
                        <label htmlFor="influencersTheyFollow">
                            Industry influencers they follow
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.influencersTheyFollow}
                            required
                            name="influencersTheyFollow"
                            id="influencersTheyFollow"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="websitesTheyVisit">
                            Websites, publications, or forums they visit
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.websitesTheyVisit}
                            required
                            name="websitesTheyVisit"
                            id="websitesTheyVisit"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Preferred Solutions and Alternatives:
                    </h2>
                    <div>
                        <label htmlFor="competitors">
                            Current solutions they use (competitors)
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.competitors}
                            required
                            name="competitors"
                            id="competitors"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="whySwitchToOurSolution">
                            Why they might consider switching to your solution
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.whySwitchToOurSolution}
                            required
                            name="whySwitchToOurSolution"
                            id="whySwitchToOurSolution"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">
                        Feedback and Recommendations:
                    </h2>
                    <div>
                        <label htmlFor="reviews">
                            Reviews and feedback they've given or received
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.reviews}
                            required
                            name="reviews"
                            id="reviews"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="recommendations">
                            Recommendations they've made to peers
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.recommendations}
                            required
                            name="recommendations"
                            id="recommendations"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Communication Style:</h2>
                    <div>
                        <label htmlFor="communicationPreferences">
                            How they prefer to communicate
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.communicationPreferences}
                            required
                            name="communicationPreferences"
                            id="communicationPreferences"
                            type="text"
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="language">
                            Tone and language they resonate with
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.language}
                            required
                            name="language"
                            id="language"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Key quotes:</h2>
                    <div>
                        <label htmlFor="quotes">
                            Direct quotes or statements that reflect their
                            opinions or needs
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.quotes}
                            required
                            name="quotes"
                            id="quotes"
                            type="text"
                            className="input"
                        />
                    </div>
                    <h2 className="fs-600 fw-600 mt">Name:</h2>
                    <div>
                        <label htmlFor="name">
                            Give your persona a name and consider adding an
                            image to make it more relatable.
                        </label>
                        <input
                            onChange={onChange}
                            value={formData.name}
                            required
                            name="name"
                            id="name"
                            type="text"
                            className="input"
                        />
                    </div>
                </form>
            )}
            <div className="flex mt">
                {editing && (
                    <button
                        className="button button--green "
                        onClick={() => setEditing(true)}
                    >
                        Submit
                    </button>
                )}
                {editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                )}
            </div>

            {!editing && (
                <div className="mt customer-personas">
                    {data.map((item, idx) => (
                        <Link
                            to={`/dashboard/customer-personas/${item.id}`}
                            key={idx}
                            className="text-center customer-persona"
                        >
                            <img
                                src={member4}
                                alt={item.name}
                            />
                            <p className="fw-500">{item.name}</p>
                            <p className="">{item.age} years old</p>
                            <p className="">{item.gender.label}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
