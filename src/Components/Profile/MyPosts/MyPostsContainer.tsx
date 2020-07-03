import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

type myPostsType = {
    store: any
}


function MyPostsContainer (props: myPostsType) {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator())
    };

    let onPostChangeHandler = (text: string) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action)
    };



    return (
        <MyPosts posts={state.profilePage.posts}
                 addPost={addPost}
                 updateNewPostTex={onPostChangeHandler}
                 newPostText={state.profilePage.newPostText}/>
    )
};

export default MyPostsContainer;