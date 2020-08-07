import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
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
}

type UsersAPIPropsType = UsersMapDispatchToPropsType &
    {
        users: Array<UsersType>
        pageSize: number
        totalUsersCount: number
        currentPage: number
        isFetching: boolean
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
            <UsersFunc
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                onPageChange={this.onPageChange}
            />
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
    };
};

const UsersContainer = connect(MapStateToProps,
    {follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching,})(UsersAPIContainer);

export default UsersContainer;