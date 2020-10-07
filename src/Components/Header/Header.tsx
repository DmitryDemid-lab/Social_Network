import React from 'react';
import s from './Header.module.css';
import {NavLink, Redirect} from "react-router-dom";
import {Button} from "@material-ui/core";

type HeaderType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header = (props: HeaderType) => {
    const onLogOutClick = () => {
        props.logout()
    }

    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>You are logged in as: <span style={{textDecorationLine: 'underline'}}>{props.login}</span>
                        <Button variant="outlined" color={"inherit"} onClick={onLogOutClick} size={"small"} style={{marginLeft: '10px'}}>Log out</Button>
                    </div>
                    :<div>
                        <Button variant={"outlined"} color={"inherit"} size={"small"}><NavLink to={'/login'}>Login</NavLink></Button>
                        <Redirect to='/login'/>
                    </div>

                }
            </div>
        </header>
    )
}

export default Header;