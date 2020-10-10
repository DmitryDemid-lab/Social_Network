import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfilePhoto.module.css';
import userAvatar from '../../../assets/images/UserAvatar.png'
import {GetProfileResponseType} from "../../../API/API";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setIsFollowing} from "../../../redux/ProfileReducer/profileReducer";

export const ProfilePhoto = (props: ProfilePhotoPropsType) => {
   const [isFollowingLocal, setIsFollowingLocal] = useState(false)
    const onMainAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.saveAvatar(e.currentTarget.files[0])
        }
    }

    useEffect(()=>{
        setIsFollowingLocal(props.isUserFollowed)
    },[props.isUserFollowed])

    const onFollowClickHandler = () => {
        props.follow(props.userId)
        setIsFollowingLocal(true)
    }
    const onUnFollowClickHandler = () => {
        props.unFollow(props.userId)
        setIsFollowingLocal(false)
    }

    return <div className={s.ProfilePhoto}>
        <img src={props.profile.photos.large || userAvatar} className={s.mainAvatar}/>
        {
            props.isOwner
                ? <Button variant="contained" component="label" size={"small"}> Upload new photo
                    <input type="file" style={{display: "none"}} onChange={onMainAvatarSelected}/></Button>
                : (isFollowingLocal
                    ? <Button variant="contained" size={"small"} onClick={onUnFollowClickHandler}>unfollow</Button>
                    : <Button variant="contained" size={"small"} onClick={onFollowClickHandler}>follow</Button>
                )
        }
    </div>
}

type ProfilePhotoPropsType = {
    profile: GetProfileResponseType
    isOwner: boolean
    saveAvatar: (avatar: File) => void
    isUserFollowed: boolean
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    userId: number
}