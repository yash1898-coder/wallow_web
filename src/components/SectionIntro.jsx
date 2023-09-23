import { Link } from "react-router-dom"
import { ReactComponent as ArrowRight } from "../assets/arrowRight.svg"

export const SectionIntro = ({ drawing, title, link = false }) => {

    return (
        <div className={`section-intro ${drawing.position}`}>
            <img className={`section-intro__drawing`} style={drawing.style} data-overlaplevel={drawing.overlapLevel}
                src={drawing.src} alt={drawing.alt} />
            <div style={title.style} className={`flow section-intro__title ${title.center ? 'center' : ''} `}>
                <h2 className={`fs-800 fw-700 ${title.center ? 'text-center' : ''}`}>{title.text}</h2>
                {link && <Link className={`link ${link.accentColor}`} to={link.href}>{link.text} <ArrowRight /></Link>}
            </div>
        </div>
    )
}
