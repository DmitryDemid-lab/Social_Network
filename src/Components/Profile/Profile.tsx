import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileInfoType} from "../../redux/ProfileReducer/profileReducer";

type ProfilePagePropsType = {
    profile: profileInfoType
    status: string
    updateStatus: (status: string) => void
};

function Profile(props: ProfilePagePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;