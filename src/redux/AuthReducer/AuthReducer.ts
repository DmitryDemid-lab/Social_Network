import {authAPI, DataAuthResponseType, ResultCodeEnum} from "../../API/API";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reduxStore";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHIND = 'TOGGLE_IS_FETCHIND';

let initialState: authInitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state: authInitialStateType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            };
        }
        case TOGGLE_IS_FETCHIND: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (data: DataAuthResponseType): setUserDataACType => ({type: SET_USER_DATA, data})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => ({
    type: TOGGLE_IS_FETCHIND,
    isFetching
})

export const getAuthUserData = (): ThunkType => (dispatch) => {
    dispatch(toggleIsFetching(true))
    return authAPI.getAuth().then(data => {
        dispatch(toggleIsFetching(false))
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserData({...data.data, isAuth: true}))
        }
    })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppStateType, any, UsersActionsType & any> => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        authAPI.logIn(email, password, rememberMe)
            .then(data => {
                    dispatch(toggleIsFetching(false))
                    if (data.resultCode === ResultCodeEnum.Success) {
                        dispatch(getAuthUserData())
                    } else {
                        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                        dispatch(stopSubmit('login', {_error: message}))
                    }
                }
            )
    }
}

export const logout = (): ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        authAPI.logOut().then(data => {
                dispatch(toggleIsFetching(true))
                if (data.resultCode === ResultCodeEnum.Success) {
                    dispatch(setAuthUserData({isAuth: false, email: '', id: null, login: ''}))
                }
            }
        )
    }
}

export default authReducer;

//TYPES
export type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: DataAuthResponseType
}
export type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHIND,
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