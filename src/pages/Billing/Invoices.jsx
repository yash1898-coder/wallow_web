import { useQuery } from "react-query"
import { Pill } from "../../components/Pill"
import { formatCurrency, formatDateExact, pageSpinnerStyle } from "../../utils"
import { Link } from "react-router-dom"
import { getInvoices } from "../../api/billing"
import { Spinner } from "../../components/Spinner"
import { ErrorMessage } from "../../components/ErrorMessage"

export const Invoices = () => {
    const { isLoading, error, data } = useQuery(
        ["invoices"],
        () => getInvoices(),
        {
            retry: false,
        }
    )

    return (
        <div className="container ">
            <h1 className="fs-700 fw-700 mb">Invoices</h1>
            <p className="fs-400 mt">
                Showing invoices within the past 12 months
            </p>
            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <HistoryTable data={data} />
            )}
        </div>
    )
}

const HistoryTable = ({ data }) => {
    const filteredData = data?.filter((i) => !i.status)

    return (
        <div className="history-table mt">
            {filteredData.length < 1 ? (
                <p className="fw-600 fs-600">No invoices yet.</p>
            ) : (
                <>
                    <div className="history-table__header">
                        <h3 className="history-table__header-item">Invoice</h3>
                        <h3 className="history-table__header-item">Status</h3>
                        <h3 className="history-table__header-item">Amount</h3>
                        <h3 className="history-table__header-item">Created</h3>
                        <h3
                            className="history-table__header-item"
                            aria-hidden={true}
                        ></h3>
                    </div>
                    <div className="history-table__body">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="font-semibold text-white history-table__row"
                            >
                                <div className="fw-600 history-table__row-item">
                                    <h3 className="history-table__header-item--mobile">
                                        Invoice
                                    </h3>
                                    <p> {item.invoice_number}</p>
                                </div>
                                <div className="history-table__row-item">
                                    <h3 className="history-table__header-item--mobile">
                                        Status
                                    </h3>
                                    <Pill
                                        color={item.status ? "paid" : "notPaid"}
                                        text={item.status ? "Paid" : "Not paid"}
                                    />
                                </div>
                                <div className="history-table__row-item">
                                    <h3 className="history-table__header-item--mobile">
                                        Amount
                                    </h3>
                                    <p> {formatCurrency(item.amount)}</p>
                                </div>
                                <div className="history-table__row-item">
                                    <h3 className="history-table__header-item--mobile">
                                        Created
                                    </h3>
                                    <p>
                                        {" "}
                                        {formatDateExact(
                                            new Date(item.created_at)
                                        )}
                                    </p>
                                </div>
                                <div className="history-table__row-item">
                                    <h3
                                        className="history-table__header-item--mobile"
                                        aria-hidden={true}
                                    ></h3>
                                    {!item.status && (
                                        <Link
                                            to={`/billing/checkout/${item.id}`}
                                            className="button"
                                        >
                                            Pay
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
