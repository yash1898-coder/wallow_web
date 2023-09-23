import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "../../components/stripe/CheckoutForm"
import { loadStripe } from "@stripe/stripe-js"
import { useInvoice } from "../../hooks/useInvoice"
import { Navigate, useParams } from "react-router-dom"
import { ErrorMessage } from "../../components/ErrorMessage"
import { Spinner } from "../../components/Spinner"
import { pageSpinnerStyle } from "../../utils"
import { CheckoutTotal } from "../../components/stripe/CheckoutTotal"

export const Checkout = () => {
    const { invoiceId } = useParams()
    const { isLoading, error, invoice } = useInvoice(invoiceId)

    if (invoice?.status) return <Navigate to={"/billing/invoices"} /> //if paid, go back

    const options = {
        clientSecret: invoice?.stripe_secret,
    }

    return (
        <div className="checkout">
            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <h1
                        className="fs-700 fw-700 mb"
                        style={{ "--margin": "2rem" }}
                    >
                        Pay
                    </h1>

                    <div className="checkout__grid">
                        <div className="checkout__info--mobile">
                            <CheckoutTotal invoice={invoice} />
                        </div>
                        <div className="checkout__form-wrapper">
                            <Elements
                                stripe={stripePromise}
                                options={options}
                            >
                                <CheckoutForm
                                    invoice={invoice}
                                    clientSecret={invoice?.stripe_secret}
                                />
                            </Elements>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const stripePromise = loadStripe(
    "pk_test_51HKn5YHkRWB9MNBRVbkO3mD9UoPsluiX4tKO3EPt3V6UBMDZjKYTd7JPUCH1MtNIvpjwxH24QNmXbWDnlqbMDxWq002Mrt0mg4"
)
