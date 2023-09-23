import { useState } from "react"
import caret from '../../assets/caret.svg'
import { Link } from "react-router-dom"
import { Pfp } from "../Pfp"
import { useStore } from "../../stores/useStore"
import { useEditProductStore } from "../../stores/useEditProductStore"

export const Dropdown = ({ image, title, items, onItemClick }) => {
    const [open, setOpen] = useState(false)
    const { openModal } = useStore()
    const { editingProduct } = useEditProductStore()

    const dropdownLink = (item, idx) => {
        if (item.linkAndButton) {
            return <li key={idx} className={`sidebar__item ${item.desktopOnly ? 'desktop-only' : item.mobileOnly ? 'mobile-only' : ''}`}>
                <Link onClick={() => {
                    setOpen(false)
                    onItemClick()
                    item.onClick()
                }} to={item.href} className={`sidebar__link`}>{item.title}</Link>
            </li>
        } else if (item.link) {
            return <li key={idx} className={`sidebar__item ${item.desktopOnly ? 'desktop-only' : item.mobileOnly ? 'mobile-only' : ''}`}>
                <Link onClick={() => {
                    setOpen(false)
                    onItemClick()
                }} to={item.href} className={`sidebar__link`}>
                    {item.title}</Link>
            </li>

        } else {
            return <li key={idx} className={`sidebar__item ${item.desktopOnly ? 'desktop-only' : item.mobileOnly ? 'mobile-only' : ''}`}>
                <button className={`sidebar__link`}
                    onClick={() => {
                        setOpen(false)
                        onItemClick()
                        item.onClick()
                    }}>{item.title}</button>
            </li>
        }
    }

    return (
        <div tabIndex={0} onBlur={(e) => {
            if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                setOpen(false)
            }
        }} className='sidebar-dropdown'>
            <button aria-expanded={open} onClick={() => {
                if (editingProduct?.role !== 'Full Member') {
                    setOpen(open => !open)
                }
            }}
                className='sidebar-dropdown__toggle fw-500 fs-500'>{title}
                {editingProduct.role !== 'Full Member' && <img style={{ rotate: open ? '180deg' : "" }} src={caret} alt="" />}
            </button>
            <div className="sidebar-dropdown__content" data-visible={open}>
                <div className="flex">
                    <button className="pfp-button" onClick={() => openModal('uploadProductImage')}>
                        <Pfp name={title} img={`${image}`} size={'50px'} fontSize={'1.3rem'} />
                    </button>
                    <h4 className="sidebar-dropdown__pfp-name">{title}</h4>
                </div>
                <ul className="sidebar-dropdown__list">
                    {items.map((item, idx) => dropdownLink(item, idx))}
                </ul>

            </div>
        </div>
    )
}
