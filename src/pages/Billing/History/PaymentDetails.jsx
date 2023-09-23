import { useParams } from "react-router-dom"
import { formatCurrency, formatDate, pageSpinnerStyle } from "../../../utils"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"
import { useInvoice } from "../../../hooks/useInvoice"

export const PaymentDetails = () => {
    const { id } = useParams()

    const { isLoading, error, invoice } = useInvoice(id)

    const excludingTaxAmount = invoice?.amount / (1 + invoice?.tax / 100)

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <div className="container ">
            <h1 className="fs-700 fw-700 mb">Summary</h1>

            <div className="invoice invoice--payment-details mt">
                <div className="flow">
                    <div className="fs-500 fw-500 invoice__info invoice__info--smaller">
                        <p>To</p>
                        <p>{invoice.billing_address.company_name}</p>
                    </div>
                    <div className="fs-500 fw-500 invoice__info invoice__info--smaller">
                        <p>From</p>
                        <p>Wallow. LLC</p>
                    </div>
                    <div className="fs-500 fw-500 invoice__info invoice__info--smaller">
                        <p>Invoice number</p>
                        <p>#{invoice.invoice_number}</p>
                    </div>
                </div>

                <h2 className="mt fs-600 fw-600">Items</h2>
                <div className="invoice__info-wrapper">
                    <div className="fs-500 fw-500 invoice__info">
                        <p>
                            {formatDate(new Date(invoice.created_at))} -{" "}
                            {formatDate(new Date(invoice.date))}
                        </p>
                    </div>
                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Daily scrum platform</p>
                        <p className="fw-600">
                            {formatCurrency(invoice.amount)}
                        </p>
                    </div>
                    <div className="fs-500 fw-500 invoice__info">
                        <p>Qty {invoice.quantity}</p>
                        <p>{formatCurrency(invoice.unit_price)} each</p>
                    </div>
                </div>

                <div className="invoice__info-wrapper">
                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Subtotal</p>
                        <p>{formatCurrency(excludingTaxAmount)}</p>
                    </div>
                </div>

                <div className="invoice__info-wrapper">
                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Total excluding tax</p>
                        <p>{formatCurrency(excludingTaxAmount)}</p>
                    </div>
                    <div className="fs-500 fw-500 invoice__info">
                        <p>Sales Tax {invoice.tax}% on</p>
                        <p>{formatCurrency(excludingTaxAmount)}</p>
                    </div>
                </div>

                <div className="invoice__info-wrapper">
                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Total due</p>
                        <p className="fw-600">
                            {formatCurrency(invoice.amount)}
                        </p>
                    </div>
                </div>

                <div className="invoice__info-wrapper">
                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Amount paid</p>
                        <p className="fw-600">
                            {invoice.status
                                ? formatCurrency(invoice.amount)
                                : formatCurrency(0)}
                        </p>
                    </div>

                    <div className="fs-500 fw-500 invoice__info">
                        <p className="fw-600">Amount remaining</p>
                        <p className="fw-600">
                            {invoice.status
                                ? formatCurrency(0)
                                : formatCurrency(invoice.amount)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
