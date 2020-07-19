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
    fullName: string
    status: string
    location: UsersLocationType
}

type UsersStateType = {
    users: Array<UsersType>
}

let initialState: UsersStateType = {
    users: [
        /*{id: 1, followed: false, fullName: "Dmitry", status: "I'm boss", location: {city: "Minsk", country: "Belarus"}},
        {id: 2, followed: true, fullName: "Ivan", status: "I'm driver", location: {city: "Moscow", country: "Russia"}},
        {id: 3, followed: false, fullName: "Sasha", status: "I'm manager", location: {city: "kiev", country: "Ukraine"}
        },*/
    ],
};

const usersReducer = (state = initialState, action: any): UsersStateType => {
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

export const followAC = (userID: number) => ({type: FOLLOW, userID})
export const unFollowAC = (userID: number) => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users})

export default usersReducer;