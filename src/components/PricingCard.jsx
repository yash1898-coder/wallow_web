
export const PricingCard = ({ children, className = '' }) => {
    return (
        <div className={`pricing-card ${className}`}>
            {children}
        </div>
    )
}
