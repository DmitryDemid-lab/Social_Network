import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";


type friendType = {
    id: number,
    name: string,
    url: string
};
type SideBarType = {
    friends: Array<friendType>
};

const NavBar = (props: SideBarType) => {


    let newFriends = props.friends.map(fr => <Friends name={fr.name} url={fr.url} key={fr.id}/>)

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to ="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to ="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
          {/*  <div className={s.item}>
                <NavLink to ="/news" activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to ="/music" activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to ="/settings" activeClassName={s.activeLink}>Settings</NavLink>
            </div>*/}
            <div className={s.item}>
                <NavLink to ="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>

            <div className={s.friendsBlock}>
                Friends:
                <div className={s.friends}>
                    {newFriends}
                </div>
            </div>
        </nav>
    )
}


export default NavBar;