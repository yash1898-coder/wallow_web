export const ValueProposition = () => {
    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <h1 className="fs-700 fw-600">Value Proposition</h1>
            <label
                className="mt"
                htmlFor="statement"
            >
                Your product doesn't have a value proposition yet. Add one now!
            </label>
            <textarea
                required
                placeholder="Write your statement here..."
                id="statement"
                className="input "
            ></textarea>
            <button className="button mt">Add</button>
        </div>
    )
}
