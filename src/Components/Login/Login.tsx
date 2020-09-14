import React from 'react';
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import {maxLength, requiredField} from "../common/validators/Validators";
import {connect} from "react-redux";
import {login} from "../../redux/AuthReducer/AuthReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore";


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div className={s.Login}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const maxLength30 = maxLength(30)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Email'} name={'email'} component={Input}
                   validate={[requiredField, maxLength30]}/>
        </div>
        <div>
            <Field type={'password'} placeholder={'Password'} name={'password'} component={Input}
                   validate={[requiredField, maxLength30]}/>
        </div>
        <div className={s.rememberMe}>
            <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
            <label htmlFor={'rememberMe'}>remember me</label>
        </div>
        {props.error && <div className={s.formSummaryError}>{props.error}</div>}
        <div>
            <button>Log in</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);

//TYPES
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginPropsType = mapStateToPropsType & {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type mapStateToPropsType = {
    isAuth: boolean
}