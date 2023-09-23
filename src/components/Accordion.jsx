import { ReactComponent as Plus } from '../assets/plus.svg'

export const Accordion = ({ summary, text }) => {
    return (
        <details className='accordion'>
            <summary className='accordion__summary'>
                {summary}
                <Plus />
            </summary>
            <p className="accordion__details">
                {text}
            </p>
        </details>
    )
}
