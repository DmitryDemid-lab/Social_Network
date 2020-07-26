import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../redux/reduxStore";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../redux/UsersReducer/usersReducer";

type UsersMapStateToPropsType = {
    users: Array<UsersType>
}

type UsersMapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

const MapStateToProps = (state: AppStateType): UsersMapStateToPropsType => {
    return {
        users: state.usersPage.users
    };
};

const MapDispatchToProps = (dispatch: any): UsersMapDispatchToPropsType => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID));
        },
        unFollow: (userID: number) => {
            dispatch(unFollowAC(userID));
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users));
        },

    };
};


const UsersContainer = connect(MapStateToProps, MapDispatchToProps)(Users);

export default UsersContainer;