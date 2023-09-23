import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useFormDataValidation } from "../hooks/useFormDataValidation"
import { useMutation, useQueryClient } from "react-query"
import { checkUser, createAccount, resendEmail } from "../api/accounts"
import { ErrorMessage } from "../components/ErrorMessage"
import { usePasswordsValidation } from "../hooks/usePasswordsValidation"
import { useStore } from "../stores/useStore"
import { Spinner } from "../components/Spinner"
import { emailRegex } from "../utils"

export const Signup = () => {
    const { openToast } = useStore()

    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/dashboard" } }

    const [checkUserError, setCheckUserError] = useState({
        show: false,
        message: "User with this email already exists.",
    })
    const [currStepIdx, setCurrStepIdx] = useState(0)
    const [timerStarted, setTimerStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password1: "",
        password2: "",
        first_name: "",
        last_name: "",
        // organization: ''
    })

    useEffect(() => {
        let interval
        if (timerStarted) {
            interval = setInterval(() => {
                if (timeLeft === 1) {
                    setTimerStarted(false)
                } else {
                    setTimeLeft((prev) => prev - 1)
                }
            }, 1000)
        }

        return () => clearTimeout(interval)
    }, [timerStarted, timeLeft])

    const queryClient = useQueryClient()
    const { isLoading: isCheckUserLoading, mutate: onCheckUser } = useMutation(
        () => checkUser({ email: formData.email }),
        {
            onSuccess: (res) => {
                if (!res.user_exists) {
                    setCheckUserError((prev) => ({ ...prev, show: false }))
                    setCurrStepIdx(1)
                    queryClient.invalidateQueries(["accounts"])
                } else {
                    setCheckUserError((prev) => ({ ...prev, show: true }))
                }
            },
        }
    )

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => createAccount(formData), {
        onSuccess: () => {
            setCurrStepIdx(3)
            queryClient.invalidateQueries(["accounts"])
        },
    })

    const { resendEmailError, mutate: onResendEmail } = useMutation(
        () => resendEmail({ email: formData.email }),
        {
            onSuccess: () => {
                openToast({ text: "Email has been sent!" })
                queryClient.invalidateQueries(["accounts"])
            },
        }
    )

    const formRef = useRef(null)

    const { validateInputs, makeInputValid, errors } =
        useFormDataValidation(formRef)

    const {
        passwordsMatch,
        validateInputs: validatePasswords,
        onPasswordChange,
    } = usePasswordsValidation(formRef)

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        onPasswordChange(e)
        makeInputValid(e)
    }

    const passwordsDontMatch = !passwordsMatch && submitted

    const steps = [
        <form
            ref={formRef}
            key={""}
            onSubmit={(e) => {
                e.preventDefault()
                onCheckUser()
            }}
        >
            <label
                className="fs-200  label"
                htmlFor="email"
            >
                Work email
            </label>
            <div className="flow">
                <input
                    value={formData.email}
                    onChange={onChange}
                    pattern={emailRegex}
                    required
                    name="email"
                    className={`input auth-form__input ${
                        errors.includes("email") ? "invalid" : ""
                    }`}
                    type="email"
                    id="email"
                    placeholder="Enter your email address..."
                />
                {checkUserError.show && (
                    <ErrorMessage message={checkUserError.message} />
                )}
                <button
                    onClick={() => {
                        validateInputs()
                    }}
                    disabled={isCheckUserLoading}
                    className="button button--red-light auth-form__submit-button"
                >
                    {isCheckUserLoading && <Spinner size="20px" />}
                    Continue
                </button>
            </div>
        </form>,
        <form
            ref={formRef}
            key={""}
            onSubmit={(e) => {
                e.preventDefault()
                setCurrStepIdx(2)
            }}
        >
            <label
                className="fs-200  label "
                htmlFor="first_name"
            >
                First name
            </label>
            <input
                minLength={3}
                value={formData.first_name}
                onChange={onChange}
                required
                className={`input auth-form__input ${
                    errors.includes("first_name") ? "invalid" : ""
                }`}
                name="first_name"
                type="text"
                id="firstName"
                placeholder="Your first name"
            />

            <label
                className="fs-200  label "
                htmlFor="last_name"
            >
                Last name
            </label>
            <input
                minLength={3}
                value={formData.last_name}
                name="last_name"
                onChange={onChange}
                required
                className={`input auth-form__input ${
                    errors.includes("last_name") ? "invalid" : ""
                }`}
                type="text"
                id="last_name"
                placeholder="Your last name"
            />

            {!from.pathname.includes("join") && (
                <>
                    <label
                        className="fs-200  label "
                        htmlFor="organization"
                    >
                        Organization
                    </label>
                    <input
                        minLength={3}
                        value={formData.organization}
                        onChange={onChange}
                        className={`input auth-form__input ${
                            errors.includes("organization") ? "invalid" : ""
                        }`}
                        type="text"
                        id="organization"
                        name="organization"
                        placeholder="Your organization name"
                    />
                </>
            )}
            <button
                onClick={() => {
                    validateInputs()
                }}
                className="button button--red-light auth-form__submit-button"
            >
                Continue
            </button>
        </form>,
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
                htmlFor="email"
            >
                Work email
            </label>
            <input
                value={formData.email}
                onChange={onChange}
                pattern={emailRegex}
                required
                name="email"
                className={`input auth-form__input ${
                    errors.includes("email") ? "invalid" : ""
                }`}
                type="email"
                id="email"
                placeholder="Enter your email address..."
            />
            <label
                className="fs-200  label auth-form__submit-button"
                htmlFor="password1"
            >
                Password
            </label>
            <input
                onChange={onChange}
                autoComplete="new-password"
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
                    Password must be at least 8 characters, one uppercase, one
                    lowercase, one special character and one number.
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
                    Password must be at least 8 characters, one uppercase, one
                    lowercase, one special character and one number.
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
                    validateInputs()
                    validatePasswords()
                    setSubmitted(true)
                }}
                className="button button--red-light auth-form__submit-button"
            >
                {isLoading && <Spinner size="20px" />}
                Continue
            </button>
        </form>,
        <>
            <p className=" fs-400 ">
                We sent an email to {formData.email} <br /> Click the link
                inside to get started
            </p>
        </>,
    ]

    return (
        <div className="auth container signup text-center">
            <h1 className="fw-700 fs-850">Sign up</h1>
            <div
                className="auth-form"
                style={{ maxWidth: currStepIdx === 3 ? 500 : "" }}
            >
                {steps[currStepIdx]}
                {currStepIdx === 3 ? (
                    <div>
                        <p className="mt">
                            Didn&apos;t get the message?{" "}
                            {resendEmailError && (
                                <ErrorMessage
                                    message={resendEmailError.message}
                                />
                            )}
                            <button
                                disabled={timerStarted}
                                onClick={() => {
                                    setTimerStarted(true)
                                    setTimeLeft(30)
                                    onResendEmail()
                                }}
                                className=" underline-link fs-300"
                            >
                                Resend email
                            </button>{" "}
                            {timerStarted && `(wait ${timeLeft} seconds)`}
                        </p>
                    </div>
                ) : (
                    <p className=" mt">
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className=" underline-link fs-300"
                        >
                            Log in
                        </Link>
                    </p>
                )}
            </div>
            <p className=" fs-200 auth__legal">
                By clicking “Continue with email” above, you acknowledge that
                you have read and understood, and agree to Wallow&apos;s{" "}
                <Link
                    className="underline-link"
                    to="/"
                >
                    Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                    className="underline-link"
                    to={"/"}
                >
                    Privacy Policy.
                </Link>
            </p>
        </div>
    )
}
