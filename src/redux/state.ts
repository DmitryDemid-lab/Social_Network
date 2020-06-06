type postsType = {
    id: number,
    message: string,
    likesCount: number
};
type dialogsType = {
    id: number,
    name: string,
};
type messagesType = {
    id: number,
    message: string,
};

type ProfilePageType = {
    posts: Array<postsType>,
};
type DialogsPageType = {
    dialogs: Array<dialogsType>,
    messages: Array<messagesType>
};
type SideBarType = {};

type RootStateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType,
    sideBar: SideBarType
};


let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are u?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ]
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
        ]
    },
    sideBar: {}
};

export default state;