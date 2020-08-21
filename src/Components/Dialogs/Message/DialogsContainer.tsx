import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/DialogsReducer/dialogsReducer";
import Dialogs from "../Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {DialogsPageType} from "../../../redux/store";

type DialogsMapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}

type DialogsMapStateToPropsType = {
    dialogsPage: DialogsPageType
    isAuth: boolean
}


const mapStateToProps = (state: AppStateType): DialogsMapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: any): DialogsMapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        addMessage: () => {
           dispatch(addMessageActionCreator());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;