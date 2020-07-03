import {postsType, ProfilePageType} from "./store";

export type AddPostActionCreatorType = {
    type: typeof ADD_POST,
}
export type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string,
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const addPostActionCreator = (): AddPostActionCreatorType => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are u?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ],
        newPostText: ""
};

const profileReducer = (state = initialState, action: any):ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: postsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.unshift(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;