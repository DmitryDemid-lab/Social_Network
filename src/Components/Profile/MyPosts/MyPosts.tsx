import React, {useCallback} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {AddPostFormDataType, AddPostFormRedux} from "./Post/AddPostForm";
import {PostsType} from "../../../redux/ProfileReducer/profileReducer";

export const MyPosts = React.memo((props: myPostsType) => {
    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    const onAddPost = useCallback((values: AddPostFormDataType) => {
        props.addPost(values.newPostBody);
    }, [props]);


    return (
        <div className={s.PostsBlock}>
            <h3>My posts:</h3>
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

type myPostsType = {
    posts: Array<PostsType>,
    addPost: (newPostBody: string) => void,
}