import { useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Spinner } from "../Spinner"
import { CheckoutTotal } from "./CheckoutTotal"

const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "https://wallow.app"

export const CheckoutForm = ({ invoice, clientSecret }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (elements == null) {
            return
        }
        setIsLoading(true)

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit()
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message)
            setIsLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${BASE_URL}/billing/checkout/${invoice.id}/complete`,
            },
        })

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message)
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="checkout__info--desktop">
                <CheckoutTotal invoice={invoice} />
            </div>
            <button
                className="button button--blue"
                style={{ justifyContent: "center" }}
                type="submit"
                disabled={!stripe || !elements || isLoading}
            >
                {isLoading && <Spinner />}
                Pay
            </button>
            {/* Show error message to your customers */}
            {errorMessage && (
                <p className="text-center error-message mt">{errorMessage}</p>
            )}
        </form>
    )
}
