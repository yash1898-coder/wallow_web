import { Link } from "react-router-dom"
import { ReactComponent as ArrowRight } from "../assets/arrowRight.svg"


export const SectionIntroLink = ({ style, drawing, link }) => {

    return (
        <div style={style} className={`section-intro-link ${drawing.position}`}>
            <img style={{ ...drawing.style }} className={`section-intro-link__drawing`} data-overlaplevel={drawing.overlapLevel}
                src={drawing.src} alt={drawing.alt} />
            <Link style={link.style}
                className={`section-intro-link__link link ${link.accentColor || ''}`} to={link.href}>{link.text} <ArrowRight /></Link>
        </div>
    )
}
