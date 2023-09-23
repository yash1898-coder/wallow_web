import { useState } from 'react'
import { ReactComponent as ThreeDots } from '../assets/threeDots.svg'
import { Spinner } from './Spinner'

export const Popup = ({ options }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="popup" tabIndex={0} onBlur={(e) => {
            if (!e.relatedTarget) {
                setOpen(false)
            } else if (!e.currentTarget.contains(e.relatedTarget)) {
                setOpen(false)
            }
        }}>
            <button
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className='button-reset popup__toggle'><ThreeDots /></button>
            <ul data-visible={open} className="popup__options">
                {options.map(option => (
                    <li key={option.title}>
                        <button disabled={option.isLoading} className='button-reset popup__option' style={{ color: option.color ?? '' }}
                            onClick={() => {
                                setOpen(false)
                                option.onClick()
                            }}>
                            {option.isLoading && <Spinner style={{ margin: 0 }} size='20px' />}
                            {option.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
