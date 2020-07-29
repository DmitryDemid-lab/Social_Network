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
    //photoUrl: string
    photos: any
    name: string
    status: string
    //location: UsersLocationType
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
    users: [],
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
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        default:
            return state;
    }
}

export const followAC = (userID: number): FollowACType => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number): UnFollowACType => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users})

export default usersReducer;