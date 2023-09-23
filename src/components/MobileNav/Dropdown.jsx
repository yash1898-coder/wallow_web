import { useState } from 'react'
import { ReactComponent as Caret } from '../../assets/caret.svg'
import { Link } from 'react-router-dom'

export const Dropdown = ({ item, onNavLinkClick }) => {
    const [open, setOpen] = useState(false)

    const onDropdownItemClick = () => setOpen(false)

    return (
        <li className='mobile-nav__item'>
            <button className='mobile-nav__dropdown-toggle' aria-expanded={open} onClick={() => setOpen(open => !open)}>
                {item.title}
                <Caret style={{ rotate: open ? '' : '-90deg' }} />
            </button>
            {open && <div className="mobile-nav-dropdown">
                {item.dropdownLists.map((dropdownList, idx) => (
                    <ul className='mobile-nav-dropdown__list' key={idx}>
                        {dropdownList.title && <h4 className='mobile-nav-dropdown__list-title'>{dropdownList.title}</h4>}
                        {dropdownList.items.map((dropdownItem, idx) => (
                            <li className='mobile-nav-dropdown__item' key={idx}>
                                <Link onClick={() => {
                                    onNavLinkClick()
                                    onDropdownItemClick()
                                }} className='mobile-nav-dropdown__link' to={dropdownItem.href}>
                                    {dropdownItem.icon && typeof dropdownItem.icon === 'string' ? <img src={dropdownItem.icon} /> : dropdownItem.icon}
                                    {dropdownItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>}
        </li>
    )
}
