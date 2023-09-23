
export const BuldingBlock = ({ title, subtitle, icon, preview, previewAlt = '', wide = false }) => {

    return (
        <div className={`building-block ${wide ? 'building-block--wide' : ''} bg-neutral-200 rounded`}>
            <div className={`flow building-block__content ${wide ? 'building-block--wide__content' : ''}`} data-spacing="extrasmall">
                <img className="building-block__icon" src={icon} alt={title + ' ' + 'icon'} />
                <h3 className="building-block__title fs-500 fw-700">{title}</h3>
                <p className="building-block__subtitle">{subtitle}</p>
            </div>
            <img className={`building-block__img ${wide ? 'preview-img building-block--wide__img' : ''}`}
                data-shadow="light" src={preview} alt={previewAlt} />
        </div>
    )
}
