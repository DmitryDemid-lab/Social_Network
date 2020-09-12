import {getAuthUserData} from "../AuthReducer/AuthReducer";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';

let initialState: AuthInitialStateType = {
    initialized: false
};

export const appReducer = (state: AuthInitialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

//ACTIONS
export const setInitializedSuccess = () => ({type: SET_INITIALIZED_SUCCESS} as const)

//THUNKS
export const initializeApp = () => (dispatch: any) => {
    dispatch(getAuthUserData())
        .then(() => {
            dispatch(setInitializedSuccess())
        })
}

//TYPES
export type AppActionsType = ReturnType<typeof setInitializedSuccess>
export type AuthInitialStateType = {
    initialized: boolean
}