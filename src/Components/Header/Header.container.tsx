import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/AuthReducer/AuthReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerType = mapStateToPropsType & {
    getAuthUserData: () => void
    logout: () => void
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

const HeaderConnect = connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer)

export default HeaderConnect;