import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useInvoice } from "../../hooks/useInvoice"
import { Spinner } from "../../components/Spinner"
import { pageSpinnerStyle } from "../../utils"
import { ErrorMessage } from "../../components/ErrorMessage"
import check from "../../assets/check-large.svg"
import { updateInvoice } from "../../api/billing"
import { useMutation, useQueryClient } from "react-query"
import { useEffect } from "react"

export const PaymentComplete = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { invoiceId } = useParams()
    const { isLoading, error, invoice } = useInvoice(invoiceId)

    const {
        isLoading: updateLoading,
        error: updateError,
        mutate: onUpdateInvoice,
    } = useMutation(() => updateInvoice(invoiceId), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["invoices"])
            queryClient.invalidateQueries(["invoices", invoiceId])
            if (res === "No change in status") {
                navigate("/billing/invoices")
            }
        },
    })

    useEffect(() => {
        if (!invoice?.status && !isLoading) {
            onUpdateInvoice()
        }
    }, [isLoading, invoice?.status, onUpdateInvoice])

    if (error) return <ErrorMessage message={error.message} />

    if (updateError) return <ErrorMessage message={updateError.message} />

    if (isLoading || updateLoading) return <Spinner style={pageSpinnerStyle} />

    if (!invoice) {
        return <Navigate to={"/billing/invoices"} />
    }

    return (
        <div
            className="text-center flow checkout"
            style={{ display: "grid", placeContent: "center" }}
        >
            <div className="flex justify-center">
                <img
                    src={check}
                    alt="checkmark"
                />
                <h1 className="fs-700 fw-600">Payment complete!</h1>
            </div>
            <p>
                Invoice number: <b>{invoice?.invoice_number}</b>
            </p>
            <div className="flex flex-wrap justify-center">
                <Link
                    className="button payment-complete__button"
                    style={{ width: "fit-content" }}
                    to={`/billing/history/invoices/${invoiceId}/invoice-details`}
                >
                    View invoice details
                </Link>
                <Link
                    className="button payment-complete__button"
                    style={{ width: "fit-content" }}
                    to={`/billing/history/invoices/${invoiceId}/receipt`}
                >
                    View receipt
                </Link>
                <Link
                    className="button payment-complete__button"
                    style={{ width: "fit-content" }}
                    to={`/billing/overview`}
                >
                    Back to Wallow
                </Link>
            </div>
        </div>
    )
}
