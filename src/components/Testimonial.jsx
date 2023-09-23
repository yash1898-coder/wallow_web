import { Link } from "react-router-dom"
import { ReactComponent as ArrowRight } from '../assets/arrowRight.svg'

export const Testimonial = ({ title, subtitle, icon, preview, previewAlt = '', link = false, wide = false, quote = false }) => {

    return (
        <div className={`testimonial ${wide ? 'testimonial--wide' : ''} bg-neutral-200 rounded`}>
            {quote ? <div className={` testimonial__content`} data-spacing="extrasmall">
                <img src={quote.img} alt={quote.alt} />
                <blockquote className="testimonial-quote__text fs-700 fw-700 ff-secondary">{quote.text}</blockquote>
                <figcaption className="testimonial-quote__author mt">
                    <p className="fw-700 testimonial-quote__name">{quote.name}</p>
                    <p>{quote.position}</p>
                </figcaption>
            </div>
                : <>
                    <div className={`flow testimonial__content ${wide ? 'testimonial--wide__content' : ''}`} data-spacing="extrasmall">
                        {icon && <img className="testimonial__icon" src={icon} alt={`${title} icon`} />}
                        <h3 className="testimonial__title fs-500 fw-700">{title}</h3>
                        <p className="testimonial__subtitle">{subtitle}</p>
                        {link && <Link className={`link ${link.accentColor || ''}`}
                            to={link.href}>{link.text} <ArrowRight /></Link>}
                    </div>
                    <img className={`testimonial__img ${wide ? 'testimonial--wide__img' : ''}`}
                        data-shadow="light" src={preview} alt={previewAlt} />
                </>}
        </div>
    )
}
