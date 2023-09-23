export const ErrorMessage = ({ message, className = "" }) => {
    return (
        <p className={`text-red-700 fs-200 text-left ${className}`}>
            {message}
        </p>
    )
}
