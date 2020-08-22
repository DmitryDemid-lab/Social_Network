import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {GetProfileResponseType} from "../../../API/API";


type ProfileInfoPropsTypes = {
    profile: GetProfileResponseType
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
                <div>ABOUT ME: <br/> Full name: {props.profile.fullName}</div>
                <hr/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )

}

export default ProfileInfo;