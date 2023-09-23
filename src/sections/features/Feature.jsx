
export const Feature = ({ sectionIntro, preview }) => {
    return (
        <section className='features-feature container'>
            {sectionIntro}
            <img className="preview-img" src={preview.src} alt={preview.alt} />
        </section>
    )
}
