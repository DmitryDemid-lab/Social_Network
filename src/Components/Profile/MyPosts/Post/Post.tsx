import React from 'react';
import s from './Post.module.css';

type postPropsType = {
    message: string,
    likesCount: number,
}

const Post = (props: postPropsType) => {
    return (
        <div className={s.item}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="avatar"/>
            {props.message}
            <div><span>Likes {props.likesCount} </span></div>
        </div>
    )
}

export default Post;