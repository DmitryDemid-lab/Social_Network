import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/state";



type DialogsPagePropsType = {
    dialogsPage: DialogsPageType,
    addMessage: () => void,
    updateNewMessageText: (newText: string) => void
};


function Dialogs(props: DialogsPagePropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    function sendMessage() {
        props.addMessage();
    };

    let onMessageChange = () => {
        let text = newMessageElement.current!.value;
        props.updateNewMessageText(text);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea ref={newMessageElement}
                          onChange={onMessageChange}
                          value={props.dialogsPage.newMessageText}
                />
                <button onClick={sendMessage}>send</button>
            </div>

        </div>
    )
}

export default Dialogs;