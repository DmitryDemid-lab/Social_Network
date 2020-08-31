import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormControls";
import {maxLength, requiredField} from "../../common/validators/Validators";

export type AddMessageFormDataType = {
    newMessageBody: string
}

const maxLength10 = maxLength(10)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder={'Enter your message'}
                    validate={[requiredField, maxLength10]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)