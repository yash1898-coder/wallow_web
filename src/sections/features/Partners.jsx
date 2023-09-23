import { PartnerLogos } from "../PartnerLogos"

export const Partners = ({
    title,
    subtitle,
    preview = true,
    cards = false,
}) => {
    return (
        <section className="features-partners container">
            <div className="flow">
                <h2 className="fs-700 fw-700 text-center">{title}</h2>
                <p className="features-partners__subtitle text-center">
                    {subtitle}
                </p>
            </div>
            <PartnerLogos />
            {preview ? (
                <img
                    className="preview-img features-partners__preview"
                    src={preview.src}
                    alt={preview.alt}
                />
            ) : (
                cards
            )}
        </section>
    )
}
