import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

type myPostsType = {}


function MyPostsContainer(props: myPostsType) {
   /* let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator())
    };

    let onPostChangeHandler = (text: string) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action)
    };*/


    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let addPost = () => {
                        store.dispatch(addPostActionCreator())
                    };

                    let onPostChangeHandler = (text: string) => {
                        let action = updateNewPostTextActionCreator(text);
                        store.dispatch(action)
                    };
                    return (<MyPosts posts={state.profilePage.posts}
                                     addPost={addPost}
                                     updateNewPostTex={onPostChangeHandler}
                                     newPostText={state.profilePage.newPostText}/>)
                }
            }
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer;