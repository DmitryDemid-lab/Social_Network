import {postsType, ProfilePageType} from "../store";
import {profileAPI} from "../../API/API";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


export type AddPostType = {
    type: typeof ADD_POST,
}
export type UpdateNewPostTextType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string,
}
export type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: any
}

export type ProfileActionsType = AddPostType | UpdateNewPostTextType | setUserProfileType;

type profileInfoContactsType = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
}

export type profileInfoPhotosType = {
    small?: string
    large?: string
}

export type profileInfoType = {
    userId?: number
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: profileInfoContactsType
    photos?: profileInfoPhotosType
}

export type initialStateType = {
    posts: Array<postsType>
    newPostText: string
    profile: profileInfoType
}

export let initialState: initialStateType = {
    posts: [
        {id: 1, message: "Hi, how are u?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ],
    newPostText: "",
    profile: {},
};

const profileReducer = (state = initialState, action: ProfileActionsType)  => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: postsType = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

export const addPost = (): AddPostType => ({type: ADD_POST})
export const updateNewPostText = (text: string): UpdateNewPostTextType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export const setUserProfile = (profile: profileInfoType): setUserProfileType => ({type: SET_USER_PROFILE, profile})

export const getProfile = (userID: string) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userID).then(data => {
            dispatch (setUserProfile(data))
        })
    }
}

export default profileReducer;