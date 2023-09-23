
export const AboutSection = ({ img, children }) => {
    return (
        <section className="about-section about-even-cols">
            <img src={img} alt="" />
            {children}
        </section>
    )
}
