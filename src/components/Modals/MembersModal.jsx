import { useState } from 'react'
import { ModalHeader } from './ModalHeader'
import { useSearch } from '../../hooks/useSearch'
import { SearchInput } from '../SearchInput'
import { Pfp } from '../Pfp'
import { useStore } from '../../stores/useStore'
import { capitalize } from '../../utils'
import { ErrorMessage } from '../ErrorMessage'
import { Spinner } from '../Spinner'
import { useAuthStore } from '../../stores/useAuthStore'
import { useIsEmail } from '../../hooks/useIsEmail'
import { ReactComponent as Send } from '../../assets/send.svg'
import { useSendInviteStore } from '../../stores/useSendInviteStore'

export const MembersModal = ({ isLoading, teamManager = false, canDelete = true, error, onDelete, sendInviteModal, members, name = 'Loading...' }) => {
    const { user } = useAuthStore()
    const { openModal } = useStore()
    const { setValue } = useSendInviteStore()

    const [clickedRemoveButton, setClickedRemoveButton] = useState(undefined)
    const [q, setQ] = useState('')
    const search = useSearch(q, ['first_name', 'email', 'last_name'])

    const { isNotFullEmail, isEmail } = useIsEmail(q, members)

    console.log("get Image>>>",members)

    const content = () => {
        if (isEmail) {
            return <button className='flex mt button-reset link purple'
                onClick={() => {
                    setValue(q)
                    openModal(sendInviteModal)
                }}
                style={{ '--margin': '.75rem', '--_gap': '1rem' }}><Send />Invite {q}</button>
        } else if (isNotFullEmail) {
            return <p className='flex mt' style={{ '--margin': '.75rem' }}>
                <Send style={{ currentColor: 'red' }} />Keep typing a full email</p>
        } else {
            return isLoading ? <Spinner style={{ marginTop: '4rem' }} /> : error ? <ErrorMessage message={error.message} /> :
                <ul className='flow mt ' style={{ '--margin': '.8rem' }}>
                    {search(members).length === 0 ? <p>Nothing found.</p> : search(members).map((m, idx) => (
                        <li className='flex justify-between' key={idx}>
                            <div className='flex'>
                                <Pfp size="35px" fontSize="1.2rem"
                                    key={idx} name={m.first_name} img={m.profile_image} />
                                {m.first_name} {m.last_name} {m.id === user.id && teamManager ? '(Team Manager)' : m.id === user.id ? '(You)' : ''}
                            </div>
                            {(m.id !== user.id && canDelete) && <button
                                disabled={isLoading && m.id === clickedRemoveButton}
                                onClick={() => {
                                    onDelete(m.id)
                                    setClickedRemoveButton(m.id)
                                }}
                                className="button-reset button-hover-underline text-purple-700 ">
                                {isLoading && m.id === clickedRemoveButton && <Spinner size='12px' color='var(--clr-purple-700)' />}
                                Remove</button>}
                        </li>
                    ))}
                </ul>
        }
    }

    return (
        <dialog open className='modal modal--form modal--invite'>
            <ModalHeader title={`${capitalize(name)} members`} modal={'members'} />
            <div className="modal__content modal__content--even-cols">
                <SearchInput value={q}
                    placeholder={'Find members'}
                    onChange={e => setQ(e.target.value)} />
            </div>
            {content()}
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer" style={{ justifyContent: 'flex-end' }}>
                <button className="button-reset text-purple-700 "
                    onClick={() => openModal('addPeople')}
                >Add people</button>
            </div>
        </dialog>
    )
}
