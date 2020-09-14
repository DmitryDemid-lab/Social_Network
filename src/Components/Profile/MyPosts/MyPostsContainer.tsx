import React from 'react';
import {addPost, PostsType} from "../../../redux/ProfileReducer/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";

type MyPostsMapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

type MyPostsMapStateToPropsType = {
    posts: Array<PostsType>
}

const MapStateToProps = (state: AppStateType): MyPostsMapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
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