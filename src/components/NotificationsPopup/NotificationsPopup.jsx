import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ReactComponent as Notification } from "../../assets/notification.svg"
import { useQuery } from "react-query"
import { getNotifications } from "../../api/accounts"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { NotificationsPopupItem } from "./NotificationsPopupItem"
import { useAuthStore } from "../../stores/useAuthStore"
import { arraysAreEqual } from "../../utils"

export const NotificationsPopup = () => {
    const [open, setOpen] = useState(false)
    const { user } = useAuthStore()

    const [alertVisible, setAlertVisible] = useState(() => {
        const saved = localStorage.getItem(`alertVisible${user.id}`)
        const initialValue = JSON.parse(saved)
        return initialValue !== null ? initialValue : false
    })

    const [prevNotifications, setPrevNotifications] = useState(() => {
        const saved = localStorage.getItem(`prevNotifications${user.id}`)
        const initialValue = JSON.parse(saved)
        return initialValue !== null ? initialValue : []
    })

    useEffect(() => {
        localStorage.setItem(
            `alertVisible${user.id}`,
            JSON.stringify(alertVisible)
        )
    }, [alertVisible, user.id])

    useEffect(() => {
        localStorage.setItem(
            `prevNotifications${user.id}`,
            JSON.stringify(prevNotifications)
        )
    }, [prevNotifications, user.id])

    const {
        isLoading,
        error,
        data: notifications,
    } = useQuery(["notifications"], () => getNotifications(), {
        onSuccess: (newData) => {
            if (
                !arraysAreEqual(prevNotifications, newData) &&
                newData.length > prevNotifications.length
            ) {
                if (newData.length > 0) {
                    setAlertVisible(true)
                    setPrevNotifications(newData)
                }
            }
        },
    })

    return (
        <div
            className={`notifications-popup`}
            tabIndex={0}
            onBlur={(e) => {
                if (
                    !e.relatedTarget ||
                    !e.currentTarget.contains(e.relatedTarget)
                ) {
                    setOpen(false)
                }
            }}
        >
            <button
                onClick={() => {
                    setOpen((prev) => !prev)
                    setAlertVisible(false)
                }}
                className={`notifications-popup__button ${
                    alertVisible && notifications?.length > 0 ? "animated" : ""
                } button-reset`}
                data-number={notifications?.length}
            >
                <Notification />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`notifications-popup__popup`}
                    >
                        <h3 className="notifications-popup__title fs-500 fw-600">
                            Notifications
                        </h3>
                        {error && <ErrorMessage message={error.message} />}
                        {isLoading ? (
                            <Spinner />
                        ) : !error ? (
                            notifications.length === 0 ? (
                                <p className="notifications-popup__empty">
                                    You don't have any notifications yet.
                                </p>
                            ) : (
                                <ul className="notifications-popup__list">
                                    {notifications?.map((item) => (
                                        <NotificationsPopupItem
                                            item={item}
                                            key={item.id}
                                        />
                                    ))}
                                </ul>
                            )
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
