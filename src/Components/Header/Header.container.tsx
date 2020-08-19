import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuth} from "../../redux/AuthReducer/AuthReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerType = {
    setAuth: () => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.setAuth()
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToPropsType = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

const HeaderConnect = connect(mapStateToPropsType, {setAuth})(HeaderContainer)

export default HeaderConnect;