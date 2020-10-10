import React, {useEffect, useState} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import {GetProfileResponseType} from "../../API/API";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";
import {ProfilePhoto} from "./ProfilePhoto/ProfilePhoto";
import {Following} from "./Following/Following";
import {UsersType} from "../../redux/UsersReducer/usersReducer";

type ProfilePagePropsType = {
    profile: GetProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAvatar: (avatar: File) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
    friends: Array<UsersType>
    follow: (userID: number) => void
    unFollow: (userID: number) => void
};

export const Profile = React.memo((props: ProfilePagePropsType) => {
    const [isUserFollowed, setIsUserFollowed] = useState(false)

    const userPage = props.friends.find(f => f.name === props.profile.fullName)

    useEffect(() => {
        setIsUserFollowed(!!userPage)
    }, [userPage])

    return <div className={s.profile}>
        <div className={s.column1}>
            <div className={s.profilePhoto}>
                <ProfilePhoto
                    profile={props.profile}
                    isOwner={props.isOwner}
                    saveAvatar={props.saveAvatar}
                    isUserFollowed={isUserFollowed}
                    unFollow={props.unFollow}
                    follow={props.follow}
                    userId={props.profile.userId}
                />
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
})
