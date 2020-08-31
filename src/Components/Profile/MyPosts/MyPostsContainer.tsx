import React from 'react';
import {addPost} from "../../../redux/ProfileReducer/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {postsType} from "../../../redux/store";

type MyPostsMapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

type MyPostsMapStateToPropsType = {
    posts: Array<postsType>
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