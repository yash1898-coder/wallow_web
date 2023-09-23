import { useMutation, useQueryClient } from "react-query"
import { Link, useParams } from "react-router-dom"
import { verifyEmail } from "../api/accounts"
import { ErrorMessage } from "../components/ErrorMessage"
import { useEffect } from "react"
import { Spinner } from "../components/Spinner"

export const VerifyEmail = () => {
    const { key } = useParams()
    const queryClient = useQueryClient()
    const {
        error,
        isLoading,
        mutate: onSubmit,
    } = useMutation(() => verifyEmail({ key }), {
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries(["accounts"])
        },
    })

    useEffect(() => {
        onSubmit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container text-center auth verify-email signup">
            {error ? (
                <>
                    <ErrorMessage
                        className="fs-500 fw-500"
                        message={`Error: ${error.message}`}
                    />
                    <Link
                        to={"/dashboard"}
                        className="button mt"
                        style={{ width: "fit-content", marginInline: "auto" }}
                    >
                        Back to dashboard
                    </Link>
                </>
            ) : isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="text-center fw-700 fs-800">
                        Thank you for choosing Wallow
                    </h1>
                    <p className="mt">
                        Your account has been confirmed, you have been added to
                        our Wallow family.
                    </p>
                    <p className="mt verify-email__cta">
                        Proceed to the log in to start
                        <Link
                            className="button"
                            to={"/login"}
                        >
                            Login
                        </Link>
                    </p>
                </>
            )}
        </div>
    )
}
