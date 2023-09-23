import { useNavigate, useParams } from "react-router-dom"
import { PaymentMethodForm } from "../../../components/PaymentMethodForm"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getCard, updateCard } from "../../../api/billing"
import { useStore } from "../../../stores/useStore"
import { useEffect, useState } from "react"
import { Spinner } from "../../../components/Spinner"
import { pageSpinnerStyle } from "../../../utils"
import { ErrorMessage } from "../../../components/ErrorMessage"

export const PaymentMethod = () => {
    const { id } = useParams()

    const {
        isLoading: cardLoading,
        error: cardError,
        data: card,
    } = useQuery(["cards", id], () => getCard(id), {
        retry: false,
    })

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
        default: "",
    })

    useEffect(() => {
        if (card && Object.keys(card).length > 0) {
            setFormData({
                number: card.number,
                date: `${card.expiry_month}/${card.expiry_year}`,
                cvv: card.cvv,
                name: card.name,
                country: card.country,
                address_line_1: card.address_line_1,
                address_line_2: card.address_line_2,
                city: card.city,
                postal_code: card.postal_code,
                state: card.state,
                default: card.default,
            })
        }
    }, [card])

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation((data) => updateCard(data, id), {
        onSuccess: () => {
            openToast({ text: "Card updated!" })
            queryClient.invalidateQueries(["cards", id])
            navigate("/billing/payment-methods")
        },
    })

    return (
        <div className="container payment-method">
            <h1 className="fs-700 fw-700 mb">Payment method details</h1>
            {cardLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : cardError ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <p>
                        This card will be charged at the end of each calendar
                        month for usage during that month.
                    </p>
                    <PaymentMethodForm
                        id={id}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        error={error}
                        setFormData={setFormData}
                        formData={formData}
                    />
                </>
            )}
        </div>
    )
}
