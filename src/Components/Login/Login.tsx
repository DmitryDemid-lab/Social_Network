import React from 'react';
import s from './Login.module.css';
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import {maxLength, requiredField} from "../common/validators/Validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return <div className={s.Login}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const maxLength20 = maxLength(20)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field placeholder={'Login'} name={'login'} component={Input}
                    validate={[requiredField, maxLength20]}/>
        </div>
        <div><Field placeholder={'Password'} name={'password'} component={Input}
                    validate={[requiredField, maxLength20]}/></div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
            <label htmlFor={'rememberMe'}>remember me</label>
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export default Login;