import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength} from "../../../common/validators/Validators";
import {Textarea} from "../../../common/FormsControls/FormControls";
import {Button} from "@material-ui/core";

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
                validate={[maxLength10]}/>
        </div>
        <div style={{marginTop: '10px'}}>
            <Button type={"submit"} variant={"outlined"} size={"small"}>Add post</Button>
        </div>
    </form>
}

export const AddPostFormRedux = reduxForm<AddPostFormDataType>({form: 'ProfileAddNewPostForm'})(AddPostForm)