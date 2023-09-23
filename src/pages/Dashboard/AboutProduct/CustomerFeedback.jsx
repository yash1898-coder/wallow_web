import { useRef, useState } from "react"
import {
    formatDate,
    getAverage,
    getChartVisualIndicators,
} from "../../../utils"
import deleteIcon from "../../../assets/delete.svg"
import pencilIcon from "../../../assets/pencil.svg"
import { ProgressChart } from "../../../components/Charts/ProgressChart"
import { useDailyProgress } from "../../../hooks/useDailyProgress"
import { Spinner } from "../../../components/Spinner"
import ToggleChartButton from "../../../components/ToggleChartButton"

export const CustomerFeedback = () => {
    const ref = useRef(null)

    const {
        isLoading,
        isFetching,
        onTabChange,
        currTab,
        tabs,
        chartVisible,
        setChartVisible,
    } = useDailyProgress(ref)
    const [newsDescription, setNewsDescription] = useState("")
    const [editing, setEditing] = useState(false)

    const data = [
        {
            date: new Date(),
            name: "Vasyl Polishchuk",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
            company: "Wallow Inc.",
        },
        {
            date: new Date(),
            name: "Vasyl Polishchuk",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
        },
        {
            date: new Date(),
            name: "Vasyl Polishchuk",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
            company: "Wallow Inc.",
        },
        {
            date: new Date(),
            name: "Vasyl Polishchuk",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
        },
    ]

    return (
        <div
            className=" flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <div
                className="container flex justify-between"
                style={{ minHeight: "40px", alignItems: "flex-start" }}
            >
                <h1 className="fs-700 fw-600">Customer Feedback</h1>
                {!editing && (
                    <div className="flex">
                        <button
                            className="button "
                            onClick={() => setEditing(true)}
                        >
                            Share feedback
                        </button>
                        <ToggleChartButton
                            color={
                                getChartVisualIndicators(
                                    getAverage(currTab?.data)
                                ).color.item
                            }
                            setChartVisible={setChartVisible}
                            chartVisible={chartVisible}
                        />
                    </div>
                )}
            </div>
            {editing && (
                <div className="container">
                    <label
                        htmlFor="name "
                        className="mt"
                    >
                        Customer name
                    </label>
                    <input
                        required
                        id="name"
                        type="text"
                        className="input"
                        placeholder="Write your customer's name here..."
                    />
                    <label
                        htmlFor="description "
                        className="mt"
                        style={{ "--margin": "1rem" }}
                    >
                        Description
                    </label>
                    <textarea
                        required
                        onChange={(e) => setNewsDescription(e.target.value)}
                        value={newsDescription}
                        placeholder="Write your description here..."
                        id="description"
                        className="input "
                    ></textarea>
                    <label
                        htmlFor="company"
                        style={{ "--margin": "1rem" }}
                        className="mt"
                    >
                        Company (optional)
                    </label>
                    <input
                        required
                        id="company"
                        type="text"
                        className="input"
                        placeholder="Write the customer's company name here..."
                    />
                </div>
            )}
            {editing && (
                <div className="container flex">
                    <button
                        className="button button--blue "
                        onClick={() => setEditing(true)}
                    >
                        Share
                    </button>
                    <button
                        className="button "
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
            {chartVisible && (
                <div
                    style={{
                        minHeight: 700,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {isFetching || isLoading ? (
                        <Spinner style={{ marginTop: "8rem" }} />
                    ) : (
                        <ProgressChart
                            ref={ref}
                            currTab={currTab}
                            tabs={tabs}
                            onTabChange={onTabChange}
                        />
                    )}
                </div>
            )}

            <div className="container mt">
                {data.map((item, idx) => (
                    <Feedback
                        item={item}
                        key={idx}
                    />
                ))}
            </div>
        </div>
    )
}

const Feedback = ({ item }) => {
    const [formData, setFormData] = useState({
        description: item.description,
        name: item.name,
        company: item.company,
    })

    const [editing, setEditing] = useState(false)
    const onChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div
            className="flow hovered-icon-button-parent "
            data-spacing="small"
            style={{
                borderBottom: "1px solid var(--clr-neutral-500)",
                paddingBlock: "1rem",
            }}
        >
            <div className="flex justify-between ">
                {editing ? (
                    <input
                        required
                        id="name"
                        value={formData.name}
                        onChange={onChange}
                        type="text"
                        className="input"
                        placeholder="Write your customer's name here..."
                    />
                ) : (
                    <h2 className="fs-600 fw-600">{item.name}</h2>
                )}

                {!editing && (
                    <div
                        className="flex"
                        style={{ "--gap": ".25rem" }}
                    >
                        <button
                            className="icon-button"
                            onClick={() => setEditing(true)}
                        >
                            <img
                                src={pencilIcon}
                                alt="edit"
                            />
                        </button>
                        <button className="icon-button">
                            <img
                                src={deleteIcon}
                                alt="delete"
                            />
                        </button>
                    </div>
                )}
            </div>
            <p className="flex ">
                {!editing && formatDate(item.date)}
                {item.company && (
                    <>
                        {editing ? (
                            <input
                                required
                                id="company"
                                value={formData.company}
                                onChange={onChange}
                                type="text"
                                className="input"
                                placeholder="Write the customer's company's name here..."
                            />
                        ) : (
                            `, ${item.company}`
                        )}
                    </>
                )}
            </p>
            {editing ? (
                <textarea
                    onChange={onChange}
                    value={formData.description}
                    placeholder="Write your description here..."
                    id="statement"
                    className="input mt"
                ></textarea>
            ) : (
                <p>{item.description}</p>
            )}
            {editing && (
                <div className="flex">
                    <button
                        className="button button--green"
                        onClick={() => {
                            setEditing(false)
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="button"
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}
