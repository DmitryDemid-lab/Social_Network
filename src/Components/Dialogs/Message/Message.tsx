import React from 'react';
import s from '../Dialogs.module.css';


type MessagePropsTypes = {
    message: string,
}
const Message = (props: MessagePropsTypes) => {
    return (
        <div className={s.messageEl}>
            <img className={s.messageAvatar} src="https://i.ya-webdesign.com/images/avatar-png-1.png" alt="avatarIcon"/>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}


export default Message;