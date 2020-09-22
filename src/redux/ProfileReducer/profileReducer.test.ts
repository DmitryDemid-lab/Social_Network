import profileReducer, {addPost, InitialStateType, setUserProfile, setUserStatus} from "./profileReducer";
import {GetProfileResponseType} from "../../API/API";

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how are u?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ],
    profile: {} as GetProfileResponseType,
    status: 'hey'
};

test('correct post should be added', () => {

    const action = addPost('Hello');

    const endState = profileReducer(initialState, action)

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[0].id).toBe(3);
});

test('correct status should be added with correct text', () => {

    const endState = profileReducer(initialState, setUserStatus("I'm the best"))

    expect(endState.status).toBe("I'm the best");
});

test('correct profile should be setted up', () => {

    const profile = {
        userId: 3,
        lookingForAJob: false,
        lookingForAJobDescription: 'in search',
        fullName: 'Dmitry',
        contacts: {},
        photos: {
            small: 'string',
            large: 'string'
        },
    }

    const endState = profileReducer(initialState, setUserProfile(profile))

    expect(endState.profile.fullName).toBe("Dmitry");
});