import {postsType, RootStateType} from "./state";

export type AddPostActionCreatorType = {
    type: typeof ADD_POST,
}
export type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string,
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const addPostActionCreator = ():AddPostActionCreatorType => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text: string):UpdateNewPostTextActionCreatorType => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

const profileReducer = (state: RootStateType, action: any) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: postsType = {
                id: 5,
                message: state.profilePage.newPostText,
                likesCount: 0
            };
            state.profilePage.posts.unshift(newPost);
            state.profilePage.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.profilePage.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;