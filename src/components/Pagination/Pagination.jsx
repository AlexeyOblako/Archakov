import React from 'react';
import ReactPaginate from "react-paginate";
import style from './pagination.module.scss';

const Pagination = ({value, onChangePage}) => {
    return (
        <>
            <ReactPaginate className={style.root}
                           breakLabel="..."
                           nextLabel=">"
                           onPageChange={event =>
                               onChangePage(event.selected + 1)}
                           pageRangeDisplayed={8}
                           pageCount={3}
                           forcePage={value - 1}
                           previousLabel="<"
                           renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;