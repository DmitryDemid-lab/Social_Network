import {getAuthUserData} from "../AuthReducer/AuthReducer";

const SET_INITIALIZED_SUCCESS = 'app/SET_INITIALIZED_SUCCESS';
const SET_ERROR = 'app/SET_ERROR';
const TOGGLE_IS_FETCHING = 'app/TOGGLE_IS_FETCHING';

let initialState: AuthInitialStateType = {
    initialized: false,
    error: null,
    isFetching: false,
};

export const appReducer = (state: AuthInitialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

//ACTIONS
export const setInitializedSuccess = () => ({type: SET_INITIALIZED_SUCCESS} as const)
export const setError = (error: string | null) => ({type: SET_ERROR, error} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)

//THUNKS
export const initializeApp = () => (dispatch: any) => {
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(setInitializedSuccess())
            dispatch(toggleIsFetching(false))
        })
}
export const handleError = (error: string | null) => (dispatch: any) => {
    dispatch(setError(error))
}
//TYPES
export type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export type AppActionsType =
    | ReturnType<typeof setInitializedSuccess>
    | ReturnType<typeof setError>
    | ToggleIsFetchingType

export type AuthInitialStateType = {
    initialized: boolean
    error: string | null
    isFetching: boolean
}