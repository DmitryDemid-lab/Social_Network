import React from 'react';
import s from './Post.module.css';
import userAvatar from '../../../../assets/images/UserAvatar.png'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Button} from "@material-ui/core";

type postPropsType = {
    message: string,
    likesCount: number,
    photo: string
}

const Post = (props: postPropsType) => {
    return (
        <div className={s.item}>
            <img src={props.photo || userAvatar} alt="avatar" className={s.postPhoto}/>
            <div className={s.postData}>
                <span>{props.message}</span>
                <div className={s.postLikes}><Button><FavoriteIcon color={"secondary"}/></Button> - {props.likesCount} </div>
            </div>
        </div>
    )
}

export default Post;