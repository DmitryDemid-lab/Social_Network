import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileInfoType, setProfile} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';

type mapStateToPropsType = {
    profile: profileInfoType
}

type mapDispatchToPropsType = {
    setProfile: (userId: string) => void
}

type PathParamsType = {
    userId: string
}

type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.setProfile(userId)
    }

    render() {
        return <Profile {...this.props} />
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setProfile})(WithUrlDataContainerComponent);