import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, requiredField} from "../../../common/validators/Validators";
import {Textarea} from "../../../common/FormsControls/FormControls";

export type AddPostFormDataType = {
    newPostBody: string
}

const maxLength10 = maxLength(10)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={Textarea}
                name={'newPostBody'}
                placeholder={'Enter post text'}
                validate={[requiredField, maxLength10]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

export const AddPostFormRedux = reduxForm<AddPostFormDataType>({form: 'ProfileAddNewPostForm'})(AddPostForm)