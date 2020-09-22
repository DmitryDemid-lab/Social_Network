import {authInitialStateType, authReducer, setAuthUserData} from "./AuthReducer";
import {DataAuthResponseType} from "../../API/API";

const initialState: authInitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

test('correct user data should be setted up', () => {
    const data: DataAuthResponseType = {
        id: 3,
        email: 'dmitry@gmail.com',
        login: 'dmitry007',
        isAuth: true,
    }

    const endState = authReducer(initialState, setAuthUserData(data))

    expect(endState.id).toBe(3);
    expect(endState.email).toBe('dmitry@gmail.com');
});