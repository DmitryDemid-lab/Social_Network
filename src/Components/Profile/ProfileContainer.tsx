import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, profileInfoType} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';
import withAuthRedirect from "../../hoc/AuthRedirect";

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

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent);