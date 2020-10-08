import React from 'react';
import {addPost, PostsType} from "../../../redux/ProfileReducer/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {MyPosts} from "./MyPosts";

type MyPostsMapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

type MyPostsMapStateToPropsType = {
    posts: Array<PostsType>
    photo: string
}

const MapStateToProps = (state: AppStateType): MyPostsMapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        photo: state.profilePage.profile.photos.small
    }
}

const MapDispatchToProps = (dispatch: any): MyPostsMapDispatchToPropsType => {
    return {
        addPost: (newPostBody: string) => {
            dispatch(addPost(newPostBody))
        },
    }
}

const MyPostsContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts)

export default MyPostsContainer;