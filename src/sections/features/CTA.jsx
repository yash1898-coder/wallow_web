import { Link } from "react-router-dom"
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg"

export const CTA = ({ style, title = false, subtitle, accentColor = '', button = false, link = false, items, drawing }) => {

    return (
        <section className='features-cta container'>
            <div className="features-cta__intro">
                <div style={style} className="flow">
                    {title && <h2 className={`fs-800 fw-700 text-center`}>{title}</h2>}
                    <p>{subtitle}</p>
                    <div className="flex">
                        {button && <Link className={`button button--${accentColor}`} to={button.href}>{button.text}</Link>}
                        {link && <Link className={`link ${accentColor}`} to={link.href}>{link.text} <ArrowRight /></Link>}
                    </div>
                </div>
                <img className="features-cta__drawing" style={drawing.style} data-overlaplevel={drawing.nestingLevel} src={drawing.src} alt={drawing.alt} />
            </div>
            <div className="features-cta__grid">
                {items.map((item, idx) => <div key={idx} className="features-cta-item bg-neutral-200 flow" data-spacing="large">
                    <h3 className="features-cta-item__title fs-500 fw-700">{item.title}</h3>
                    <img className="preview-img" data-shadow="light" src={item.preview.src} alt={item.preview.alt} />
                </div>)}
            </div>
        </section>
    )
}
