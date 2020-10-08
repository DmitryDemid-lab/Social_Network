import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import {ContactsType, GetProfileResponseType} from "../../../API/API";
import {ProfileStatusHooks} from "./ProfileStatus/ProfileStatusHooks";
import {ProfileDataFormRedux, ProfileDataFormType} from "./ProfileDataForm";
import {Button, CircularProgress} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const ProfileInfo = (props: ProfileInfoPropsTypes) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <CircularProgress/>
    }

    const onSubmitHandler = (formData: ProfileDataFormType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                {editMode
                    ? <ProfileDataFormRedux onSubmit={onSubmitHandler} initialValues={props.profile}
                                            profile={props.profile}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                   activateEditMode={() => {
                                       setEditMode(true)
                                   }}/>}
                <div className={s.infoContainer}><ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/></div>
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
    return <div className={s.profileData}>
        <div className={s.editButton}>
            {props.isOwner && <Button onClick={props.activateEditMode} size={"small"}><EditIcon/></Button>}
        </div>

        <div className={s.myName}>
            <h3>Hello, my name is <span>{props.profile.fullName}</span></h3>
        </div>

        <div>
            <div className={s.infoContainer}>
                <div className={s.aboutMe}>
                    <h4>About me:</h4> <span>{props.profile.aboutMe}</span>
                </div>
            </div>
            <hr/>
            <div>
                <div className={s.infoContainer}>
                    <h4>My Contacts:</h4>
                    <div>
                        {Object.keys(props.profile.contacts).map(key => <Contact key={key} contactTitle={key}
                                                                                 contactValue={props.profile.contacts[key as keyof ContactsType]}/>)}
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div className={s.infoContainer}>
            <div className={s.jobInfo}>
                <div><span><b>Is looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}</span></div>
                <div><span><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</span></div>
            </div>
        </div>
        <hr/>
    </div>
}


const Contact = (props: ContactType) => {
    return <div className={s.contact}>
        <span><b>{props.contactTitle}</b>: {props.contactValue}</span>
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
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
}