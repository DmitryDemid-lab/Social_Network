import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/dialogsReducer";
import Dialogs from "../Dialogs";
import StoreContext from "../../../StoreContext";


type DialogsPagePropsType = {};


function DialogsContainer(props: DialogsPagePropsType) {

    /*let state = props.store.getState().dialogsPage;

    function sendMessage() {
        props.store.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (text: string) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };*/

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().dialogsPage;

                    function sendMessage() {
                        store.dispatch(addMessageActionCreator());
                    };

                    let onMessageChange = (text: string) => {
                        store.dispatch(updateNewMessageTextActionCreator(text));
                    };
                    return (
                        <Dialogs updateNewMessageText={onMessageChange}
                                 addMessage={sendMessage}
                                 dialogsPage={state}/>)
                }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;