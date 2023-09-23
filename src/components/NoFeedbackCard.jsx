
export const NoFeedbackCard = ({ text = 'No feedback!' }) => {
    return (
        <div className="no-feedback-card">
            <p className='fs-500 fw-600'>{text}</p>
        </div>
    )
}
