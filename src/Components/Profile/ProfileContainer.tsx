import React from 'react';
import {connect} from "react-redux";
import {getProfile, getStatus, saveAvatar, saveProfile, updateStatus} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'redux';
import {GetProfileResponseType} from "../../API/API";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";
import {follow, unFollow, UsersType} from "../../redux/UsersReducer/usersReducer";
import {Profile} from "./Profile";

type mapStateToPropsType = {
    profile: GetProfileResponseType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    friends: Array<UsersType>
}

type mapDispatchToPropsType = {
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    saveAvatar: (avatar: File) => void
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
    follow: (userID: number) => void
    unFollow: (userID: number) => void
}

type PathParamsType = {
    userId: any
}

type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<CommonPropsType> {

    state = {
        isRefresh: false
    }

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: any, snapshot?: any) {
        this.props.match.params.userId !== prevProps.match.params.userId && this.refreshProfile()
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} friends={this.props.friends}/>
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    friends: state.usersPage.friends,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, saveAvatar, saveProfile, unFollow, follow}),
    withRouter,
)(ProfileContainer)
