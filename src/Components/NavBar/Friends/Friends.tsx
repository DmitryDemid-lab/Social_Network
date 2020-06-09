import React from 'react';
import s from './Friends.module.css';



type FriendsArrType = {
    name: string,
    url: string
}

function Friends(props: FriendsArrType) {
    return (
        <div className={s.friend}>
            <span>{props.name}</span>
            <img className={s.avatar} src={props.url} alt="avatar"/>
        </div>
    )
}

export default Friends;

