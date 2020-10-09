import {authAPI, DataAuthResponseType, ResultCodeEnum, securityAPI} from "../../API/API";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reduxStore";
import {toggleIsFetching} from "../appReducer/appReducer";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

let initialState: authInitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

export const authReducer = (state: authInitialStateType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            };
        }
        case "auth/SET_CAPTCHA_URL":
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

//ACTIONS
export const setAuthUserData = (data: DataAuthResponseType): setUserDataACType => ({type: SET_USER_DATA, data})
export const setCaptchaUrl = (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl}) as const

//THUNKS
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const responseData = await authAPI.getAuth()
    if (responseData.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData({...responseData.data, isAuth: true}))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<void, AppStateType, any, UsersActionsType & any> =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await authAPI.logIn(email, password, rememberMe, captcha)
        dispatch(toggleIsFetching(false))
        if (responseData.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
        }
        else {
            if (responseData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            const message = responseData.messages.length > 0 ? responseData.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const responseData = await securityAPI.getCaptcha()
    dispatch(toggleIsFetching(false))
    const captchaUrl = responseData.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export const logout = (): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await authAPI.logOut()
        if (responseData.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserData({isAuth: false, email: '', id: null, login: ''}))
        }
        dispatch(toggleIsFetching(false))

    }

//TYPES
export type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: DataAuthResponseType
}
export type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export type authInitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
export type UsersActionsType =
    setUserDataACType
    | toggleIsFetchingACType
    | ReturnType<typeof setCaptchaUrl>

type ThunkType = ThunkAction<void, AppStateType, any, UsersActionsType & any>