import React from 'react';
import s from '../Dialogs.module.css';
import userAvatar from '../../../assets/images/UserAvatar.png'


type MessagePropsTypes = {
    message: string,
}
const Message = (props: MessagePropsTypes) => {
    return (
        <div className={s.messageEl}>
            <img className={s.messageAvatar} src={userAvatar} alt="avatarIcon"/>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}


export default Message;