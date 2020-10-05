import {getAuthUserData} from "../AuthReducer/AuthReducer";

const SET_INITIALIZED_SUCCESS = 'app/SET_INITIALIZED_SUCCESS';
const SET_ERROR = 'app/SET_ERROR';

let initialState: AuthInitialStateType = {
    initialized: false,
    error: null
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
            }
        default:
            return state;
    }
}

//ACTIONS
export const setInitializedSuccess = () => ({type: SET_INITIALIZED_SUCCESS} as const)
export const setError = (error: string | null) => ({type: SET_ERROR, error} as const)

//THUNKS
export const initializeApp = () => (dispatch: any) =>
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(setInitializedSuccess())
        })
export const handleError = (error: string | null) => (dispatch: any) => {
    dispatch(setError(error))
}
//TYPES
export type AppActionsType =
    | ReturnType<typeof setInitializedSuccess>
    | ReturnType<typeof setError>

export type AuthInitialStateType = {
    initialized: boolean
    error: string | null
}