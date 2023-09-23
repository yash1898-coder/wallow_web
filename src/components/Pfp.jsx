
export const Pfp = ({ className = '', name = '', img = false }) => {
    return (
        <div className={`pfp ${className}`}>
            {img ? <img src={img} alt={name} /> :
                <span>{name.charAt(0)}</span>}
        </div>
    )
}
