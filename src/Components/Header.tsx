import React from 'react';
import s from '../ComponentsStyles/Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/1024px-Approve_icon.svg.png"
                alt=""/>
        </header>
    )
}

export default Header;