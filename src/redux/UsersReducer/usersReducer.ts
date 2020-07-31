const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHIND = 'TOGGLE_IS_FETCHIND';

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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
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
export type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export type setTotalUsersCountACtype = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export type toggleIsFetchingACtype = {
    type: typeof TOGGLE_IS_FETCHIND,
    isFetching: boolean
}

export type UsersActionsType =
    FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | setTotalUsersCountACtype
    | toggleIsFetchingACtype;

let initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHIND: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

export const follow = (userID: number): FollowACType => ({type: FOLLOW, userID})
export const unFollow = (userID: number): UnFollowACType => ({type: UNFOLLOW, userID})
export const setUsers = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountACtype => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACtype => ({
    type: TOGGLE_IS_FETCHIND,
    isFetching
})

export default usersReducer;