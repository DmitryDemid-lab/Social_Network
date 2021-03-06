import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormInput, Textarea} from "../../common/FormsControls/FormControls";
import {requiredField} from "../../common/validators/Validators";
import {GetProfileResponseType} from "../../../API/API";
import s from './ProfileInfo.module.css';
import SaveIcon from '@material-ui/icons/Save';
import {Button} from "@material-ui/core";

export type ProfileDataFormType = {
    fullName: string
    lookingForAJob: boolean
    LookingForAJobDescription: string
    aboutMe: string
}
type PropsType = {
    profile: GetProfileResponseType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} className={s.editForm}>
        <div className={s.editButton}>
            <Button type={"submit"}><SaveIcon/></Button>
        </div>
        <h3>ABOUT ME:</h3>
        <div>
            <b>Full name:</b> <Field placeholder={'Full name'} name={'fullName'} component={FormInput}
                                     validate={[requiredField]}/>
        </div>
        <div>
            <b>About me:</b> <Field
            component={Textarea}
            name={'aboutMe'}
            placeholder={'Enter some info about yourself:'}
            validate={[requiredField]}
        />
        </div>
        <hr/>
        <h4>Contacts:</h4>
            <div>
                {Object.keys(profile.contacts).map(key => {
                    return <div className={s.contact}>
                        <b>{key}</b>: <Field key={key} placeholder={key} name={`contacts.${key}`} component={FormInput}/>
                    </div>
                    }
                )}
            </div>
        <div>
            <b>Is looking for a job:</b> <Field type={'checkbox'} name={'lookingForAJob'} component={FormInput}/>
        </div>
        <div>
            <b>My professional skills:</b> <Field
            component={Textarea}
            name={'lookingForAJobDescription'}
            placeholder={'Enter your skills:'}
            validate={[requiredField]}
        />
        </div>
        {error && <div className={s.formSummaryError}>{error}</div>}
        <hr/>
    </form>
}

// @ts-ignore
export const ProfileDataFormRedux = reduxForm<ProfileDataFormType, PropsType>({form: 'editProfile'})(ProfileDataForm)