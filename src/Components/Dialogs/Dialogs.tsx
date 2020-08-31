import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";
import {Redirect} from 'react-router-dom';
import {AddMessageFormDataType, AddMessageFormRedux} from "./Message/AddMessageForm";


type DialogsPagePropsType = {
    dialogsPage: DialogsPageType,
    addMessage: (newMessageBody: string) => void,
    isAuth: boolean
};


function Dialogs(props: DialogsPagePropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values: AddMessageFormDataType) => {
        props.addMessage(values.newMessageBody)
    };

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;