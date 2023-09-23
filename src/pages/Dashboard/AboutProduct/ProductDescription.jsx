import { useState } from "react"
import { useEditProductStore } from "../../../stores/useEditProductStore"

export const ProductDescription = () => {
    const { editingProduct } = useEditProductStore()

    const [description, setDescription] = useState(editingProduct.description)
    const [editing, setEditing] = useState(false)

    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <h1 className="fs-700 fw-600">Product Description</h1>
            {!editingProduct.description ? (
                <>
                    <label
                        className="mt"
                        htmlFor="statement"
                    >
                        Your product doesn't have a vision yet. Add one now!
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
            ) : null}

            {editing && (
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Write your statement here..."
                    id="statement"
                    className="input mt"
                ></textarea>
            )}
            <div className="flex">
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
            </div>
        </div>
    )
}
