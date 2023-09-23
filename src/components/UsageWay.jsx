import { Link } from 'react-router-dom'
import { ReactComponent as Chevron } from '../assets/arrowRight.svg'

export const UsageWay = ({ icon, title, link, preview = false, previewAlt = '' }) => {

    return (
        <Link to={link.href} className={`usage-way ${preview ? 'usage-way--wide' : ''}`}>
            <div className="usage-way__content">
                <span className="usage-way__icon">
                    {typeof icon === 'string' ? <img src={icon} alt={title + ' ' + 'icon'} /> : icon}
                </span>
                <h3 className='usage-way__title fw-700 fs-500'>{title}</h3>
                <span className='link'>{link.text} <Chevron /></span>
            </div>
            {preview && <div className='usage-way__preview-wrapper'>
                <img className='usage-way__preview' src={preview} alt={previewAlt} />
            </div>}
        </Link >
    )
}
