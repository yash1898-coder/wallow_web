export const Quote = ({ title, img, alt = "", author }) => {
    return (
        <section className="container">
            <figure className="quote">
                <blockquote className="fs-700 fw-700 text-center ff-secondary">
                    {title}
                </blockquote>
                {author ? (
                    <figcaption className="quote__quote mt">
                        <p>{author.name}</p>
                        <p className="">{author.position}</p>
                    </figcaption>
                ) : (
                    <figcaption className="quote__quote mt">
                        <img
                            className="quote__logo"
                            src={img}
                            alt={alt}
                        />
                    </figcaption>
                )}
            </figure>
        </section>
    )
}
