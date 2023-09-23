import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useInputValidation } from "../hooks/useInputValidation"
import { useMutation, useQueryClient } from "react-query"
import { sendResetPasswordLink } from "../api/accounts"
import { ErrorMessage } from "../components/ErrorMessage"
import { emailRegex } from "../utils"

export const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const queryClient = useQueryClient()

    const { error, mutate: onSendResetLink } = useMutation(
        () => sendResetPasswordLink({ email }),
        {
            onSuccess: () => queryClient.invalidateQueries(["accounts"]),
        }
    )

    const emailRef = useRef(null)
    const {
        invalid: emailInvalid,
        makeValid: makeEmailValid,
        checkValidity: checkEmailValidity,
    } = useInputValidation(emailRef)

    const onEmailChange = (e) => {
        setEmail(e.target.value)
        makeEmailValid()
    }

    return (
        <div className="auth container signup text-center">
            <h1 className="fw-700 fs-850 text-center">Reset Password</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSendResetLink()
                    setSubmitted(true)
                }}
                className="auth-form"
            >
                <div className="flow mt">
                    <div>
                        <label
                            className="fs-200 "
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={onEmailChange}
                            ref={emailRef}
                            pattern={emailRegex}
                            required
                            className={`input auth-form__input ${
                                emailInvalid ? "invalid" : ""
                            }`}
                            type="email"
                            id="email"
                            placeholder="Enter your email address..."
                        />
                    </div>
                    {error && <ErrorMessage message={error.message} />}
                    {submitted ? (
                        <p className=" fs-300">
                            Please check your email for a reset password link.
                        </p>
                    ) : (
                        <button
                            onClick={() => checkEmailValidity()}
                            className="button button--red-light auth-form__submit-button"
                        >
                            Send reset link
                        </button>
                    )}
                    <p className="">
                        Or continue with{" "}
                        <Link
                            to={"/login"}
                            type="button"
                            className=" underline-link fs-300"
                        >
                            email
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
