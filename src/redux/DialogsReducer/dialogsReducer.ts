import {DialogsPageType, messagesType} from "../store";

export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
}
export type updateNewMessageTextActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    newText: string,
}


export type DialogActionsType = AddMessageActionCreatorType | updateNewMessageTextActionCreatorType



const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


let initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Sasha"},
        {id: 3, name: "Hanna"},
        {id: 4, name: "Lesha"},
        {id: 5, name: "Anton"}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Check Info"},
        {id: 3, message: "How is your studying in REACT"},
        {id: 4, message: "Hey Yo"},
        {id: 5, message: "Good morning"}
    ],
    newMessageText: ""
};

const dialogsReducer = (state = initialState, action: DialogActionsType): DialogsPageType => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage: messagesType = {
                id: 6,
                message: state.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText
            }
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = (): AddMessageActionCreatorType => ({type: ADD_MESSAGE})

export const updateNewMessageTextActionCreator = (text: string): updateNewMessageTextActionCreatorType =>
    ({
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    })
export default dialogsReducer;