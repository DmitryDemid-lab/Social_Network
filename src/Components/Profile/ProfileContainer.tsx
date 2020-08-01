import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {profileInfoType, setUserProfile} from "../../redux/ProfileReducer/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from 'react-router';

type mapStateToPropsType ={
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
        if (!userId) {
            userId = '2'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then((response) => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);