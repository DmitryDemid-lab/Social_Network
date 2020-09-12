import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": 'e25ce395-7836-43e0-9416-1f8978f20c93'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`,).then((response: AxiosResponse) => response.data)
    },
    follow(id: number) {
        return instance.post<CommonResponseType>(`follow/${id}`, {},).then(response => response.data)
    },
    unFollow(id: number) {
        return instance.delete<CommonResponseType>(`follow/${id}`, {},).then(response => response.data)
    },
}

export const profileAPI = {
    getProfile(userID: string) {
        return instance.get<GetProfileResponseType>(`profile/${userID}`).then(response => response.data)
    },
    getStatus(userID: string) {
        return instance.get<string>(`profile/status/${userID}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<CommonResponseType>(`profile/status/`, {status}).then(response => response.data)
    }
}

export const authAPI = {
    getAuth () {
        return instance.get<CommonResponseType<DataAuthResponseType>>(`auth/me`, ).then(response => response.data)
    },
    logIn (email: string, password: string, rememberMe: boolean = false) {
        return instance.post<CommonResponseType<{userId: number}>>(`/auth/login`, {email, password, rememberMe}).then(response => response.data)
    },
    logOut () {
        return instance.delete<CommonResponseType>(`/auth/login`).then(response => response.data)
    }
}

// TYPES
type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export type GetProfileResponseType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export type DataAuthResponseType =  {
    id: number | null
    email: string
    login: string
    isAuth: boolean
}


