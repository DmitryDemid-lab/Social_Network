import React from "react";
import s from "./Users.module.css";
import {UsersType} from "../../redux/UsersReducer/usersReducer";
import {Paginator} from "./Paginator/Paginator";
import {User} from "./User/User";

type UsersFuncType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    followingInProgress: Array<number>
}

const UsersFunc = (props: UsersFuncType) => {

    return (
        <div className={s.Users}>
            <div className={s.paginator}>
                <Paginator totalItemsCount={props.totalUsersCount}
                           pageSize={props.pageSize}
                           onPageChange={props.onPageChange}
                           portionSize={10}
                />
            </div>
            <div className={s.usersBlock}>
                {props.users.map(u => <User key={u.id} userId={u.id} userPhotoSmall={u.photos.small} userName={u.name}
                                            userStatus={u.status} follow={props.follow} unFollow={props.unFollow}
                                            followingInProgress={props.followingInProgress}
                                            isUserFollowed={u.followed}/>)}
            </div>
        </div>
    )
}

export default UsersFunc;