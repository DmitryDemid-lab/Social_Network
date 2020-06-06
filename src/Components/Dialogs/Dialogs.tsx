import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";

type dialogsType = {
    id: number,
    name: string,
};
type messagesType = {
    id: number,
    message: string,
};

type DialogsPageType = {
    dialogs: Array<dialogsType>,
    messages: Array<messagesType>
};




function Dialogs(props:DialogsPageType) {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;