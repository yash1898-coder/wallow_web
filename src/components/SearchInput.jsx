import { ReactComponent as Search } from '../assets/search.svg'

export const SearchInput = ({ placeholder, inputClassName = '', value, onChange }) => {

    return (
        <div className='search-input'>
            <Search className="search-input__icon" />
            <input onChange={onChange} value={value}
                className={`input search-input__input ${inputClassName}`}
                type="text"
                placeholder={placeholder} />
        </div>
    )
}
