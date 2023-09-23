export const Testimonials = ({ title, items, description }) => {
    return (
        <section className="how-teams-use-testimonials flow">
            <h2 className="fs-600 fw-700 text-center">{title}</h2>
            <p className=" text-center">{description}</p>

            <div className="how-teams-use-testimonials__container">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="how-teams-use-testimonial"
                    >
                        <div className="flex">
                            <img
                                className="how-teams-use-testimonial__icon"
                                src={item.icon}
                                alt={item.title}
                            />
                            <h3 className="fw-700 fs-500">{item.title}</h3>
                        </div>
                        <p className="">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
