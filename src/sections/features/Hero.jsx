import { Link } from "react-router-dom"

export const Hero = ({ title, subtitle, button, accentColor, preview, drawing }) => {
    return (
        <section className="features-hero progress-hero container">
            <div className="features-hero__even-cols">
                <div className="flow">
                    <h1 className="fs-850 fw-700">{title}</h1>
                    <p className="fs-500 features-hero__subtitle">{subtitle}</p>
                    <Link className={`button button--${accentColor}`} to={button.href}>{button.text}</Link>
                </div>
                <img style={drawing.style} src={drawing.src} alt={drawing.alt} />
            </div>
            <img className="preview-img" src={preview.src} alt={preview.alt} />
        </section>
    )
}
