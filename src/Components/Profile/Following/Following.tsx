import React, {useEffect} from 'react';
import s from './Following.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {getFriends, UsersType} from "../../../redux/UsersReducer/usersReducer";
import {Friend} from "../../Users/Friend/Friend";

export const Following = (props: FollowingPropsType) => {
    useEffect(() => {
        dispatch(getFriends(true))
    }, [])

    const dispatch = useDispatch()
    const friends = useSelector<AppStateType, Array<UsersType>>(state => state.usersPage.friends)
    console.log('FRIENDS: ', friends)

    return <div className={s.Following}>
        <h3>My Friends</h3>
        <div className={s.friendsList}>
            {friends.map(f => <Friend key={f.id} userId={f.id} userPhotoSmall={f.photos.small} userName={f.name}/>)}
        </div>
    </div>
}

type FollowingPropsType = {}