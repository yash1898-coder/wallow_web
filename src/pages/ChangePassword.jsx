import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { resetPassword } from "../api/accounts"
import { ErrorMessage } from "../components/ErrorMessage"
import { usePasswordsValidation } from "../hooks/usePasswordsValidation"
import { useNavigate, useParams } from "react-router-dom"
import { useStore } from "../stores/useStore"
import { Spinner } from "../components/Spinner"

export const ChangePassword = () => {
    const { openToast } = useStore()
    const { uid, token } = useParams()
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password1: "",
        password2: "",
    })

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () =>
            resetPassword({
                new_password1: formData.password1,
                new_password2: formData.password2,
                uid,
                token,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["accounts"])
                navigate("/login")
                openToast({ text: "Password has been reset!" })
            },
        }
    )

    const formRef = useRef(null)

    const {
        passwordsMatch,
        validateInputs,
        makeInputValid,
        errors,
        onPasswordChange,
    } = usePasswordsValidation(formRef)

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        makeInputValid(e)
        onPasswordChange(e)
    }
    const passwordsDontMatch = !passwordsMatch && submitted

    return (
        <div className="auth container signup text-center">
            <h1 className="fw-700 fs-850">Select new password</h1>
            <p className="mt">
                Please select a new password to login to your account.
            </p>
            <div className="auth-form">
                <form
                    ref={formRef}
                    key={""}
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (passwordsMatch) onSubmit()
                    }}
                >
                    <label
                        className="fs-200  label auth-form__submit-button"
                        htmlFor="password1"
                    >
                        Password
                    </label>
                    <input
                        onChange={onChange}
                        value={formData.password1}
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$"
                        name="password1"
                        className={`input auth-form__input ${
                            errors.includes("password1") || passwordsDontMatch
                                ? "invalid"
                                : ""
                        }`}
                        type="password"
                        id="password1"
                        placeholder="Enter password..."
                    />
                    {errors.includes("password1") && (
                        <p className="text-red-700 fs-200 text-left">
                            Password must be at least 8 characters, one
                            uppercase, one lowercase, one special character and
                            one number.
                        </p>
                    )}
                    <label
                        className="fs-200  label auth-form__submit-button"
                        htmlFor="password2"
                    >
                        Repeat Password
                    </label>
                    <input
                        onChange={onChange}
                        value={formData.password2}
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$"
                        name="password2"
                        className={`input auth-form__input ${
                            errors.includes("password2") || passwordsDontMatch
                                ? "invalid"
                                : ""
                        }`}
                        type="password"
                        id="password2"
                        placeholder="Repeat password..."
                    />
                    {errors.includes("password2") && (
                        <p className="text-red-700 fs-200 text-left">
                            Password must be at least 8 characters, one
                            uppercase, one lowercase, one special character and
                            one number.
                        </p>
                    )}
                    {passwordsDontMatch && (
                        <p className="text-red-700 fs-200 text-left">
                            Passwords don't match.
                        </p>
                    )}
                    {error && <ErrorMessage message={error.message} />}
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            setSubmitted(true)
                            validateInputs()
                        }}
                        className="button button--red-light auth-form__submit-button"
                    >
                        {isLoading && <Spinner size="20px" />}
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
