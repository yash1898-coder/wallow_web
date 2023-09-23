import { Link } from "react-router-dom"

export const Section = ({
    title,
    drawing,
    description,
    button = false,
    img,
}) => {
    return (
        <section className="how-teams-use-section">
            <div className={`how-teams-use-section-intro `}>
                <div
                    style={title.style}
                    className={`flow how-teams-use-section-intro__intro `}
                >
                    <h2 className={`fs-800 fw-700`}>{title}</h2>
                    <p className="">{description}</p>
                    {button && (
                        <Link
                            className={`button`}
                            to={"/signup"}
                        >
                            {button}
                        </Link>
                    )}
                </div>
                <img
                    className={`how-teams-use-section-intro__drawing`}
                    src={drawing.src}
                    alt={drawing.alt}
                />
            </div>
            <img
                className="preview-img mt"
                src={img.src}
                alt={img.alt}
            />
        </section>
    )
}
