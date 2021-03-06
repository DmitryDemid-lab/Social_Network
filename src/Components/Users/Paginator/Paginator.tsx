import React, {useState} from "react";
import s from "./Paginator.module.css";
import { Pagination } from '@material-ui/lab'

export const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    const portionCount = Math.ceil(pagesCount / (props.portionSize))
    const [page, setPage] = useState(1)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        props.onPageChange(value)
    };

    return <div className={s.paginator}>
       <Pagination count={portionCount} onChange={handleChange} page={page} siblingCount={5} boundaryCount={1}/>
    </div>
}

/*const myPaginator = () => {
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)

    let pages = [] as Array<number>
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPagePortionNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPagePortionNumber = portionNumber * props.portionSize

    return <div>
        {/!*{portionNumber > 1 &&
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
        <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}*!/}
    </div>
}*/

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    onPageChange: (pageNumber: number) => void
}