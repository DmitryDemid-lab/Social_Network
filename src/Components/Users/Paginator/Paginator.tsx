import React, {useState} from "react";
import s from "./Paginator.module.css";

export const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / (props.portionSize))
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPagePortionNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPagePortionNumber = portionNumber * props.portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}

        {pages
            .filter(p => p >= leftPagePortionNumber && p<= rightPagePortionNumber)
            .map((p, i) => <span
            key={i}
            className={props.currentPage === p ? s.selectedPage : s.pages}
            onClick={() => {
                props.onPageChange(p)
            }}
        >{p}</span>)}
        {portionCount > portionNumber &&
        <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
    </div>
}

type PaginatorPropsType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    portionSize: number
    onPageChange: (pageNumber: number) => void
}