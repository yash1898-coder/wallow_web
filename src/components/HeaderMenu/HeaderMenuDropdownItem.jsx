import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import caret from '../../assets/caret.svg'

export const HeaderMenuDropdownItem = ({ title, items, onItemClick }) => {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    return (
        <li className='sidebar__item sidebar__item--dropdown'>
            <button className={`header-menu__link`} style={{ gap: '.5rem' }}
                onClick={() => setOpen(open => !open)}>
                <img style={{ rotate: open ? '0deg' : '-90deg' }} src={caret} alt="caret" />
                {title}</button>
            <AnimatePresence>
                {open && <motion.ul style={{ overflow: 'hidden' }} initial={{ height: '0' }}
                    animate={{ height: 'auto' }} exit={{ height: '0' }}
                    className='sidebar__list sidebar__list--dropdown'>
                    {items.map(item => <li className={`sidebar__item`}
                        key={item.title}>
                        <Link to={item.href} onClick={() => {
                            onItemClick()
                            setOpen(false)
                        }} className={`sidebar__link`} aria-current={item.href === pathname ? 'page' : ''}>
                            {item.title}
                        </Link>
                    </li>)}
                </motion.ul>}
            </AnimatePresence>
        </li>
    )
}
