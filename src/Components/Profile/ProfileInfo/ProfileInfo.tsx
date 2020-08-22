import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {profileInfoType} from "../../../redux/ProfileReducer/profileReducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";


type ProfileInfoPropsTypes = {
    profile: profileInfoType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsTypes) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large}/>
                <div>ABOUT JOB <br/> Is looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'} <br/> Description: {props.profile.lookingForAJobDescription}</div><hr/>
                <div>ABOUT ME: {props.profile.aboutMe} <br/> Full name: {props.profile.fullName}</div>
                <hr/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )

}

export default ProfileInfo;