import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/DialogsReducer/dialogsReducer";
import Dialogs from "../Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {DialogsPageType} from "../../../redux/store";
import withAuthRedirect from "../../../hoc/AuthRedirect";

type DialogsMapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}

type DialogsMapStateToPropsType = {
    dialogsPage: DialogsPageType
}

const mapStateToProps = (state: AppStateType): DialogsMapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
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

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;