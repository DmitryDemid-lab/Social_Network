import React from 'react';
import {addMessageActionCreator} from "../../redux/DialogsReducer/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {DialogsPageType} from "../../redux/store";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {compose} from 'redux';

type DialogsMapDispatchToPropsType = {
    addMessage: (newMessageBody: string) => void
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
        addMessage: (newMessageBody: string) => {
            dispatch(addMessageActionCreator(newMessageBody));
        }
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)