import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { ReactComponent as Instagram } from "../assets/instagram.svg"
import { ReactComponent as Twitter } from "../assets/twitter.svg"
import { ReactComponent as LinkedIn } from "../assets/linkedIn.svg"

export const Footer = () => {
    const footerNav = [
        {
            title: "Product",
            items: [
                { title: "Progress", href: "/progress" },
                { title: "Blockers", href: "/blockers" },
                { title: "Impediments", href: "/impediments" },
            ],
        },
        {
            title: "Get started",
            items: [
                { title: "Sign up", href: "/signup" },
                { title: "Log in", href: "/login" },
                {
                    title: "Request a demo",
                    href: "https://calendly.com/d/2pm-dd9-xtr/wallow-intro",
                },
            ],
        },
        {
            title: "Legal",
            items: [
                { title: "Terms & Conditions", href: "/terms" },
                { title: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ]
    return (
        <footer className="footer">
            <div className="footer__container container">
                <div className="footer-socials">
                    <Link
                        to="/"
                        className="flex fw-600 footer__logo logo"
                        style={{ "--gap": "0" }}
                    >
                        <img
                            className="header__logo"
                            src={logo}
                            alt="Wallow logo"
                        />
                    </Link>
                    <ul className="footer-socials__list flex">
                        <li className="footer-socials__item">
                            <a
                                className="footer-socials__link"
                                href="#"
                            >
                                <Instagram />
                            </a>
                        </li>
                        <li className="footer-socials__item">
                            <a
                                className="footer-socials__link"
                                href="#"
                            >
                                <Twitter />
                            </a>
                        </li>
                        <li className="footer-socials__item">
                            <a
                                className="footer-socials__link"
                                href="#"
                            >
                                <LinkedIn />
                            </a>
                        </li>
                    </ul>
                    <small className=" fs-200">© 2023 Wallow Labs, Inc.</small>
                    <small
                        className=" fs-200"
                        style={{ display: "block" }}
                    >
                        Patent Pending{" "}
                    </small>
                </div>
                <div className="footer-nav">
                    {footerNav.map((list, idx) => (
                        <div key={idx}>
                            <h4 className="footer-nav__list-title">
                                {list.title}
                            </h4>
                            <ul className="footer-nav__list">
                                {list.items.map((item, idx) => (
                                    <li
                                        className="footer-nav__item"
                                        key={idx}
                                    >
                                        <Link
                                            className="footer-nav__link link"
                                            to={item.href}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}
