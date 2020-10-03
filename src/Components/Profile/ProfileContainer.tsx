import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, saveAvatar, updateStatus} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'redux';
import {GetProfileResponseType} from "../../API/API";

type mapStateToPropsType = {
    profile: GetProfileResponseType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    saveAvatar: (avatar: File) => void
}

type PathParamsType = {
    userId: any
}

type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<CommonPropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = this.props.authorizedUserId
            if (!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        this.props.match.params.userId !== prevProps.match.params.userId && this.refreshProfile()
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, saveAvatar}),
    withRouter,
)(ProfileContainer)
