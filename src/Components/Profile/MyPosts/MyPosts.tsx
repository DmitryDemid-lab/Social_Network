import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {AddPostFormDataType, AddPostFormRedux} from "./Post/AddPostForm";
import {PostsType} from "../../../redux/ProfileReducer/profileReducer";

function MyPosts(props: myPostsType) {
    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)
    const onAddPost = (values: AddPostFormDataType) => {
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

type myPostsType = {
    posts: Array<PostsType>,
    addPost: (newPostBody: string) => void,
}