import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/AuthReducer/AuthReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerType = {
    getAuthUserData: () => void
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

const mapStateToPropsType = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

const HeaderConnect = connect(mapStateToPropsType, {getAuthUserData})(HeaderContainer)

export default HeaderConnect;