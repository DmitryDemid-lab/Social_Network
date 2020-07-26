import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/ProfileReducer/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {postsType} from "../../../redux/store";

type MyPostsMapDispatchToPropsType = {
    updateNewPostTex: (text: string) => void
    addPost: () => void
}

type MyPostsMapStateToPropsType = {
    posts: Array<postsType>
    newPostText: string
}

const MapStateToProps = (state: AppStateType): MyPostsMapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MapDispatchToProps = (dispatch: any): MyPostsMapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updateNewPostTex: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}

const MyPostsContainer = connect(MapStateToProps, MapDispatchToProps)(MyPosts)

export default MyPostsContainer;