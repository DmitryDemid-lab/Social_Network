import {DialogsPageType} from "../store";
import dialogsReducer, {addMessageActionCreator} from "./dialogsReducer";

const initialState: DialogsPageType = {
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

test('correct message should be added', () => {
    const action = addMessageActionCreator("hey, how are you?");

    const endState = dialogsReducer(initialState, action)

    expect(endState.messages.length).toBe(6);
    expect(endState.messages[5].id).toBe(6);
    expect(endState.messages[5].message).toBe('hey, how are you?');
});