import { formatCurrency, formatDate, pageSpinnerStyle } from "../../../utils"
import { Link, useParams } from "react-router-dom"
import { ReactComponent as Arrow } from "../../../assets/arrowRight.svg"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"
import { useInvoice } from "../../../hooks/useInvoice"

export const Invoice = () => {
    const { id } = useParams()

    const { isLoading, error, invoice } = useInvoice(id)

    return (
        <div className="container ">
            <h1 className="fs-700 fw-700 mb">Billing History</h1>
            <p className="fs-400 mt">
                Showing invoices within the past 12 months
            </p>

            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <div className="invoice mt">
                    <div className="flow">
                        <h2 className="text-center fs-600 fw-600">
                            Invoice {invoice.status ? "paid" : "not paid"}
                        </h2>
                        <p className="text-center fs-600 fw-500">
                            {formatCurrency(invoice.amount)}
                        </p>
                        <Link
                            to={`/billing/history/invoices/${id}/payment-details`}
                            className="text-center link"
                        >
                            View invoice and payment details <Arrow />
                        </Link>
                    </div>

                    <div className="flow mt">
                        <div className="fs-500 fw-500 invoice__info">
                            <p>Invoice number</p>
                            <p>{invoice.invoice_number}</p>
                        </div>
                        <div className="fs-500 fw-500 invoice__info">
                            <p>Payment due</p>
                            <p>{formatDate(new Date(invoice.date))}</p>
                        </div>
                        <div className="fs-500 fw-500 invoice__info">
                            <p>Payment Method</p>
                            <p>**** **** **** {invoice.card_last4}</p>
                        </div>
                    </div>

                    <div
                        className="flex flex-wrap justify-center mt"
                        style={{ "--margin": "4rem" }}
                    >
                        <Link
                            to={`/billing/history/invoices/${id}/invoice-details`}
                            className="button"
                        >
                            View invoice
                        </Link>
                        <Link
                            to={`/billing/history/invoices/${id}/receipt`}
                            className="button"
                        >
                            View receipt
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
