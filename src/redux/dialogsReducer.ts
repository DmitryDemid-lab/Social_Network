import {DialogsPageType} from "./store";

export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
}
export type updateNewMessageTextActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    newText: string,
}

export const addMessageActionCreator = (): AddMessageActionCreatorType => ({type: ADD_MESSAGE})
export const updateNewMessageTextActionCreator = (text: string): updateNewMessageTextActionCreatorType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
})

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state: DialogsPageType, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            state.messages.push(newMessage);
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;