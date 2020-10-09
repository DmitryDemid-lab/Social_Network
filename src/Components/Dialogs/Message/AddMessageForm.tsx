import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormControls";
import {maxLength} from "../../common/validators/Validators";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import s from '../Dialogs.module.css';

export type AddMessageFormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLength(50)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageForm}>
            <div>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder={'Enter your message'}
                    validate={[maxLength50]}
                />
            </div>
            <div>
                <Button type={"submit"}><SendIcon/></Button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)