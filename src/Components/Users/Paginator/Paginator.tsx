import React from "react";
import s from "./Paginator.module.css";

export const Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div className={s.paginator}>
        {pages.map((p, i) => <span
            key={i}
            className={props.currentPage === p ? s.selectedPage : s.pages}
            onClick={() => {
                props.onPageChange(p)
            }}
        >{p}</span>)}
    </div>
}

type PaginatorPropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
}