import {NavLink} from 'react-router-dom';
import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

type ListItemLinkPropsType = {
    icon: any
    primary: string
    to: string
    onItemClickHandler: () => void
}

export function ListItemLink(props: ListItemLinkPropsType) {
    const { icon, primary, to, onItemClickHandler,  } = props;
   // const [isActive, setIsActive] = React.useState(false);


    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps) => (
                <NavLink to={to} {...linkProps} activeStyle={{backgroundColor: 'rgba(0, 0, 0, 0.08)'}}/>
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={CustomLink}>
                <ListItemIcon onClick={() => {onItemClickHandler()}}>{icon}</ListItemIcon>
                <ListItemText primary={primary} onClick={() => {onItemClickHandler()}}/>
            </ListItem>
        </li>
    );
}