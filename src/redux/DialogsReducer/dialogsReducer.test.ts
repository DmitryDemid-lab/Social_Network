import {DialogsPageType} from "../store";
import dialogsReducer, {addMessageActionCreator, updateNewMessageTextActionCreator} from "./dialogsReducer";

test('correct message should be added', () => {
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
        newMessageText: ""
    };

    const action = addMessageActionCreator();

    const endState = dialogsReducer(initialState, action)

    expect(endState.messages.length).toBe(6);
    expect(endState.messages[5].id).toBe(6);
});

test('new message text should be updated', () => {
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
        newMessageText: ""
    };

    const action = updateNewMessageTextActionCreator('Dmitry is the best');

    const endState = dialogsReducer(initialState, action)

    expect(endState.newMessageText).toBe('Dmitry is the best');
});

test('correct message should be added with uodated text', () => {
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
        newMessageText: ""
    };

    const action1 = updateNewMessageTextActionCreator('Dmitry is the best');
    const action2 = addMessageActionCreator();
    const middleState = dialogsReducer(initialState, action1)
    const endState = dialogsReducer(middleState, action2)


    expect(middleState.newMessageText).toBe('Dmitry is the best');
    expect(endState.messages[5].message).toBe('Dmitry is the best')
    expect(endState.messages[5].id).toBe(6)
});