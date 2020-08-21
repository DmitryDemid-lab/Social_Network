import React, {Component, JSXElementConstructor} from 'react';
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/reduxStore";
import {connect} from "react-redux";

type RedirectMapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): RedirectMapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>;
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}


export default withAuthRedirect;