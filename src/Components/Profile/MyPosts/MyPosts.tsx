import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {postsType} from "../../../redux/store";

type myPostsType = {
    posts: Array<postsType>,
    addPost: () => void,
    updateNewPostTex: (newText: string) => void,
    newPostText: string,
}


function MyPosts(props: myPostsType) {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewPostTex(text);
    };


    return (
        <div className={s.PostsBlock}>
            <h3>My posts:</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;