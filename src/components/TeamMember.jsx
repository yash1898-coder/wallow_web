export const TeamMember = ({ name, position, img }) => {
    return (
        <div className="team-member">
            <img
                src={img}
                alt={name}
            />
            <p>{name}</p>
            <p className="">{position}</p>
        </div>
    )
}
