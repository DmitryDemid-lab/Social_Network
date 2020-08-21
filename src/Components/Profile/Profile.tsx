import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileInfoType} from "../../redux/ProfileReducer/profileReducer";
import {Redirect} from "react-router-dom";

type ProfilePagePropsType = {
    profile: profileInfoType
    isAuth: boolean
};

function Profile(props: ProfilePagePropsType) {
    if (props.isAuth == false) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;