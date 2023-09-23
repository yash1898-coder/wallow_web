import { Link } from "react-router-dom"

export const Hero = ({ eyebrow, title, drawing, description }) => {
    return (
        <section className="how-teams-use-hero">
            <div className="flow">
                <h1 className="">{eyebrow}</h1>
                <p
                    dangerouslySetInnerHTML={{ __html: title }}
                    className="fs-700 fw-700 how-teams-use-hero__title"
                ></p>
                <p className="">{description}</p>
                <Link
                    to={"/signup"}
                    className="button"
                >
                    Try Wallow Free
                </Link>
            </div>
            <img
                className="how-teams-use-hero__img"
                src={drawing.src}
                alt={drawing.alt}
            />
        </section>
    )
}
