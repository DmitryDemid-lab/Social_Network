import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import {GetProfileResponseType} from "../../API/API";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";
import {ProfilePhoto} from "./ProfilePhoto/ProfilePhoto";
import {Following} from "./Following/Following";

type ProfilePagePropsType = {
    profile: GetProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAvatar: (avatar: File) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
};

function Profile(props: ProfilePagePropsType) {
    return <div className={s.profile}>
        <div className={s.column1}>
            <div className={s.profilePhoto}>
                <ProfilePhoto profile={props.profile} isOwner={props.isOwner} saveAvatar={props.saveAvatar}/>
            </div>
            <div className={s.friends}>
                <Following/>
            </div>
        </div>
        <div className={s.column2}>
            <ProfileInfo
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
            saveProfile={props.saveProfile}

        />
            <MyPostsContainer/>
        </div>
    </div>
}

export default Profile;