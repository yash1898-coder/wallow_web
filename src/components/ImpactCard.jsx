import message from '../assets/message.png'
import { useStore } from '../stores/useStore'

export const ImpactCard = ({ item, reply = true }) => {
    const { openModal } = useStore()

    return (
        <div className={`impact-card`}>
            <div className="impact-card__content container flow">
                <div className="flex justify-between">
                    <p>{item.feedback}</p>
                    <button className="button--icon button-reset"
                        onClick={() => openModal('thread')}
                    ><img src={message} alt="message icon" /></button>
                </div>
                <div className="flex flex-wrap">
                    <div className={"impact-card__pfps flex"}>
                        {item.teamMembers.map((member, idx) => (
                            <img className={'impact-card__pfp'} key={idx} src={member} />
                        ))}
                    </div>
                    <p>{item.teamFeedback}</p>
                </div>
                {reply &&
                    <button onClick={() => {
                        // openModal('thread')
                        // setFeedbackItem(item)
                    }} className="text-purple-700 fw-500 button-reset underline-hover">{item.replies.length} {" "}
                        {item.replies.length === 1 ? 'reply' : "replies"}</button>
                }
            </div>
        </div>
    )
}
