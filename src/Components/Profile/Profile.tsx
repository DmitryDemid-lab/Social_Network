import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

import {GetProfileResponseType} from "../../API/API";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";

type ProfilePagePropsType = {
    profile: GetProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAvatar: (avatar: File) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
};

function Profile(props: ProfilePagePropsType) {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                saveAvatar={props.saveAvatar}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;