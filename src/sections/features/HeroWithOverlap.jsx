import { Link } from "react-router-dom"

export const HeroWithOverlap = ({ title, subtitle, button, accentColor, preview, drawing }) => {
    return (
        <section className="features-hero--overlap progress-hero container">
            <div className="features-hero--overlap__grid">
                <h1 className="fs-800 fw-700 features-hero--overlap__title">{title}</h1>
                <div className="flow">
                    <p className="fs-500 features-hero--overlap__subtitle">{subtitle}</p>
                    <Link className={`button button--${accentColor}`} to={button.href}>{button.text}</Link>
                </div>
                <img style={drawing.style} src={drawing.src} alt={drawing.alt} />
            </div>
            <img className="preview-img" src={preview.src} alt={preview.alt} />
        </section>
    )
}
