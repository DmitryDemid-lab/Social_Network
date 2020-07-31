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
import axios from "axios";
import UsersFunc from "./UsersFunc";
import Preloader from "../common/preloader/Preloader";

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

class UsersAPI extends React.Component<UsersAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response: any) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then((response: any) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
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

/*const MapDispatchToProps = (dispatch: any): UsersMapDispatchToPropsType => {
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
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    };
};*/

const UsersContainer = connect(MapStateToProps,
    {follow, unFollow,setUsers,setCurrentPage,setTotalUsersCount,toggleIsFetching,})(UsersAPI);

export default UsersContainer;