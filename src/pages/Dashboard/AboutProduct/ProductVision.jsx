export const ProductVision = () => {
    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <h1 className="fs-700 fw-600">Product Vision </h1>
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
        </div>
    )
}
