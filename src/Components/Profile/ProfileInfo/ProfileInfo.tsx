import React from 'react';
import s from './ProfileInfo.module.css';


type ProfileInfoPropsTypes = {

}

const ProfileInfo = (props:ProfileInfoPropsTypes) => {
    return (
        <div>
            <div><img src="https://cdn.downtoearth.org.in/library/large/2019-12-04/0.92334300_1575475699_17.jpg"
                      alt=""/></div>
            <div className={s.descriptionBlock}> avatar + description</div>
        </div>
    )
}

export default ProfileInfo;