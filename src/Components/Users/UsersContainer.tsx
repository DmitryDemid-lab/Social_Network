import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unFollow,
    UsersStateType,
    UsersType
} from "../../redux/UsersReducer/usersReducer";
import UsersFunc from "./UsersFunc";
import Preloader from "../common/preloader/Preloader";
import {usersAPI} from "../../API/API";

type UsersMapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userID: number) => void
}

type UsersAPIPropsType = UsersMapDispatchToPropsType &
    {
        users: Array<UsersType>
        pageSize: number
        totalUsersCount: number
        currentPage: number
        isFetching: boolean
        followingInProgress: Array<number>
    }

class UsersAPIContainer extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        })
    }

    onPageChange = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)

        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <UsersFunc {...this.props} onPageChange={this.onPageChange}/>
        </>
    }
}

const MapStateToProps = (state: AppStateType): UsersStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

const UsersContainer = connect(MapStateToProps,
    {follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgress})(UsersAPIContainer);

export default UsersContainer;