import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileInfoType} from "../../redux/ProfileReducer/profileReducer";

type ProfilePagePropsType = {
    profile: profileInfoType
};

function Profile(props: ProfilePagePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;