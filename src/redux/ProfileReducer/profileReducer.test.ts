import {ProfilePageType} from "../store";
import profileReducer, {addPost, updateNewPostText} from "./profileReducer";

test('correct post should be added', () => {
    const initialState:any = {
        posts: [
            {id: 1, message: "Hi, how are u?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ],
        newPostText: ""
    };

    const action = addPost();

    const endState = profileReducer(initialState, action)

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[0].id).toBe(3);
});

test('new post text should be updated', () => {
    const initialState:any = {
        posts: [
            {id: 1, message: "Hi, how are u?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ],
        newPostText: ""
    };

    const action = updateNewPostText("I'm the best");

    const endState = profileReducer(initialState, action)

    expect(endState.newPostText).toBe("I'm the best");
});

test('correct post should be added with correct post text', () => {
    const initialState:any = {
        posts: [
            {id: 1, message: "Hi, how are u?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ],
        newPostText: ""
    };

    const action1 = updateNewPostText("I'm the best");
    const middleState = profileReducer(initialState, action1)

    const action2 = addPost();
    const endState = profileReducer(middleState, action2)

    expect(middleState.newPostText).toBe("I'm the best");
    expect(endState.posts[0].message).toBe("I'm the best");
});