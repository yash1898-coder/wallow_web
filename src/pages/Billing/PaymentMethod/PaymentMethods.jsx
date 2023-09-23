import { useQuery } from "react-query"
import {
    getCardType,
    getLastFourDigits,
    pageSpinnerStyle,
} from "../../../utils"
import { Link } from "react-router-dom"
import { getCards } from "../../../api/billing"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"

export const PaymentMethods = () => {
    const { isLoading, error, data } = useQuery(["cards"], () => getCards(), {
        retry: false,
    })

    return (
        <div className="container payment-method">
            <h1 className="fs-700 fw-700 mb">Payment methods</h1>
            {error && <ErrorMessage message={error.message} />}
            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <div className="payment-method__cards">
                        {data.map((card, idx) => (
                            <Card
                                key={idx}
                                card={card}
                            />
                        ))}
                    </div>
                    <Link
                        className="button mt"
                        to="/billing/payment-methods/add"
                    >
                        Add payment method
                    </Link>
                </>
            )}
        </div>
    )
}

const Card = ({ card }) => {
    return (
        <Link
            to={`/billing/payment-methods/${card.id}`}
            className="payment-method-card"
        >
            <div className="payment-method-card__logo flex">
                {getCardType(card.number) && (
                    <img
                        src={getCardType(card.number).src}
                        alt={getCardType(card.number).alt}
                    />
                )}

                <p className="payment-method-card__number">
                    XXXX XXXX XXXX {getLastFourDigits(card.number)}
                </p>
            </div>
            <div className="payment-method-card__footer">
                <p>
                    Expires {card.expiry_month}/{card.expiry_year}
                </p>
                {card.default && (
                    <span className="payment-method-card__name">Default</span>
                )}
            </div>
        </Link>
    )
}
