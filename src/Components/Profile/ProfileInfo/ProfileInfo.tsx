import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {ContactsType, GetProfileResponseType} from "../../../API/API";
import {ProfileStatusHooks} from "./ProfileStatus/ProfileStatusHooks";
import userAvatar from '../../../assets/images/UserAvatar.png'
import {ProfileDataFormRedux, ProfileDataFormType} from "./ProfileDataForm";

const ProfileInfo = (props: ProfileInfoPropsTypes) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.saveAvatar(e.currentTarget.files[0])
        }
    }

    const onSubmitHandler = (formData: ProfileDataFormType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userAvatar} className={s.mainAvatar}/>
                {props.isOwner && <input type={"file"} onChange={onMainAvatarSelected}/>}

                {editMode
                    ? <ProfileDataFormRedux onSubmit={onSubmitHandler} initialValues={props.profile} profile={props.profile}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                   activateEditMode={() => {
                                       setEditMode(true)
                                   }}/>}
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )

}
export default ProfileInfo;

type ProfileDataType = {
    profile: GetProfileResponseType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData = (props: ProfileDataType) => {
    return <div>
        <div>
            {props.isOwner && <button onClick={props.activateEditMode}>edit</button>}
        </div>
        <div>
            <h3>ABOUT ME:</h3>
            <div><b>Full name:</b> {props.profile.fullName} </div>
            <div><b>About me:</b> {props.profile.aboutMe}</div>
            <h4>Contacts:</h4>
            <div>
                {Object.keys(props.profile.contacts).map(key => <Contact key={key} contactTitle={key}
                                                                         contactValue={props.profile.contacts[key as keyof ContactsType]}/>)}
            </div>
        </div>
        <hr/>
        <div>
            <div><b>Is looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'} </div>
            <div><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</div>
        </div>
        <hr/>
    </div>
}


const Contact = (props: ContactType) => {
    return <div className={s.contact}>
        <b>{props.contactTitle}: {props.contactValue}</b>
    </div>
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

type ProfileInfoPropsTypes = {
    profile: GetProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAvatar: (avatar: File) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
}