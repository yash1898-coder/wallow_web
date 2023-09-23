import { formatCurrency } from "../../utils"

export const CheckoutTotal = ({ invoice }) => {
    const excludingTaxAmount = invoice?.amount / (1 + invoice?.tax / 100)

    return (
        <div
            className="flow mt"
            style={{ flex: "1" }}
        >
            <div className="fs-400 fw-500 checkout__info">
                <p>Subtotal</p>
                <p>{formatCurrency(excludingTaxAmount)}</p>
            </div>
            <div className="fs-400 fw-500 checkout__info">
                <p>Total excluding tax</p>
                <p>{formatCurrency(excludingTaxAmount)}</p>
            </div>
            <div className="fs-400 fw-500 checkout__info">
                <p>
                    Sales Tax ({invoice.tax}% on{" "}
                    {formatCurrency(excludingTaxAmount)})
                </p>
                <p>
                    {formatCurrency(excludingTaxAmount * (invoice.tax / 100))}
                </p>
            </div>
            <div className="fs-400 fw-500 checkout__info">
                <p>Total</p>
                <p>{formatCurrency(invoice.amount)}</p>
            </div>
            <div className="fs-400 fw-500 checkout__info">
                <p className="fw-600">Amount due</p>
                <p className="fw-600">{formatCurrency(invoice.amount)}</p>
            </div>
        </div>
    )
}
