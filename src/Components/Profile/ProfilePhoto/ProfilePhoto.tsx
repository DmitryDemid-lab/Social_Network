import React, {ChangeEvent} from 'react';
import s from './ProfilePhoto.module.css';
import userAvatar from '../../../assets/images/UserAvatar.png'
import {GetProfileResponseType} from "../../../API/API";
import {Button} from "@material-ui/core";

export const ProfilePhoto = (props: ProfilePhotoPropsType) => {
    const onMainAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.saveAvatar(e.currentTarget.files[0])
        }
    }

    return <div className={s.ProfilePhoto}>
        <img src={props.profile.photos.large || userAvatar} className={s.mainAvatar}/>
        {props.isOwner && <Button variant="contained" component="label" size={"small"}> Upload new photo
            <input type="file" style={{display: "none"}} onChange={onMainAvatarSelected}/>
        </Button>}
    </div>
}

type ProfilePhotoPropsType = {
    profile: GetProfileResponseType
    isOwner: boolean
    saveAvatar: (avatar: File) => void
}