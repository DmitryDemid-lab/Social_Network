import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {postsType} from "../../../redux/store";
import {AddPostFormDataType, AddPostFormRedux} from "./Post/AddPostForm";

type myPostsType = {
    posts: Array<postsType>,
    addPost: (newPostBody: string) => void,
}


function MyPosts(props: myPostsType) {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)


    let onAddPost = (values: AddPostFormDataType) => {
        props.addPost(values.newPostBody);
    };
    return (
        <div className={s.PostsBlock}>
            <h3>My posts:</h3>
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;