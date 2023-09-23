import { useParams } from "react-router-dom"
import { formatCurrency, formatDate, pageSpinnerStyle } from "../../../utils"
import logo from "../../../assets/logo.png"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"
import { useInvoice } from "../../../hooks/useInvoice"
import { PaymentTotal } from "../../../components/stripe/PaymentTotal"

export const Receipt = () => {
    const { id } = useParams()

    const { isLoading, error, invoice } = useInvoice(id)

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <div className="container ">
            <div className="invoice invoice--invoice-details mt">
                <div className="flex justify-between">
                    <h1 className="fs-700 fw-700 mb">Receipt</h1>
                    <img
                        className="logo"
                        src={logo}
                        alt="Wallow"
                    />
                </div>
                <div
                    className="flow"
                    data-spacing="small"
                >
                    <div className=" fw-500 invoice__info invoice__info--smaller">
                        <p>Invoice number</p>
                        <p>{invoice.invoice_number}</p>
                    </div>
                    <div className=" invoice__info invoice__info--smaller">
                        <p>Receipt number</p>
                        <p>{invoice.receipt_number}</p>
                    </div>
                    <div className=" invoice__info invoice__info--smaller">
                        <p>Date paid</p>
                        <p>{formatDate(new Date(invoice.date))}</p>
                    </div>
                    <div className=" invoice__info invoice__info--smaller">
                        <p>Payment method</p>
                        <p>**** **** **** {invoice.card_last4}</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mt">
                    <div
                        className="flow"
                        data-spacing="extrasmall"
                    >
                        <h2 className="fw-600">Wallow. LLC</h2>
                        <p>155 Garth Road</p>
                        <p>Scarsdale, New York. 10583</p>
                        <p>United States</p>
                        <p>h@wallow.app</p>
                    </div>

                    <div
                        className="flow"
                        data-spacing="extrasmall"
                    >
                        <h2 className="fw-600">Bill to</h2>
                        <p>
                            {invoice.billing_address.company_name},{" "}
                            {invoice.billing_address.billing_email}
                        </p>
                        <p>{invoice.billing_address.address_line_1}</p>
                        <p>
                            {invoice.billing_address.city},{" "}
                            {invoice.billing_address.state}.{" "}
                            {invoice.billing_address.postal_code}
                        </p>
                        <p>{invoice.billing_address.country}</p>
                    </div>

                    <div
                        className="flow"
                        data-spacing="extrasmall"
                    >
                        <h2 className="fw-600">Ship to</h2>
                        <p>
                            {invoice.billing_address.company_name},{" "}
                            {invoice.billing_address.billing_email}
                        </p>
                        <p>{invoice.billing_address.address_line_1}</p>
                        <p>
                            {invoice.billing_address.city},{" "}
                            {invoice.billing_address.state}.{" "}
                            {invoice.billing_address.postal_code}
                        </p>
                        <p>{invoice.billing_address.country}</p>
                    </div>
                </div>
                <h3 className="mt fs-600 fw-700">
                    {formatCurrency(invoice.amount)} paid on{" "}
                    {formatDate(new Date(invoice.date))}
                </h3>
                <div className="invoice--invoice-details-table mt">
                    <div className="invoice--invoice-details-table__header">
                        <h3 className="fs-300 invoice--invoice-details-table__header-item">
                            Description
                        </h3>
                        <h3 className="fs-300 invoice--invoice-details-table__header-item">
                            Qty
                        </h3>
                        <h3 className="fs-300 invoice--invoice-details-table__header-item">
                            Unit price
                        </h3>
                        <h3 className="fs-300 invoice--invoice-details-table__header-item">
                            Tax
                        </h3>
                        <h3 className="fs-300 invoice--invoice-details-table__header-item">
                            Amount
                        </h3>
                    </div>
                    <div className="invoice--invoice-details-table__body">
                        <div className="invoice--invoice-details-table__row">
                            <div className="invoice--invoice-details-table__row-item">
                                <h3 className="invoice--invoice-details-table__header-item--mobile">
                                    Description
                                </h3>
                                <p>
                                    Daily scrum platform <br />
                                    {formatDate(new Date(invoice.created_at))} -
                                    {formatDate(new Date(invoice.created_at))}
                                </p>
                            </div>
                            <div className="invoice--invoice-details-table__row-item">
                                <h3 className="invoice--invoice-details-table__header-item--mobile">
                                    Qty
                                </h3>
                                <p>{invoice.quantity}</p>
                            </div>
                            <div className="invoice--invoice-details-table__row-item">
                                <h3 className="invoice--invoice-details-table__header-item--mobile">
                                    Unit price
                                </h3>
                                <p>{formatCurrency(invoice.unit_price)}</p>
                            </div>
                            <div className="invoice--invoice-details-table__row-item">
                                <h3 className="invoice--invoice-details-table__header-item--mobile">
                                    Tax
                                </h3>
                                <p>{invoice.tax}%</p>
                            </div>
                            <div className="invoice--invoice-details-table__row-item">
                                <h3 className="invoice--invoice-details-table__header-item--mobile">
                                    Amount
                                </h3>
                                <p>{formatCurrency(invoice.amount)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <PaymentTotal invoice={invoice} />
            </div>
        </div>
    )
}
