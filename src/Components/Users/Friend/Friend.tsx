import React from 'react';
import s from './Friend.module.css';
import {NavLink} from "react-router-dom";
import userAvatar from "../../../assets/images/UserAvatar.png";

export const Friend = (props: FriendPropsType) => {
    return <div className={s.Friend}>
        <div>
            <NavLink to={'/profile/' + props.userId}>
                <img src={props.userPhotoSmall !== null ? props.userPhotoSmall : userAvatar}
                     alt="avatar"
                     className={s.avatar}/>
            </NavLink>
        </div>
        <div>
            <span>{props.userName}</span>
        </div>
    </div>
}

type FriendPropsType = {
    userId: number
    userPhotoSmall: string
    userName: string
}