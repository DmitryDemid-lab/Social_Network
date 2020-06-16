import React, {createRef} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {postsType} from "../../../redux/state";

type myPostsType = {
    posts: Array<postsType>,
    addPost: () => void,
    newPostText: string,
    updateNewPostTex: (newText: string) => void,
}

function MyPosts(props: myPostsType) {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        props.addPost();
    };

    let onPostChangeHandler = () => {
        let text = newPostElement.current!.value;
        props.updateNewPostTex(text);
    };


    return (
        <div className={s.PostsBlock}>
            <h3>My posts:</h3>
            <div>
                <div>
                    <textarea onChange={onPostChangeHandler}
                              ref={newPostElement}
                              value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;