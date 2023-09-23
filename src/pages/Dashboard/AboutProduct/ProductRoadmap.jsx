import { useState } from "react"
import { useEditProductStore } from "../../../stores/useEditProductStore"
import { Select } from "../../../components/Select"
import deleteIcon from "../../../assets/delete.svg"
import pencilIcon from "../../../assets/pencil.svg"

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const yearOptions = [...new Array(10)].map((i, idx) => ({
    label: currentYear + idx,
    value: currentYear + idx,
}))

const qOptions = [
    {
        label: "Q1",
        value: "Q1",
    },
    {
        label: "Q2",
        value: "Q2",
    },
    {
        label: "Q3",
        value: "Q3",
    },
    {
        label: "Q4",
        value: "Q4",
    },
]

export const ProductRoadmap = () => {
    const { editingProduct } = useEditProductStore()

    const [editing, setEditing] = useState(false)

    const data = [
        {
            description: "Lorem ipsum dolor sit. This is description about Q1.",
            q: qOptions[0],
            year: yearOptions[1],
        },
        {
            description: "Lorem ipsum dolor sit. This is description about Q2.",
            q: qOptions[1],
            year: yearOptions[1],
        },
        {
            description: "Lorem ipsum dolor sit. This is description about Q3.",
            q: qOptions[2],
            year: yearOptions[1],
        },
        {
            description: "Lorem ipsum dolor sit. This is description about Q4.",
            q: qOptions[3],
            year: yearOptions[1],
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
                <h1 className="fs-700 fw-600">Product Roadmap</h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Add card
                    </button>
                )}
            </div>
            {editing && (
                <div className="timeline-form flow">
                    <h2 className="fs-600 fw-600">
                        Create a new timeline card
                    </h2>
                    <div className="flex flex-wrap timeline-form__selects">
                        <Select
                            options={yearOptions}
                            currOption={{
                                label: "Select year...",
                                value: "Select year...",
                            }}
                        />
                        <Select
                            options={qOptions}
                            currOption={{
                                label: "Select quarter...",
                                value: "Select quarter...",
                            }}
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        id="description"
                        className="input mt"
                    ></textarea>
                    <div className="flex">
                        <button className="button button--green">
                            Add card
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="button "
                            style={{ marginLeft: "auto" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="timeline">
                {data.reverse().map((item, idx) => (
                    <TimelineItem
                        {...item}
                        key={idx}
                    />
                ))}
            </div>

            {/* {!editingProduct.roadmap ? (
                <>
                    <label
                        className="mt"
                        htmlFor="statement"
                    >
                        Your product doesn't have roadmap yet. Add one now!
                    </label>
                    <textarea
                        required
                        placeholder="Write your statement here..."
                        id="statement"
                        className="input "
                    ></textarea>
                    <button className="button mt">Add</button>
                </>
            ) : !editing ? (
                <p className="mt">{editingProduct.description}</p>
            ) : null} */}

            {/* <div className="flex">
                {editing ? (
                    <button
                        className="button button--green "
                        onClick={() => setEditing(true)}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Edit
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
            </div> */}
        </div>
    )
}

const TimelineItem = ({ year, q, description }) => {
    const [formData, setFormData] = useState({
        description,
        year,
        q,
    })
    const [editing, setEditing] = useState(false)

    return (
        <div className="timeline-item hovered-icon-button-parent">
            <div className="timeline-item__content flow">
                <div className="flex">
                    {!editing ? (
                        <p className=" fs-300">
                            {q.label} | {year.label}
                        </p>
                    ) : (
                        <div className="timeline-item__selects">
                            <Select
                                options={yearOptions}
                                currOption={formData.year}
                            />
                            <Select
                                options={qOptions}
                                currOption={formData.q}
                            />
                        </div>
                    )}
                    {!editing && (
                        <div
                            className="flex timeline-item__buttons"
                            style={{ "--gap": ".25rem", marginLeft: "auto" }}
                        >
                            <button
                                onClick={() => setEditing(true)}
                                className="icon-button"
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
                {editing ? (
                    <textarea
                        value={formData.description}
                        placeholder="Description"
                        id="description"
                        className="input mt"
                    ></textarea>
                ) : (
                    <p>{description}</p>
                )}
                {editing && (
                    <div className="flex ">
                        <button
                            onClick={() => setEditing(false)}
                            className="button button--green"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="button"
                            style={{ marginLeft: "auto" }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
