import {createStore, combineReducers} from "redux";
import profileReducer from "./ProfileReducer/profileReducer";
import dialogsReducer from "./DialogsReducer/dialogsReducer";
import sideBarReducer from "./SideBarReducer/sideBarReducer";
import usersReducer from "./UsersReducer/usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>


let store = createStore(reducers);

export default store;