import { ReactComponent as Close } from '../../assets/close.svg'
import { useStore } from '../../stores/useStore'

export const ModalHeader = ({ icon = false, modal, title }) => {
    const { closeModal } = useStore()

    return (
        <header className="modal__header">
            <div className="flex">
                {icon}
                <h2 className='modal__title fs-600 fw-600'>{title}</h2>
            </div>
            <button onClick={() => closeModal(modal)} className='modal__close-button'>
                <Close />
                <span className="sr-only">Close modal</span>
            </button>
        </header>
    )
}
