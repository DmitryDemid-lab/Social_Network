import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollowSuccess,
    UsersStateType,
    UsersType
} from "./usersReducer";

const initialState: UsersStateType = {
    users: [
        {
            id: 1,
            followed: false,
            photos: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
            name: 'Dmitry',
            status: 'I am boss'
        },
        {
            id: 2,
            followed: true,
            name: "Ivan",
            status: "I'm driver",
            photos: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
        },
        {
            id: 3,
            followed: false,
            name: "Sasha",
            status: "I'm manager",
            photos: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
        }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

test('correct user should be followed', () => {

    const action = followSuccess(1);

    const endState = usersReducer(initialState, action)

    expect(endState.users[0].followed).toBeTruthy();
});
test('correct user should be unFollowed', () => {

    const action = unFollowSuccess(1);

    const endState = usersReducer(initialState, action)

    expect(endState.users[0].followed).toBeFalsy();
});
test('correct users should be setted up', () => {
    let initialSetUsersState: UsersStateType = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };

    const users: Array<UsersType> = [
            {
                id: 1,
                followed: false,
                photos: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
                name: 'Dmitry',
                status: 'I am boss'
            },
            {
                id: 2,
                followed: true,
                name: "Ivan",
                status: "I'm driver",
                photos: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
            },
        ]
    ;

    const action = setUsers(users);

    const endState = usersReducer(initialSetUsersState, action)

    expect(endState.users.length).toBe(2);
    expect(endState.users[0].name).toBe("Dmitry");
});
test('correct page should be setted up', () => {
    const endState = usersReducer(initialState, setCurrentPage(2))

    expect(endState.currentPage).toBe(2);
});
test('correct Total Users Count should be setted up', () => {
    const endState = usersReducer(initialState, setTotalUsersCount(7))

    expect(endState.totalUsersCount).toBe(7);
});
test('correct toggleIsFetching value should be setted up', () => {
    const endState = usersReducer(initialState, toggleIsFetching(true))

    expect(endState.isFetching).toBeTruthy();
});