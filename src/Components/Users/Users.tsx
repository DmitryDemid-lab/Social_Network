import React from 'react';
import s from './Users.module.css';
import {UsersType} from "../../redux/usersReducer";

type UsersPropsType = {
    users: Array<UsersType>
}

const Users = (props: UsersPropsType) => {
    return (
        <div className={s.Users}>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} alt="avatar" className={s.avatar}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {}}>UnFollow</button>
                            : <button onClick={() => {}}>Follow</button>}
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