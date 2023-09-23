import { useEffect, useRef, useState } from "react"
import { useFormDataValidation } from "../../hooks/useFormDataValidation"
import { allowOnlyNumber, emailRegex, pageSpinnerStyle } from "../../utils"
import { useStore } from "../../stores/useStore"
import { AddressForm } from "../../components/AddressForm"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getPreference, updatePreference } from "../../api/billing"
import { Spinner } from "../../components/Spinner"
import { ErrorMessage } from "../../components/ErrorMessage"

export const Preferences = () => {
    const { openToast } = useStore()
    const [formData, setFormData] = useState({
        company_name: "",
        purchase_order_number: "",
        billing_email: "",
        country: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postal_code: "",
        state: "",
    })

    const queryClient = useQueryClient()
    const formRef = useRef()

    const { isLoading, error, data } = useQuery(
        ["preference"],
        () => getPreference(),
        {
            retry: false,
        }
    )

    useEffect(() => {
        if (data) {
            const convertedNullToStringData = Object.fromEntries(
                Object.entries(data)?.map((item) => [
                    item[0],
                    item[1] === null ? "" : item[1],
                ])
            )
            setFormData(convertedNullToStringData)
        }
    }, [data])

    const {
        isLoading: updateLoading,
        error: updateError,
        mutate: onSubmit,
    } = useMutation(() => updatePreference(formData), {
        onSuccess: () => {
            openToast({ text: "Details updated!" })
            queryClient.invalidateQueries(["preference"])
        },
    })

    const { validateInputs, makeInputValid, errors } =
        useFormDataValidation(formRef)

    const onChange = (e) => {
        const { name, value } = e.target
        makeInputValid(e)
        if (name === "purchaseOrderNumber") {
            setFormData((prev) => ({ ...prev, [name]: allowOnlyNumber(value) }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    return (
        <div className="container billing-overview">
            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <form
                    style={{ maxWidth: "600px" }}
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                >
                    <h1 className="fs-700 fw-700 mb">Billing Preferences</h1>
                    <p className="mt">
                        Changes to these preferences will apply to future
                        invoices only. If you need a past invoice reissued,
                        please contact ar@openai.com.
                    </p>
                    <label
                        htmlFor="email"
                        className="mt fw-500"
                    >
                        Organization name
                    </label>
                    <input
                        required
                        onChange={onChange}
                        value={formData.company_name}
                        type="text"
                        className={`input ${
                            errors.includes("company_name") ? "invalid" : ""
                        }`}
                        id="company_name"
                        name="company_name"
                        placeholder="Organization name"
                    />
                    <div
                        className="flow"
                        data-spacing="small"
                    >
                        <label
                            htmlFor="purchase_order_number"
                            className="mt fw-500"
                        >
                            Purchase order (PO) number
                        </label>
                        <p>
                            Your PO number will be displayed on future invoices.
                        </p>
                        <input
                            onChange={onChange}
                            value={formData.purchase_order_number}
                            type="text"
                            className={`input `}
                            id="purchase_order_number"
                            name="purchase_order_number"
                            placeholder=" "
                        />
                    </div>
                    <div
                        className="flow"
                        data-spacing="small"
                    >
                        <label
                            htmlFor="billing_email"
                            className="mt fw-500"
                        >
                            Billing email
                        </label>
                        <p>
                            Invoices and other billing notifications will be
                            sent here (in addition to beings sent to the owners
                            of your organization).
                        </p>
                        <input
                            onChange={onChange}
                            pattern={emailRegex}
                            value={formData.billing_email}
                            required
                            type="email"
                            className={`input ${
                                errors.includes("billing_email")
                                    ? "invalid"
                                    : ""
                            }`}
                            id="billing_email"
                            name="billing_email"
                            placeholder=" "
                        />
                    </div>
                    <div className="flow">
                        <div
                            className="flow"
                            data-spacing="small"
                        >
                            <label
                                htmlFor="amount"
                                className="mt fw-500"
                            >
                                Primary business address
                            </label>
                            <p>
                                This is the physical address of the company
                                purchasing Wallow services and is used to
                                calculate any applicable sales taxes.
                            </p>
                        </div>
                        <AddressForm
                            onChange={onChange}
                            formData={formData}
                            errors={errors}
                        />
                    </div>
                    <div className="flex-group">
                        <button
                            disabled={updateLoading}
                            onClick={() => validateInputs()}
                            className="button button--green mt"
                        >
                            {updateLoading && <Spinner />}
                            Save
                        </button>
                        {updateError && (
                            <ErrorMessage message={updateError.message} />
                        )}
                    </div>
                </form>
            )}
        </div>
    )
}
