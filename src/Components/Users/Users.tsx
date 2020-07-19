import React from 'react';
import s from './Users.module.css';
import {UsersType} from "../../redux/usersReducer";

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

const Users = (props: UsersPropsType) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                followed: false,
                fullName: "Dmitry",
                status: "I'm boss",
                location: {city: "Minsk", country: "Belarus"},
                photoUrl: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
            },
            {
                id: 2,
                followed: true,
                fullName: "Ivan",
                status: "I'm driver",
                location: {city: "Moscow", country: "Russia"},
                photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
            },
            {
                id: 3,
                followed: false,
                fullName: "Sasha",
                status: "I'm manager",
                location: {city: "kiev", country: "Ukraine"},
                photoUrl: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
            }
        ])
    }
    return (
        <div className={s.Users}>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} alt="avatar" className={s.avatar}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unFollow(u.id)
                            }}>UnFollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)}
        </div>
    )
}

export default Users;