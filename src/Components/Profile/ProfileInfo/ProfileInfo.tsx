import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {profileInfoType} from "../../../redux/ProfileReducer/profileReducer";


type ProfileInfoPropsTypes = {
    profile: profileInfoType
}

const ProfileInfo = (props: ProfileInfoPropsTypes) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div><img src="https://cdn.downtoearth.org.in/library/large/2019-12-04/0.92334300_1575475699_17.jpg"
                      alt=""/></div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large}/>
                <div>ABOUT JOB <br/> Is looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'} <br/> Description: {props.profile.lookingForAJobDescription}</div><hr/>
                <div>ABOUT ME: {props.profile.aboutMe} <br/> Full name: {props.profile.fullName}</div>
            </div>
        </div>
    )

}

export default ProfileInfo;