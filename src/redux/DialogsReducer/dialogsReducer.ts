import {DialogsPageType, messagesType} from "../store";

const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';

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
};

const dialogsReducer = (state = initialState, action: DialogActionsType): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage: messagesType = {
                id: 6,
                message: action.newMessageBody
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageBody: string): AddMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageBody})

export default dialogsReducer;

//TYPES
export type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    newMessageBody: string
}
export type DialogActionsType = AddMessageActionCreatorType
