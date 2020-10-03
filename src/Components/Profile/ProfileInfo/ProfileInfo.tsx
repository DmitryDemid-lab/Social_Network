import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {GetProfileResponseType} from "../../../API/API";
import {ProfileStatusHooks} from "./ProfileStatus/ProfileStatusHooks";
import userAvatar from '../../../assets/images/UserAvatar.png'

const ProfileInfo = (props: ProfileInfoPropsTypes) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.saveAvatar (e.currentTarget.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large || userAvatar} className={s.mainAvatar}/>
                {props.isOwner && <input type={"file"} onChange={onMainAvatarSelected}/>}
                <div>ABOUT JOB <br/> Is looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'} <br/> Description: {props.profile.lookingForAJobDescription}</div><hr/>
                <div>ABOUT ME: <br/> Full name: {props.profile.fullName}</div>
                <hr/>
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )

}

export default ProfileInfo;

type ProfileInfoPropsTypes = {
    profile: GetProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAvatar: (avatar: File) => void
}