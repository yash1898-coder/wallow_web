import { formatCurrency } from "../../utils"

export const PaymentTotal = ({ invoice, print }) => {
    const excludingTaxAmount = invoice?.amount / (1 + invoice?.tax / 100)

    return (
        <div className="flex">
            {print && (
                <button
                    className="button"
                    onClick={() => window.print()}
                    style={{ marginTop: "auto" }}
                >
                    Print
                </button>
            )}
            <div
                className="flow invoice__info--align-end mt"
                style={{ flex: "1" }}
            >
                <div className="fs-400 fw-500 invoice__info invoice__info--border">
                    <p>Subtotal</p>
                    <p>{formatCurrency(excludingTaxAmount)}</p>
                </div>
                <div className="fs-400 fw-500 invoice__info invoice__info--border">
                    <p>Total excluding tax</p>
                    <p>{formatCurrency(excludingTaxAmount)}</p>
                </div>
                <div className="fs-400 fw-500 invoice__info invoice__info--border">
                    <p>
                        Sales Tax ({invoice.tax}% on{" "}
                        {formatCurrency(excludingTaxAmount)})
                    </p>
                    <p>
                        {formatCurrency(
                            excludingTaxAmount * (invoice.tax / 100)
                        )}
                    </p>
                </div>
                <div className="fs-400 fw-500 invoice__info invoice__info--border">
                    <p>Total</p>
                    <p>{formatCurrency(invoice.amount)}</p>
                </div>
                <div className="fs-400 fw-500 invoice__info invoice__info--border">
                    <p className="fw-600">Amount due</p>
                    <p className="fw-600">{formatCurrency(invoice.amount)}</p>
                </div>
            </div>
        </div>
    )
}
