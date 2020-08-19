import usersReducer, {followSuccess, setUsers, unFollowSuccess, UsersStateType} from "./usersReducer";

test('correct user should be followed', () => {
    const initialState: UsersStateType = {
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
                photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
            },
            {
                id: 3,
                followed: false,
                fullName: "Sasha",
                status: "I'm manager",
                location: {city: "kiev", country: "Ukraine"},
                photoUrl: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
            }
        ]
    };

    const action = followSuccess(1);

    const endState = usersReducer(initialState, action)

    expect(endState.users[0].followed).toBeTruthy();
});
test('correct user should be unFollowed', () => {
    const initialState: UsersStateType = {
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
                photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
            },
        ]
    };

    const action = unFollowSuccess(1);

    const endState = usersReducer(initialState, action)

    expect(endState.users[0].followed).toBeFalsy();
});

test('correct user should be followed', () => {
    let initialState: UsersStateType = {
        users: [],
    };

    const users = [
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
                photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png',
            },
        ]
    ;

    const action = setUsers(users);

    const endState = usersReducer(initialState, action)

    expect(endState.users.length).toBe(2);
    expect(endState.users[0].fullName).toBe("Dmitry");
});