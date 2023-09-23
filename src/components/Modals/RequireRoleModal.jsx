import { useStore } from '../../stores/useStore'
import { ModalHeader } from './ModalHeader'
import { Link } from 'react-router-dom'

export const RequireRoleModal = ({ backUrl = '/organization/members' }) => {
    const { closeModal } = useStore()

    return (
        <dialog open className='modal modal--form'>
            <ModalHeader title={`Access restricted`} modal={'requireRole'} />
            <div className='modal__content'>
                <p>You are not allowed to enter this page.</p>
            </div>
            <div className="modal__footer">
                <Link onClick={() => closeModal('requireRole')}
                    to={backUrl}
                    className="button button--inverted">Go back</Link>
            </div>
        </dialog>
    )
}
