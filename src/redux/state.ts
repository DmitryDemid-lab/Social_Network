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
type friendType = {
    id: number,
    name: string,
    url: string
}

type ProfilePageType = {
    posts: Array<postsType>,
};
type DialogsPageType = {
    dialogs: Array<dialogsType>,
    messages: Array<messagesType>
};
type SideBarType = {
    friends: Array<friendType>
};

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
    sideBar: {
        friends: [
            {   id: 1,
                name: "Max",
                url: "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
            },
            {   id: 2,
                name: "Alex",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQY3-T5CGnvt9BKaAd3BtwiHmxLYTYXwfFnYmR88G3LXq9aUEg6&usqp=CAU"
            },
            {   id: 3,
                name: "Hanna",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSATQJC564l8QfGaYWecO6SG96pX0E4otgA6EO25MS4ABRa2pd7&usqp=CAU"
            },
        ]
    }
};

export default state;