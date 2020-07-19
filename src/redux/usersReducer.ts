const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

export type UsersLocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    followed: boolean
    photoUrl: string
    fullName: string
    status: string
    location: UsersLocationType
}

export type UsersStateType = {
    users: Array<UsersType>
}

export type FollowACType = {
    type: typeof FOLLOW,
    userID: number
}
export type UnFollowACType = {
    type: typeof UNFOLLOW,
    userID: number
}
export type SetUsersACType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}

export type UsersActionsType = FollowACType | UnFollowACType | SetUsersACType;

let initialState: UsersStateType = {
    users: [
        {
            id: 1,
            followed: false,
            fullName: "Dmitry",
            status: "I'm boss",
            location: {city: "Minsk", country: "Belarus"},
            photoUrl: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
        },
        {
            id: 2,
            followed: true,
            fullName: "Ivan",
            status: "I'm driver",
            location: {city: "Moscow", country: "Russia"},
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwoSHAek_PYhnfDL4yEwo-EJY4njm1q2_xew&usqp=CAU',
        },
        {
            id: 3,
            followed: false,
            fullName: "Sasha",
            status: "I'm manager",
            location: {city: "kiev", country: "Ukraine"},
            photoUrl: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
        },
    ],
};

const usersReducer = (state = initialState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export const followAC = (userID: number): FollowACType => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number): UnFollowACType => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users})

export default usersReducer;