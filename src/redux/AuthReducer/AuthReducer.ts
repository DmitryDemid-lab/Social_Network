import {authAPI, DataAuthResponseType} from "../../API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHIND = 'TOGGLE_IS_FETCHIND';

export type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: DataAuthResponseType
}

export type toggleIsFetchingACtype = {
    type: typeof TOGGLE_IS_FETCHIND,
    isFetching: boolean
}

export type UsersActionsType =
    setUserDataACType
    | toggleIsFetchingACtype

export type authInitialStateType = {
    id: number | null
    email: string
    login: string
    isFetching?: boolean
    isAuth: boolean
}

let initialState: authInitialStateType = {
    id: null,
    email: '',
    login: '',
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
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACtype => ({
    type: TOGGLE_IS_FETCHIND,
    isFetching
})

export const getAuthUserData = () => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        authAPI.getAuth().then(data => {
            dispatch(toggleIsFetching(false))
            if (data.resultCode === 0) {
                dispatch(setAuthUserData({...data.data, isAuth: true}))
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        authAPI.logIn(email, password, rememberMe)
            .then(data => {
                    dispatch(toggleIsFetching(false))
                    if (data.resultCode === 0) {
                        dispatch(getAuthUserData())
                    } else {
                        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                        dispatch(stopSubmit('login', {_error: message}))
                    }
                }
            )
    }
}

export const logout = () => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        authAPI.logOut().then(data => {
                dispatch(toggleIsFetching(true))
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData({isAuth: false, email: '', id: null, login: ''}))
                }
            }
        )
    }
}

export default authReducer;