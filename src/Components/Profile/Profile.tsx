import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type postsType = {
    id: number,
    message: string,
    likesCount: number
};

type ProfilePageType = {
    posts: Array<postsType>,
};

function Profile (props: ProfilePageType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}

export default Profile;