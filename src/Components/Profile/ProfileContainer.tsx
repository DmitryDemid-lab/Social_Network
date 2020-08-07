import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileInfoType, setUserProfile} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';
import {profileAPI} from "../../API/API";

type mapStateToPropsType = {
    profile: profileInfoType
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: profileInfoType) => void
}

type PathParamsType = {
    userId: string
}

type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<CommonPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        /*if (!userId) {
            userId = '2'
        }*/
        profileAPI.setProfile(userId).then(data => {
            this.props.setUserProfile(data)
        })
    }

    render() {
        return <Profile {...this.props} />
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);