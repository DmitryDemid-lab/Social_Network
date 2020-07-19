import {SideBarType} from "./store";

export type SideBarActionsType = {};

let initialState: SideBarType = {
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

const sideBarReducer = (state = initialState, action:SideBarActionsType):SideBarType => {

    return state;
}

export default sideBarReducer;