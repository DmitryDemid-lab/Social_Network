import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sideBarReducer from "./sideBarReducer";

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
    subscribe: (observer: () => void)=>void,
    getState: ()=> RootStateType
    dispatch: (action: any) => void
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
    _callSubscriber() {
        console.log('State changed');
    },

    getState (){
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },

    /*addPost() {
        let newPost: postsType = {
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
    },*/

    dispatch(action) {
        this._state = profileReducer(this._state, action);
        this._state = dialogsReducer(this._state, action);
        this._state = sideBarReducer(this._state, action);
        this._callSubscriber()
    }
}

export default store;