import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/AuthReducer/AuthReducer";
import {AppStateType} from "../../redux/reduxStore";

type HeaderContainerType = mapStateToPropsType & {
    logout: () => void
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

const HeaderConnect = connect(mapStateToProps, {logout})(HeaderContainer)

export default HeaderConnect;