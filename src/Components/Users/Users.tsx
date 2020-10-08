import React from 'react';
import axios from 'axios'
import s from './Users.module.css';
import {UsersType} from "../../redux/UsersReducer/usersReducer";
import userPhoto from '../../assets/images/logo192.png'

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

const Users = (props: UsersPropsType) => {
    const getUsers = () => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response: any) => (
                props.setUsers(response.data.items)
            )
        )};
    }
    return (
        <div className={s.Users}>
            <button onClick={getUsers}>Get users</button>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="avatar" className={s.avatar}/>
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
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
        </div>
    )
}

export default Users;