import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";



type DialogsPagePropsType = {
    dialogsPage: DialogsPageType,
    /*addMessage: () => void,
    updateNewMessageText: (newText: string) => void*/
    dispatch: any
};


function Dialogs(props: DialogsPagePropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>)

    function sendMessage() {
        props.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                          onChange={onMessageChange}
                          value={props.dialogsPage.newMessageText}
                          placeholder={"Enter your message"}
                />
                <button onClick={sendMessage}>send</button>
            </div>

        </div>
    )
}

export default Dialogs;