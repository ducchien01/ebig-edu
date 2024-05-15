import React, { CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import './pagination.css';
import { Select1, Text } from "../export-component";

export function Pagination({ currentPage, itemPerPage, totalItem, onChangePage, hiddenPageSize = false, hiddenTotal = false, style }: { currentPage: number, itemPerPage: number, totalItem: number, onChangePage: Function, hiddenPageSize: boolean, hiddenTotal: boolean, style: CSSProperties }) {
    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return <div></div>;
    }
    if (totalItem > 0) {
        return (
            <div className="row custom-pagination" style={style}>
                {hiddenTotal ? null : <Text className="regular2">
                    Hiển thị {itemPerPage * (currentPage - 1) + 1}-{((itemPerPage * (currentPage - 1) + itemPerPage) > totalItem) ? totalItem : (itemPerPage * (currentPage - 1) + itemPerPage)} trong tổng số {totalItem} bản ghi
                </Text>}
                <div className="row ">
                    {hiddenPageSize ? null : <div className="row items-per-page-container" >
                        <Text className="regular2">Items/page</Text>
                        <div className="row">
                            <Select1
                                searchPlaceholder={'Search'}
                                style={{ width: '8.6rem' }}
                                placeholder={itemPerPage.toString()}
                                options={[10, 20, 50, 100, 200].map((item, _) => { return { id: item, name: `${item}` } })}
                                onChange={(ev: any) => {
                                    onChangePage(currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                                }}
                            />
                        </div>
                    </div>}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={(ev) => {
                            onChangePage(ev.selected + 1, itemPerPage);
                        }}
                        forcePage={currentPage - 1}
                        // initialPage={currentPage - 1}
                        pageCount={Math.ceil(totalItem / itemPerPage)}
                        previousLabel="Previous"
                        containerClassName="pagination row"
                        pageClassName=""
                        pageLinkClassName="nav-link"
                        previousClassName="nav-link"
                        previousLinkClassName="nav-link"
                        nextClassName="nav-link regular2"
                        nextLinkClassName="nav-link"
                        activeClassName="active"
                        hrefBuilder={(page, pageCount, selected) =>
                            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                        }
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div >

            </div>
        )
    }
}