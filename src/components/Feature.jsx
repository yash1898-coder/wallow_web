import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export const Feature = ({
    title,
    icon,
    accentColor,
    subtitle,
    link,
    preview,
    drawing,
    previewAlt = "",
    drawingAlt = "",
}) => {
    return (
        <figure className="feature">
            <div
                className="flow feature__content"
                data-spacing="small"
            >
                <h3 className="fs-700 fw-700 flex  feature__title">
                    <img
                        className="feature__icon"
                        src={icon}
                        alt={title + " " + "icon"}
                    />
                    {title}
                </h3>
                <p>{subtitle}</p>
                <Link
                    to={link.href}
                    className={`link feature__link ${accentColor}`}
                >
                    {link.text} {link.icon}
                </Link>
            </div>
            <div className="feature__imgs mobile-only">
                <img
                    className="feature__drawing"
                    src={drawing}
                    alt={drawingAlt}
                />
                <img
                    className="feature__preview preview-img"
                    src={preview}
                    alt={previewAlt}
                />
            </div>
            <svg
                className={`feature__outline ${accentColor}`}
                width="150"
                height="33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    className="path"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    d="M7.5 5.5C17.333 4 44.9 1 76.5 1c45 0 72.5 5.5 72.5 13.5s-31 16-72.5 16.5C30.503 31.554 1 28.5 1 19.5S50.5-4.81 86.5 4.19"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength="1"
                    fill="none"
                ></motion.path>
            </svg>
            <img
                className="feature__drawing desktop-only"
                src={drawing}
                alt={drawingAlt}
            />
            <img
                className="feature__preview preview-img desktop-only"
                src={preview}
                alt={previewAlt}
            />
        </figure>
    )
}
