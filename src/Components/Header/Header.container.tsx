import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {serverDataType, setAuthUserData, toggleIsFetching} from "../../redux/AuthReducer/AuthReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerType ={
    toggleIsFetching: (isFetching: boolean) => void
    setAuthUserData: (data: serverDataType) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerType>{
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response: any) => {
                this.props.toggleIsFetching(false)
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data)
                }
            })
    }
    render() {
        return  <Header {...this.props} />
    }
}

const mapStateToPropsType = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

const HeaderConnect = connect(mapStateToPropsType, {setAuthUserData, toggleIsFetching})(HeaderContainer)

export default HeaderConnect;