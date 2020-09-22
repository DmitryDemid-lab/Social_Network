import {authAPI, DataAuthResponseType, ResultCodeEnum} from "../../API/API";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reduxStore";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING';

let initialState: authInitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

export const authReducer = (state: authInitialStateType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state;
    }
}

//ACTIONS
export const setAuthUserData = (data: DataAuthResponseType): setUserDataACType => ({type: SET_USER_DATA, data})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

//THUNKS
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const responseData = await authAPI.getAuth()
    dispatch(toggleIsFetching(false))
    if (responseData.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData({...responseData.data, isAuth: true}))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppStateType, any, UsersActionsType & any> =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await authAPI.logIn(email, password, rememberMe)
        dispatch(toggleIsFetching(false))
        if (responseData.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            const message = responseData.messages.length > 0 ? responseData.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const logout = (): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const responseData = await authAPI.logOut()
        dispatch(toggleIsFetching(true))
        if (responseData.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserData({isAuth: false, email: '', id: null, login: ''}))
        }

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
    isFetching?: boolean
    isAuth: boolean
}
export type UsersActionsType =
    setUserDataACType
    | toggleIsFetchingACType

type ThunkType = ThunkAction<void, AppStateType, any, UsersActionsType>