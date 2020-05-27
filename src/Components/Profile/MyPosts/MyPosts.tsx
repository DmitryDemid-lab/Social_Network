import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            my posts:
            <div>
                <textarea>New Post</textarea>
                <button>Add post</button>
            </div>
            <Post message={"Hi, how'r u?"} likesCount={15}/>
            <Post message={"It's my first post!"} likesCount={20}/>
        </div>
    )
}

export default MyPosts;