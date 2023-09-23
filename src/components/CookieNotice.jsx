import { useStore } from "../stores/useStore"
import { ReactComponent as Close } from '../assets/close.svg'

export const CookieNotice = () => {
    const { cookieNotice, closeCookieNotice } = useStore()

    return (
        <div className="cookie-notice" data-visible={cookieNotice} >
            <div className="container cookie-notice__container">
                <p>Our website uses cookies to enhance the user experience and may be used with your consent to analyze site usage, improve the user experience and for advertising. You may
                    accept the default settings.</p>

                <div className="flex">
                    <button className="button"
                        onClick={() => closeCookieNotice()}
                    >Accept Cookies</button>

                    <button className="button-reset"
                        onClick={() => closeCookieNotice()}
                    >
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    )
}
