import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileInfoType, getProfile} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';

type mapStateToPropsType = {
    profile: profileInfoType
}

type mapDispatchToPropsType = {
    getProfile: (userId: string) => void
}

type PathParamsType = {
    userId: string
}

type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        this.props.getProfile(userId)
    }

    render() {
        return <Profile {...this.props} />
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);