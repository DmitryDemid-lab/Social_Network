export type postsType = {
    id: number,
    message: string,
    likesCount: number
};
export type dialogsType = {
    id: number,
    name: string,
};
export type messagesType = {
    id: number,
    message: string,
};
export type friendType = {
    id: number,
    name: string,
    url: string
}

export type ProfilePageType = {
    posts: Array<postsType>,
    newPostText: string
};
export type DialogsPageType = {
    dialogs: Array<dialogsType>,
    messages: Array<messagesType>,
    newMessageText: string,
};
export type SideBarType = {
    friends: Array<friendType>
};

export type RootStateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType,
    sideBar: SideBarType
};



type StoreType = {
    _state: RootStateType,
    _callSubscriber: ()=>void,
    addPost: ()=>void,
    updateNewPostTex: (newText: string)=>void,
    addMessage: ()=>void,
    updateNewMessageText: (newText: string)=>void,
    subscribe: (observer: () => void)=>void,
    getState: ()=>any
};


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are u?", likesCount: 15},
                {id: 2, message: "It's my first post!", likesCount: 20}
            ],
            newPostText: ""
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Sasha"},
                {id: 3, name: "Hanna"},
                {id: 4, name: "Lesha"},
                {id: 5, name: "Anton"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Check Info"},
                {id: 3, message: "How is your studying in REACT"},
                {id: 4, message: "Hey Yo"},
                {id: 5, message: "Good morning"}
            ],
            newMessageText: ""
        },
        sideBar: {
            friends: [
                {
                    id: 1,
                    name: "Max",
                    url: "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                },
                {
                    id: 2,
                    name: "Alex",
                    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQY3-T5CGnvt9BKaAd3BtwiHmxLYTYXwfFnYmR88G3LXq9aUEg6&usqp=CAU"
                },
                {
                    id: 3,
                    name: "Hanna",
                    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSATQJC564l8QfGaYWecO6SG96pX0E4otgA6EO25MS4ABRa2pd7&usqp=CAU"
                },
            ]
        }
    },
    getState (){
        return this._state
    },
    _callSubscriber() {
        console.log('State changed');
    },
    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.unshift(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber();
    },
    updateNewPostTex(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber();
    },
    addMessage() {
        let newMessage = {
            id: 6,
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = '';
        this._callSubscriber();
    },
    updateNewMessageText(newText: string) {
        this._state.dialogsPage.newMessageText = newText;
        this._callSubscriber();
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    }
}

/*
let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are u?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ],
        newPostText: ""
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Sasha"},
            {id: 3, name: "Hanna"},
            {id: 4, name: "Lesha"},
            {id: 5, name: "Anton"}
        ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "Check Info"},
            {id: 3, message: "How is your studying in REACT"},
            {id: 4, message: "Hey Yo"},
            {id: 5, message: "Good morning"}
        ],
        newMessageText: ""
    },
    sideBar: {
        friends: [
            {
                id: 1,
                name: "Max",
                url: "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
            },
            {
                id: 2,
                name: "Alex",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQY3-T5CGnvt9BKaAd3BtwiHmxLYTYXwfFnYmR88G3LXq9aUEg6&usqp=CAU"
            },
            {
                id: 3,
                name: "Hanna",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSATQJC564l8QfGaYWecO6SG96pX0E4otgA6EO25MS4ABRa2pd7&usqp=CAU"
            },
        ]
    }
};
*/
/*
export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.unshift(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree();
};

export const updateNewPostTex = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree();
};

export const addMessage = () => {
    let newMessage = {
        id: 6,
        message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = '';
    rerenderEntireTree();
}

export const updateNewMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText;
    rerenderEntireTree();
};

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer;
};
*/


export default store;