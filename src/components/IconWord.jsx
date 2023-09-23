import { Link } from "react-router-dom"

export const IconWord = ({ children, href, additionalText = '', className = '', icon, alt }) => {
    return (
        <>
            <Link to={href} className={`icon-word ${className}`}>
                <img src={icon} alt={alt} />
                <span className='underline'>{children}</span>
                {additionalText}
            </Link>
        </>
    )
}
