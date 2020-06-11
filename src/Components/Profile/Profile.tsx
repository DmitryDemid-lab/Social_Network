import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfilePagePropsType = {
    profilePage: ProfilePageType,
    addPost: () => void,
    updateNewPostTex: (newText: string) => void,
};

function Profile (props: ProfilePagePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addPost={props.addPost}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostTex={props.updateNewPostTex}
            />
        </div>
    )
}

export default Profile;