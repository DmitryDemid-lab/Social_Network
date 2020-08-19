import {authApi} from "../../API/API";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHIND = 'TOGGLE_IS_FETCHIND';

export type serverDataType = {
    userId: number | null
    email: string
    login: string
}

export type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: serverDataType
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
                isAuth: true
            };
        }
        case TOGGLE_IS_FETCHIND: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (data: serverDataType): setUserDataACType => ({type: SET_USER_DATA, data})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACtype => ({
    type: TOGGLE_IS_FETCHIND,
    isFetching
})

export const getAuthUserData = () => {
    return (dispatch: any) => {
        dispatch (toggleIsFetching(true))
        authApi.getAuth().then(data => {
            dispatch (toggleIsFetching(false))
            if (data.resultCode === 0) {
                dispatch (setAuthUserData(data.data))
            }
        })
    }
}

export default authReducer;