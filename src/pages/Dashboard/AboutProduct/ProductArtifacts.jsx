import { useState } from "react"
import deleteIcon from "../../../assets/delete.svg"
import { FileButton } from "../../../components/FileButton"
import { FileInput } from "../../../components/FileInput"

export const ProductArtifacts = () => {
    const [editing, setEditing] = useState(false)

    const data = [
        {
            name: "Design files",
        },
        {
            name: "Other files",
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
                <h1 className="fs-700 fw-600">Product Artifacts</h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Add section
                    </button>
                )}
            </div>
            {editing && (
                <div>
                    <label
                        htmlFor="name"
                        className="mt"
                    >
                        Artifacts name
                    </label>
                    <input
                        required
                        id="name"
                        type="text"
                        className="input"
                        placeholder="Name your section here..."
                    />
                </div>
            )}
            <div className="flex">
                {editing && (
                    <button
                        className="button button--blue "
                        onClick={() => setEditing(true)}
                    >
                        Create
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
                    <Item
                        item={item}
                        key={idx}
                    />
                ))}
            </div>
        </div>
    )
}

const Item = ({ item }) => {
    const [editing, setEditing] = useState(false)

    return (
        <>
            <div
                className="flow hovered-icon-button-parent "
                data-spacing="small"
                style={{
                    borderBottom: "1px solid var(--clr-neutral-500)",
                    paddingBlock: "1rem",
                }}
            >
                <div className="flex justify-between ">
                    <div
                        className="flex"
                        style={{ minHeight: 37 }}
                    >
                        <h2 className="fs-600 fw-600">{item.name}</h2>
                    </div>

                    {!editing && (
                        <button className="icon-button">
                            <img
                                src={deleteIcon}
                                alt="delete"
                            />
                        </button>
                    )}
                </div>
                {editing && (
                    <div className="flow">
                        <div>
                            <label
                                htmlFor="name"
                                className="mt"
                                style={{ "--margin": "1rem" }}
                            >
                                Artifacts name
                            </label>
                            <input
                                required
                                id="name"
                                type="text"
                                className="input "
                                placeholder="Name your section here..."
                            />
                        </div>
                        <FileInput />
                        <div>
                            <p className="or-divider">OR</p>
                            <label
                                htmlFor="name"
                                style={{ "--margin": "1rem" }}
                            >
                                URL
                            </label>
                            <input
                                required
                                id="name"
                                type="text"
                                className="input "
                                placeholder="A URL to your file..."
                            />
                        </div>
                        <div className="flex">
                            <button
                                className="button button--blue "
                                onClick={() => {
                                    setEditing(false)
                                }}
                            >
                                Submit
                            </button>
                            <button
                                className="button "
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {!editing && (
                <button
                    style={{ marginTop: "1rem" }}
                    className="link dark button-reset"
                    onClick={() => setEditing(true)}
                >
                    Add files
                </button>
            )}
        </>
    )
}
