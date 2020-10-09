import React from 'react';
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormCheckbox, FormInput} from "../common/FormsControls/FormControls";
import {maxLength, requiredField} from "../common/validators/Validators";
import {connect} from "react-redux";
import {login} from "../../redux/AuthReducer/AuthReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore";
import {Button} from "@material-ui/core";


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div className={s.Login}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const maxLength30 = maxLength(30)

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({handleSubmit, captchaUrl, error}) => {
    return <form onSubmit={handleSubmit} className={s.loginForm}>
        <div>
            <Field placeholder={'Email'} name={'email'} component={FormInput}
                   validate={[requiredField, maxLength30]}/>
        </div>
        <div>
            <Field type={'password'} placeholder={'Password'} name={'password'} component={FormInput}
                   validate={[requiredField, maxLength30]}/>
        </div>
        <div className={s.rememberMe}>
            <Field name={'rememberMe'} component={FormCheckbox} label={'Remember me'}/>
        </div>

        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
        {captchaUrl && <div>
            <Field placeholder={'Enter symbols from image'} name={'captcha'} component={FormInput}
                   validate={[requiredField, maxLength30]}/>
        </div>}

        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <Button>Login</Button>
        </div>
    </form>
}
// @ts-ignore
const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login})(Login);

//TYPES
type LoginFormPropsType = {
    captchaUrl: string | null
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginPropsType = mapStateToPropsType & {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}