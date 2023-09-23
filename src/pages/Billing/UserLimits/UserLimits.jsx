import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useInputValidation } from "../../../hooks/useInputValidation"
import { useStore } from "../../../stores/useStore"
import {
    addLeadingZeroToDate,
    allowOnlyNumber,
    formatDateVeryShort,
    pageSpinnerStyle,
} from "../../../utils"
import { useUserRecords } from "../../../hooks/useUserRecords"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"

export const UserLimits = () => {
    const [hardLimit, setHardLimit] = useState(100)
    const [softLimit, setSoftLimit] = useState(96)
    const { openToast } = useStore()
    const hardLimitRef = useRef(null)
    const softLimitRef = useRef(null)

    const { isLoading, error, users, dates } = useUserRecords()

    const {
        invalid: hardLimitInvalid,
        makeValid: makeHardLimitValid,
        checkValidity: checkHardLimitValidity,
    } = useInputValidation(hardLimitRef)

    const {
        invalid: softLimitInvalid,
        makeValid: makeSoftLimitValid,
        checkValidity: checkSoftLimitValidity,
    } = useInputValidation(softLimitRef)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                openToast({ text: "Changes saved!" })
            }}
            className="container billing-overview"
        >
            <h1 className="fs-700 fw-700 mb">User limits</h1>
            <p className="mt">
                Manage your spending by configuring usage limits. Notifications
                emails triggered by reaching these limits will be sent to
                members of your organizations with the <b>Owner</b> role.
            </p>
            <p className="mt">
                There many be a delay in enforcing any limits, and you are
                responsible for any overage incurred. We recommend checking your
                usage tracing dashboard regularly to monitor your spend.
            </p>

            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <div className="flow">
                        <h2 className="fw-700 fs-600 mt">
                            Approved user limit
                        </h2>
                        <p>
                            The maximum user limit Wallow allows for your
                            organization each month.{" "}
                            <Link
                                className="inline link link--blue"
                                to="/billing/user-limits/request-increase"
                            >
                                Request increase
                            </Link>
                        </p>
                        <p>
                            <b>100</b>
                        </p>
                    </div>

                    <div className="flow">
                        <h2 className="fw-700 fs-600 mt">Current users</h2>
                        <p>
                            Your total usage so far in{" "}
                            {formatDateVeryShort(
                                new Date(
                                    addLeadingZeroToDate(
                                        dates[dates.length - 1]
                                    )
                                )
                            )}
                            .{" "}
                            <Link
                                className="inline link link--blue"
                                to="/billing/user-limits/user-records"
                            >
                                View user records
                            </Link>
                        </p>
                        <p>
                            <b>{users[dates.length - 1]}</b>
                        </p>
                    </div>

                    <div className="flow">
                        <label
                            htmlFor="hardLimit"
                            className="fw-700 fs-600 mt"
                        >
                            Hard limit
                        </label>
                        <p>
                            When your organization reaches this user limit
                            threshold each month, subsequent requests will be
                            rejected.
                        </p>
                        <input
                            required
                            value={hardLimit}
                            ref={hardLimitRef}
                            id="hardLimit"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                                setHardLimit(allowOnlyNumber(e.target.value))
                                makeHardLimitValid()
                            }}
                            className={`input ${
                                hardLimitInvalid ? "invalid" : ""
                            }`}
                            type="text"
                            placeholder=" "
                        />
                    </div>

                    <div className="flow">
                        <label
                            htmlFor="softLimit"
                            className="fw-700 fs-600 mt"
                        >
                            Soft limit
                        </label>
                        <p>
                            When your organization reaches this user limit
                            threshold each month, a notification email will be
                            sent.
                        </p>
                        <input
                            required
                            value={softLimit}
                            ref={softLimitRef}
                            id="softLimit"
                            style={{ width: "100px" }}
                            onChange={(e) => {
                                setSoftLimit(allowOnlyNumber(e.target.value))
                                makeSoftLimitValid()
                            }}
                            className={`input ${
                                softLimitInvalid ? "invalid" : ""
                            }`}
                            type="text"
                            placeholder=" "
                        />
                    </div>
                </>
            )}

            <button
                className="button button--green mt"
                onClick={() => {
                    checkHardLimitValidity()
                    checkSoftLimitValidity()
                }}
            >
                Save
            </button>
        </form>
    )
}
