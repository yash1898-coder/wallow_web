import { Pfp } from "./Pfp"

export const FileInput = ({ file, onChange, required = true }) => {
    return (
        <label
            className="file-input"
            htmlFor="img"
        >
            {!file ? (
                <p>
                    <span className="underline">Click to upload</span> or drag
                    and drop
                </p>
            ) : (
                <Pfp img={file} />
            )}
            <input
                name="image"
                onChange={onChange}
                required={required}
                id="img"
                className="file-input__input sr-only"
                type="file"
                accept={"image/png, image/gif, image/jpeg, image/svg+xml"}
            />
        </label>
    )
}
