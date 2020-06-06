import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";


type postsType = {
    id: number,
    message: string,
    likesCount: number
}


type myPostsType = {
    posts: Array<postsType>
}

const MyPosts = (props: myPostsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.PostsBlock}>
            <h3>My posts:</h3>
            <div>
                <div>
                    <textarea>New Post</textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;