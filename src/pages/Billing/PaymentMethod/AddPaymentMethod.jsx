import { useNavigate } from "react-router-dom"
import { useStore } from "../../../stores/useStore"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { createCard } from "../../../api/billing"
import { PaymentMethodForm } from "../../../components/PaymentMethodForm"

export const AddPaymentMethod = () => {
    const { openToast } = useStore()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        number: "",
        date: "",
        cvv: "",
        name: "",
        country: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postal_code: "",
        state: "",
    })

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation((data) => createCard(data), {
        onSuccess: () => {
            openToast({ text: "Card added!" })
            queryClient.invalidateQueries(["cards"])
            navigate("/billing/payment-methods")
        },
    })

    return (
        <div className="container payment-method">
            <h1 className="fs-700 fw-700 mb">Add payment method</h1>
            <p>
                This card will be charged at the end of each calendar month for
                usage during that month.
            </p>
            <PaymentMethodForm
                onSubmit={onSubmit}
                isLoading={isLoading}
                error={error}
                setFormData={setFormData}
                formData={formData}
            />
        </div>
    )
}
