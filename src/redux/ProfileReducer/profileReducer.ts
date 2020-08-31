import {postsType} from "../store";
import {GetProfileResponseType, profileAPI} from "../../API/API";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';


export type AddPostType = {
    type: typeof ADD_POST,
    newPostBody: string
}
export type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: any
}
export type SetUserStatusType = {
    type: typeof SET_USER_STATUS,
    status: string
}

export type ProfileActionsType =
    | AddPostType
    | SetUserProfileType
    | SetUserStatusType

export type initialStateType = {
    posts: Array<postsType>
    profile: GetProfileResponseType
    status: string
}

export let initialState = {
    posts: [
        {id: 1, message: "Hi, how are u?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ] as Array<postsType>,
    profile: {} as GetProfileResponseType ,
    status: '',
};

const profileReducer = (state = initialState, action: ProfileActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: postsType = {
                id: 3,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPost = (newPostBody: string): AddPostType => ({type: ADD_POST, newPostBody})

export const setUserProfile = (profile: GetProfileResponseType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status})

export const getProfile = (userID: string) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userID).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}
export const getStatus = (userID: string) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userID).then(data => {
            dispatch(setUserStatus(data))
        })
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: any) => {
        profileAPI.updateStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
    }
}

export default profileReducer;