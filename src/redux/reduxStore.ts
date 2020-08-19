import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./ProfileReducer/profileReducer";
import dialogsReducer from "./DialogsReducer/dialogsReducer";
import sideBarReducer from "./SideBarReducer/sideBarReducer";
import usersReducer from "./UsersReducer/usersReducer";
import authReducer from "./AuthReducer/AuthReducer";
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

// @ts-ignore
window.store = store;