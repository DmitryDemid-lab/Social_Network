import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";
import {Redirect} from 'react-router-dom';
import {AddMessageFormDataType, AddMessageFormRedux} from "./Message/AddMessageForm";
import {List, ListItem} from "@material-ui/core";


type DialogsPagePropsType = {
    dialogsPage: DialogsPageType,
    addMessage: (newMessageBody: string) => void,
    isAuth: boolean
};


function Dialogs(props: DialogsPagePropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <ListItem><DialogItem name={d.name} id={d.id} key={d.id}/></ListItem>)
    let messagesElements = props.dialogsPage.messages.map(m => <div className={s.messagesItem}><Message
        message={m.message} key={m.id}/></div>)

    let addNewMessage = (values: AddMessageFormDataType) => {
        props.addMessage(values.newMessageBody)
    };

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <List>{dialogsElements}</List>
            </div>
            <div>
                <div className={s.messages}>
                    {messagesElements}
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;