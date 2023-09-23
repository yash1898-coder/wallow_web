import { Link } from "react-router-dom"
import { useStore } from "../../stores/useStore"
import { cancelOrganization } from "../../api/accounts"
import { useRef } from "react"
import { useMutation } from "react-query"
import { useErrorToast } from "../../hooks/useErrorToast"
import { Spinner } from "../../components/Spinner"

export const CancelAccount = () => {
    const { openToast } = useStore()
    const textareaRef = useRef(null)

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () => cancelOrganization({ reason: textareaRef.current.value }),
        {
            onSuccess: () => {
                openToast({ text: "Account has been cancelled!" })
            },
        }
    )

    useErrorToast(error)

    return (
        <div className="container billing-overview">
            <h1 className="fs-700 fw-700 mb">Cancel Account</h1>
            <p className="fs-600 mt fw-700 mb">
                We're genuinely sorry to see you leave.
            </p>
            <p className="mt">
                You'll be billed at the end of each calendar month for usage
                during that month.
            </p>
            <h3>
                Closing your Wallow account will result in the following
                effects:
            </h3>
            <ul
                className="list mt flow"
                data-spacing="small"
            >
                <li>Deactivation of all accounts within your organization.</li>
                <li> Purging of data associated with your account.</li>
                <li>
                    It's important to note that you can reactivate your account
                    in the future, enabling continued access for sharing work
                    progress, blockers, and impediments.
                </li>
                <li>
                    Please be aware that any outstanding dues for prior Wallow
                    usage remain your responsibility.
                </li>
            </ul>
            <p className="mt mb">
                Could you kindly share your reason for choosing to close your
                Wallow account?
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
            >
                <textarea
                    required
                    ref={textareaRef}
                    className="input"
                    placeholder="Describe it here..."
                ></textarea>
                <div className="flex mt">
                    <Link
                        to={"/billing/overview"}
                        className="button"
                    >
                        Go back
                    </Link>
                    <button
                        disabled={isLoading}
                        className="button button--red "
                    >
                        {isLoading && <Spinner />}
                        Cancel account
                    </button>
                </div>{" "}
            </form>
        </div>
    )
}
