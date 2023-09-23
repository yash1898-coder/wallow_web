import { Link } from 'react-router-dom'
import { ReactComponent as ArrowRight } from '../assets/arrowRight.svg'

export const Card = ({ title, subtitle, icon = false, img, link = false }) => {

    return (
        <div className={`card bg-neutral-200 rounded`}>
            <div className={`flow card__content`} data-spacing="extrasmall">
                {icon && icon}
                <h3 className="card__title fs-500 fw-700">{title}</h3>
                <p className="card__subtitle">{subtitle}</p>
                {link && <Link className={`link ${link.accentColor || ''}`} to={link.href}>{link.text} <ArrowRight /></Link>}
            </div>
            <img className={`card__img`}
                style={{ ...img.style }} src={img.src} alt={img.alt} />
        </div>
    )
}
