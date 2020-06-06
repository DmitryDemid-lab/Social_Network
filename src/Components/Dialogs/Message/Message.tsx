import React from 'react';
import s from '../Dialogs.module.css';


type MessagePropsTypes = {
    message: string,
}
const Message = (props: MessagePropsTypes) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


export default Message;