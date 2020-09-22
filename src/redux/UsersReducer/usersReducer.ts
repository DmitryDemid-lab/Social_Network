import {usersAPI} from "../../API/API";
import {AppStateType} from "../reduxStore";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action: UsersActionsType) => {
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
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter((id: number) => id != action.userID)
            }
        }
        default:
            return state;
    }
}
//ACTIONS
export const followSuccess = (userID: number): FollowACType => ({type: FOLLOW, userID})
export const unFollowSuccess = (userID: number): UnFollowACType => ({type: UNFOLLOW, userID})
export const setUsers = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountACtype => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACtype => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleFollowingProgress = (isFetching: boolean, userID: number): toggleIsFollowingProgressACType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    userID,
    isFetching,
})

//FUNC
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let responseData = await apiMethod(userId)
    if (responseData.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

//THUNKS
export const getUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let responseData = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(responseData.items))
        dispatch(setTotalUsersCount(responseData.totalCount))
    }

export const unFollow = (userId: number): ThunkType =>
    async (dispatch) => {
        const apiMethod = usersAPI.unFollow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, unFollowSuccess)
    }

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)
    }

export default usersReducer;
//TYPES
export type UsersType = {
    id: number
    followed: boolean
    photos: any
    name: string
    status: string
}
export type UsersStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export type toggleIsFollowingProgressACType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
    userID: number
}
export type UsersActionsType =
    FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | setTotalUsersCountACtype
    | toggleIsFetchingACtype
    | toggleIsFollowingProgressACType

type ThunkType = ThunkAction<void, AppStateType, any, UsersActionsType>