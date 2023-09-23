import { useState } from "react"
import { formatDate } from "../../../utils"
import deleteIcon from "../../../assets/delete.svg"

export const ProductNews = () => {
    const [newsDescription, setNewsDescription] = useState("")
    const [editing, setEditing] = useState(false)

    const data = [
        {
            date: new Date(),
            header: "We made a change to the dashboard",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
        },
        {
            date: new Date(),
            header: "We made a change to the dashboard",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
        },
        {
            date: new Date(),
            header: "We made a change to the dashboard",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
        },
        {
            date: new Date(),
            header: "We made a change to the dashboard",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur eveniet nam delectus ab magnam cum modi consectetur ipsa beatae?",
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
                <h1 className="fs-700 fw-600">Product News</h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Share news
                    </button>
                )}
            </div>
            {editing && (
                <div>
                    <label
                        htmlFor="header"
                        className="mt"
                    >
                        Header
                    </label>
                    <input
                        required
                        id="header"
                        type="text"
                        className="input"
                        placeholder="Write a header for your news here..."
                    />
                    <label
                        htmlFor="description"
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
                </div>
            )}
            <div className="flex">
                {editing && (
                    <button
                        className="button button--blue "
                        onClick={() => setEditing(true)}
                    >
                        Share
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
                        className="flow hovered-icon-button-parent "
                        data-spacing="small"
                        style={{
                            borderBottom: "1px solid var(--clr-neutral-500)",
                            paddingBlock: "1rem",
                        }}
                    >
                        <div className="flex justify-between ">
                            <h2 className="fs-600 fw-600">{item.header}</h2>
                            <button className="icon-button">
                                <img
                                    src={deleteIcon}
                                    alt="delete"
                                />
                            </button>
                        </div>
                        <p className="">{formatDate(item.date)}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
