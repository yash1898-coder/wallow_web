import { Pfp } from "./Pfp"
import { Spinner } from "./Spinner"
import { TeamFunctionIcon } from "./TeamFunctionIcon"

export const PeopleButton = ({ isLoading, teams = false, onClick, people }) => {
    const nothingYetText = teams ? <p>No teams yet.</p> : <p>No people yet.</p>

    return (
        <button onClick={onClick} className='people-button'>
            {isLoading ? <Spinner size="18px" /> : people.length === 0 ? nothingYetText : <>
                {people.slice(0, 5).map((p, idx) => teams ? <TeamFunctionIcon className="people-button__img"
                    key={idx} team={p.function} /> :
                    <Pfp className="people-button__img" size="30px" fontSize="1rem"
                        key={idx} name={p.email} img={p.profile_image} />)}
                <small>{people.length}</small>
            </>}
        </button>
    )
}
