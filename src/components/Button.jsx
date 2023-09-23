import { Link } from 'react-router-dom'

export const Button = ({ href, className = '', children }) => {
    return (
        <Link to={href} className={`button ${className}`}>
            {children}
        </Link>
    )
}
