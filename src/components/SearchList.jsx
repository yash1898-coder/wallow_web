import { useAuthStore } from "../stores/useAuthStore"
import { Checkbox } from "./Checkbox"
import { Pfp } from "./Pfp"

export const SearchList = ({ teams = false, options, onChange }) => {
    const { user } = useAuthStore()

    return (
        <ul className="search-list__list ">
            {options.length < 1 ? <p>Nothing found.</p> : options.map((option, idx) => (
                <li key={idx}>
                    <label htmlFor={option.id} className={`button-reset search-list__option fw-500`}>
                        <div className='flex' style={{ '--gap': '.6rem' }}>
                            {teams ? option.icon : <Pfp img={option.profile_image} name={option.first_name} size="40px" fontSize="1.25rem" />}

                            {teams ? option.name : <>
                                {option["Full Name"]} {option.id === user.id && '(You)'}
                            </>}
                        </div>

                        {user.id !== option.id && <Checkbox onChange={onChange} checked={option.selected}
                            name={option.id} />}
                    </label>
                </li>
            ))}
        </ul>
    )
}
