import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {follow, getUsers, setCurrentPage, unFollow, UsersType} from "../../redux/UsersReducer/usersReducer";
import UsersFunc from "./UsersFunc";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/UsersReducer/usersSelectors";
import s from "./Users.module.css";

type UsersMapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type UsersAPIPropsType = UsersMapDispatchToPropsType &
    {
        users: Array<UsersType>
        pageSize: number
        totalUsersCount: number
        currentPage: number
        followingInProgress: Array<number>
    }

class UsersAPIContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <div className={s.UsersAPIContainer}>
            <UsersFunc {...this.props} onPageChange={this.onPageChange}/>
        </div>
    }
}

/*const MapStateToProps = (state: AppStateType): UsersStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};*/
const MapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

const UsersContainer = connect(MapStateToProps,
    {
        follow, setCurrentPage, getUsers, unFollow
    })(UsersAPIContainer);

export default UsersContainer;