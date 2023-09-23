import { Link } from "react-router-dom"

export const NotificationsPopupItem = ({ item }) => {
    return (
        <li className={`notifications-popup__item`}>
            <div>
                <h3 className="fw-600 ">{item.notification_type}</h3>
                <p>{item.message}</p>
            </div>
            {item.link1 && (
                <div className="flex">
                    <Link
                        to={item.link1}
                        className="button button--green"
                    >
                        Accept
                    </Link>
                    <Link
                        to={item.link2}
                        className="button button--red"
                    >
                        Reject
                    </Link>
                </div>
            )}
        </li>
    )
}
