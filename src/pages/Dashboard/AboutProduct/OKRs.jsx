import { useState } from "react"
import deleteIcon from "../../../assets/delete.svg"
import pencilIcon from "../../../assets/pencil.svg"
import { useEditProductStore } from "../../../stores/useEditProductStore"

export const OKRs = () => {
    const { editingProduct } = useEditProductStore()
    const [formData, setFormData] = useState({
        objective: "",
        keyResults: [
            {
                body: "",
                idx: 0,
            },
        ],
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const onAddKeyResult = () => {
        const newKeyResult = {
            body: "",
            idx: formData.keyResults.at(-1).idx + 1,
        }

        setFormData((prev) => ({
            ...prev,
            keyResults: [...formData.keyResults, newKeyResult],
        }))
    }

    const onDeleteKeyResult = (idx) => {
        console.log(formData)
        setFormData((prev) => ({
            ...prev,
            keyResults: prev.keyResults.filter((item) => item.idx !== idx),
        }))
    }

    const onKeyResultChange = (e, idx) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            keyResults: prev.items.map((item) =>
                item.idx === idx
                    ? {
                          ...item,
                          [name]: type === "number" ? +value : value,
                      }
                    : item
            ),
        }))
    }

    const [editing, setEditing] = useState(false)

    const data = [
        {
            objective: "Find product market fit for Scorpio",
            results: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ],
        },
        {
            objective: "Find product market fit for Scorpio",
            results: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ],
        },
        {
            objective: "Find product market fit for Scorpio",
            results: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ],
        },
        {
            objective: "Find product market fit for Scorpio",
            results: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ],
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
                <h1 className="fs-700 fw-600">
                    OKRs for {editingProduct.name}
                </h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Add OKR
                    </button>
                )}
            </div>
            {editing && (
                <div>
                    <label
                        htmlFor="statement "
                        className="mt"
                    >
                        Objective
                    </label>
                    <input
                        onChange={onChange}
                        value={formData.objective}
                        required
                        name="objective"
                        id="objective"
                        type="text"
                        className="input"
                        placeholder="Write an objective for your OKR here..."
                    />
                    <label
                        htmlFor="statement "
                        className="mt"
                        style={{ "--margin": "1rem" }}
                    >
                        Key results
                    </label>
                    {formData.keyResults.map((r, idx) => (
                        <div
                            key={idx}
                            className="flex mt"
                            style={{ "--margin": ".75rem" }}
                        >
                            <input
                                onChange={(e) => onKeyResultChange(e, idx)}
                                value={r.body}
                                required
                                id="objective"
                                type="text"
                                className="input "
                                placeholder="Write a key result for your OKR here..."
                            />
                            {idx > 0 && (
                                <button
                                    onClick={() => onDeleteKeyResult(r.idx)}
                                    className="icon-button"
                                >
                                    <img
                                        src={deleteIcon}
                                        alt="delete"
                                    />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        className="button mt"
                        onClick={onAddKeyResult}
                    >
                        Add more
                    </button>
                </div>
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

            <div className="mt">
                {data.map((item, idx) => (
                    <div
                        key={idx}
                        className="flow hovered-icon-button-parent"
                        data-spacing="small"
                        style={{
                            borderBottom: "1px solid var(--clr-neutral-500)",
                            paddingBlock: "1rem",
                        }}
                    >
                        <div className="flex justify-between">
                            <p>
                                <b>Objective:</b> {item.objective}
                            </p>
                            <div
                                className="flex"
                                style={{ "--gap": ".25rem" }}
                            >
                                <button className="icon-button">
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
                        </div>
                        <ul
                            className="flow list"
                            data-spacing="small"
                        >
                            {item.results.map((r, idx) => (
                                <li key={idx}>
                                    <b>Key result {idx + 1}: </b>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
