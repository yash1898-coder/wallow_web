import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useInputValidation } from "../hooks/useInputValidation"
import { useMutation, useQueryClient } from "react-query"
import { login } from "../api/accounts"
import { ErrorMessage } from "../components/ErrorMessage"
import { useAuthStore } from "../stores/useAuthStore"
import { Spinner } from "../components/Spinner"
import { emailRegex } from "../utils"

export const Login = () => {
    const { setUser, setToken } = useAuthStore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    // const location = useLocation()
    // const { from } = location.state || { from: { pathname: "/dashboard" } }

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => login({ email, password }), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["accounts"])
            navigate("/dashboard")
            setToken(res.key)
            if (res.user.role === null) {
                setUser({
                    ...res.user,
                    role: "Member",
                    is_active: true,
                    isCancelled: res.is_cancelled,
                })
            } else {
                setUser({
                    ...res.user,
                    is_active: true,
                    isCancelled: res.is_cancelled,
                })
            }
        },
    })

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const {
        invalid: emailInvalid,
        makeValid: makeEmailValid,
        checkValidity: checkEmailValidity,
    } = useInputValidation(emailRef)
    const {
        invalid: passwordInvalid,
        makeValid: makePasswordValid,
        checkValidity: checkPasswordValidity,
    } = useInputValidation(passwordRef)

    const onEmailChange = (e) => {
        setEmail(e.target.value)
        makeEmailValid()
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        makePasswordValid()
    }

    return (
        <div className="auth container signup text-center">
            <h1 className="fw-700 fs-850 text-center">Log in</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="auth-form"
            >
                <label
                    className="fs-200 "
                    htmlFor="email"
                >
                    Email
                </label>
                <div className="flow">
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
                    <div>
                        <label
                            className="fs-200 "
                            htmlFor="code"
                        >
                            Password
                        </label>
                        <input
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$"
                            ref={passwordRef}
                            onChange={onPasswordChange}
                            value={password}
                            required
                            className={`input auth-form__input ${
                                passwordInvalid ? "invalid" : ""
                            }`}
                            type="password"
                            id="password"
                            placeholder="Enter password..."
                        />
                        {passwordInvalid && (
                            <p className="text-red-700 fs-200 text-left">
                                Password must be at least 8 characters, one
                                uppercase, one lowercase, one special character
                                and one number.
                            </p>
                        )}
                    </div>
                    {error && <ErrorMessage message={error.message} />}
                    <button
                        onClick={() => {
                            checkEmailValidity()
                            checkPasswordValidity()
                        }}
                        disabled={isLoading}
                        className="button button--red-light auth-form__submit-button"
                    >
                        {isLoading && <Spinner size="20px" />}
                        Login
                    </button>

                    <Link
                        to={"/reset-password"}
                        className=" underline-link fs-300 text-center mt inline-block"
                    >
                        Forgot password?
                    </Link>

                    <p className="  fs-300 text-center mt">
                        Don't have an account yet?{" "}
                        <Link
                            className="underline-link"
                            to={"/signup"}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
            <p className=" fs-200 auth__legal">
                By clicking “Continue with email” above, you acknowledge that
                you have read and understood, and agree to Wallow&apos;s{" "}
                <Link
                    className="underline-link"
                    to="/terms"
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
