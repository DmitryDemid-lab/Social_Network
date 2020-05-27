import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={s.content}>
            <div><img src="https://cdn.downtoearth.org.in/library/large/2019-12-04/0.92334300_1575475699_17.jpg"
                      alt=""/></div>
            <div> avatar + description</div>
            <MyPosts/>
        </div>
    )
}

export default Profile;