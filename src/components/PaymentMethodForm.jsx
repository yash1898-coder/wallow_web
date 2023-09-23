import { useRef, useState } from "react"
import { AddressForm } from "./AddressForm"
import { ErrorMessage } from "./ErrorMessage"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Spinner } from "./Spinner"
import { useFormDataValidation } from "../hooks/useFormDataValidation"
import { allowOnlyNumber, getLastFourDigits } from "../utils"
import { useMutation, useQueryClient } from "react-query"
import { deleteCard } from "../api/billing"
import { useStore } from "../stores/useStore"

function cc_format(value) {
    // fn by: https://codepen.io/al3ka/pen/PoOejJY?editors=1010
    const v = value
        .replace(/\s+/g, "")
        .replace(/[^0-9]/gi, "")
        .substr(0, 16)
    const parts = []

    for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substr(i, 4))
    }

    return parts.length > 1 ? parts.join(" ") : value
}

export const PaymentMethodForm = ({
    formData,
    setFormData,
    onSubmit,
    id = "",
    error,
    isLoading,
}) => {
    const [key, setKey] = useState("")

    const formRef = useRef()

    const { openToast } = useStore()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { pathname } = useLocation()

    const { validateInputs, makeInputValid, errors } =
        useFormDataValidation(formRef)

    const onChange = (e) => {
        const { name, value } = e.target
        makeInputValid(e)

        if (name === "date") {
            if (value.length === 2 && key !== "Backspace") {
                setFormData((prev) => ({ ...prev, [name]: `${value}/` }))
            } else if (value.length === 2 && key === "Backspace") {
                setFormData((prev) => ({ ...prev, [name]: value.charAt(0) }))
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }))
            }
            return
        }

        if (name === "number" || name === "cvv") {
            setFormData((prev) => ({ ...prev, [name]: allowOnlyNumber(value) }))
            return
        }

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const {
        isLoading: deleteLoading,
        error: deleteError,
        mutate: onDelete,
    } = useMutation((data) => deleteCard(data), {
        onSuccess: () => {
            openToast({ text: "Card deleted!" })
            queryClient.invalidateQueries(["cards"])
            queryClient.invalidateQueries(["cards", id])
            navigate("/billing/payment-methods")
        },
    })

    return (
        <form
            ref={formRef}
            className="payment-method-form mt"
            onSubmit={(e) => {
                e.preventDefault()
                const expiry_month = formData.date.split("/")[0]
                const expiry_year = formData.date.split("/")[1]

                if (!id) {
                    onSubmit({ ...formData, expiry_month, expiry_year })
                }
            }}
        >
            <label htmlFor="cardInformation">Card information</label>
            <div className="payment-method-form__card-information">
                <input
                    disabled={id}
                    onChange={onChange}
                    value={
                        id
                            ? `**** **** **** ${getLastFourDigits(
                                  formData.number
                              )}`
                            : cc_format(formData.number)
                    }
                    required
                    type="text"
                    className={`input ${
                        errors.includes("number") ? "invalid" : ""
                    }`}
                    id="cardInformation"
                    name="number"
                    placeholder="Card number"
                />
                <input
                    disabled={id}
                    onChange={onChange}
                    value={formData.date}
                    required
                    type="text"
                    onKeyDown={(e) => setKey(e.key)}
                    className={`input ${
                        errors.includes("date") ? "invalid" : ""
                    } `}
                    maxLength={5}
                    minLength={5}
                    id="date"
                    name="date"
                    placeholder="MM/YY"
                />
                <input
                    disabled={id}
                    onChange={onChange}
                    value={formData.cvv}
                    required
                    type="text"
                    className={`input ${
                        errors.includes("cvv") ? "invalid" : ""
                    } `}
                    maxLength={3}
                    minLength={3}
                    id="cvv"
                    name="cvv"
                    placeholder="CVV"
                />
            </div>
            <label htmlFor="name">Name on the card</label>
            <input
                disabled={id}
                onChange={onChange}
                value={formData.name}
                required
                type="text"
                className={`input ${errors.includes("name") ? "invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Your name"
            />

            <label htmlFor="country">Billing address</label>
            <div className="flow">
                <AddressForm
                    disabled={id}
                    onChange={onChange}
                    formData={formData}
                    errors={errors}
                />
            </div>
            <div
                className="mt flex"
                style={{ justifyContent: "flex-end" }}
            >
                {error && <ErrorMessage message={error.message} />}
                {deleteError && <ErrorMessage message={deleteError.message} />}
                <Link
                    to={"/billing/payment-methods"}
                    type="button"
                    className="button button--inverted "
                >
                    {pathname.includes("add") ? "Cancel" : "Back"}
                </Link>
                {pathname.includes("add") ? (
                    <button
                        disabled={isLoading}
                        onClick={validateInputs}
                        className="button button--green"
                    >
                        {isLoading && <Spinner />}
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => onDelete(id)}
                        disabled={deleteLoading}
                        className="button button--red"
                    >
                        {deleteLoading && <Spinner />}
                        Delete
                    </button>
                )}
            </div>
        </form>
    )
}
