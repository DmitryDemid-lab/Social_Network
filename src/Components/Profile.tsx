import React from 'react';
import s from '../ComponentsStyles/Profile.module.css';

const Profile = () => {
    return (
        <div className={s.content}>
            <div><img src="https://cdn.downtoearth.org.in/library/large/2019-12-04/0.92334300_1575475699_17.jpg"
                      alt=""/></div>
            <div> avatar + description</div>
            <div>
                my posts:
                <div>
                    new post
                </div>
                <div className={s.posts}>
                    <div className={s.item}>
                        post1
                    </div>
                    <div className={s.item}>
                        post2
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;