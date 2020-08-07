const SET_USER_DATA = 'SET_USER_DATA';
const UNFOLLOW = 'UNFOLLOW';
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
export type UnFollowACType = {
    type: typeof UNFOLLOW,
    userID: number
}

export type toggleIsFetchingACtype = {
    type: typeof TOGGLE_IS_FETCHIND,
    isFetching: boolean
}

export type UsersActionsType =
    setUserDataACType
    | UnFollowACType
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
        case UNFOLLOW: {
            return {...state};
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
export const unFollow = (userID: number): UnFollowACType => ({type: UNFOLLOW, userID})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACtype => ({
    type: TOGGLE_IS_FETCHIND,
    isFetching
})

export default authReducer;