import {GetProfileResponseType, profileAPI, ProfilePhotosType} from "../../API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reduxStore";
import {stopSubmit} from "redux-form";
import {toggleIsFetching} from "../appReducer/appReducer";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const SET_IS_FOLLOWING = 'profile/SET_IS_FOLLOWING';

export let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how are u?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ] as Array<PostsType>,
    profile: {
        contacts: {},
        photos: {}
    } as GetProfileResponseType,
    status: '',
    isFollowing: false
};

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case "profile/SET_IS_FOLLOWING":
            return {
                ...state,
                isFollowing: action.isFollowing
            }

        default:
            return state;
    }
}

//ACTIONS
export const addPost = (newPostBody: string): AddPostType => ({type: ADD_POST, newPostBody})
export const setUserProfile = (profile: GetProfileResponseType): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    profile
})
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status})
export const savePhotoSuccess = (photos: ProfilePhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos}) as const
export const setIsFollowing = (isFollowing: boolean) => ({type: SET_IS_FOLLOWING, isFollowing}) as const

//THUNKS
export const getProfile = (userID: string): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await profileAPI.getProfile(userID)
        dispatch(toggleIsFetching(false))
        dispatch(setUserProfile(responseData))
    }

export const getStatus = (userID: string): ThunkType =>
    async (dispatch) => {
        const responseData = await profileAPI.getStatus(userID)
        dispatch(setUserStatus(responseData))
    }

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await profileAPI.updateStatus(status)
        if (responseData.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
        dispatch(toggleIsFetching(false))
    }

export const saveAvatar = (avatar: File): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await profileAPI.saveAvatar(avatar)
        if (responseData.resultCode === 0) {
            dispatch(savePhotoSuccess(responseData.data.photos))
        }
        dispatch(toggleIsFetching(false))
    }

export const saveProfile = (profile: GetProfileResponseType): ThunkType =>
    async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        const userId = getState().auth.id?.toString()
        if (userId) {
            const responseData = await profileAPI.saveProfile(profile)
            if (responseData.resultCode === 0) {
                dispatch(getProfile(userId))
            } else {
                const message = responseData.messages.length > 0 ? responseData.messages[0] : 'Some error'
                // @ts-ignore
                dispatch(stopSubmit('editProfile', {_error: message}))
                return Promise.reject(responseData.messages[0])
            }
            dispatch(toggleIsFetching(false))
        }
    }


export default profileReducer;

//TYPES
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
export type PostsType = {
    id: number,
    message: string,
    likesCount: number
};
export type InitialStateType = {
    posts: Array<PostsType>
    profile: GetProfileResponseType
    status: string
    isFollowing: boolean
}
export type ProfileActionsType =
    | AddPostType
    | SetUserProfileType
    | SetUserStatusType
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof setIsFollowing>

type ThunkType = ThunkAction<void, AppStateType, any, ProfileActionsType & any>