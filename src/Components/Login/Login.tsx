import React from 'react';
import s from './Login.module.css';
import {InjectedFormProps, reduxForm, Field} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const Login = () => {

    const onSubmit =(formData: any) => {
        console.log(formData)
    }

    return <div className={s.Login}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return  <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Login'} name={'login'} component={'input'}/></div>
            <div><Field placeholder={'Password'} name={'password'} component={'input'}/></div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/>
                <label>remember me</label>
            </div>
            <div>
                <button>Login</button></div>
        </form>
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export default Login;