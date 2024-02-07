import ReactPaginate from "react-paginate";
import './pagination.css';
import { Select1 } from "../export-component";

export default function Pagination({ currentPage, itemPerPage, totalItem, onChangePage, hiddenPageSize = false }) {
    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return <div></div>;
    }
    if (totalItem > 0) {
        return (
            <div className="row 52637585-d60b-447c-a873-9df56bc9b2b4" level={6} cateid={140}>
                <div className="w-text cee2d49d-a1ab-4570-a72a-ad55b6058e34 regular2" level={7} cateid={139} >
                    Hiển thị {itemPerPage * (currentPage - 1) + 1}-{((itemPerPage * (currentPage - 1) + itemPerPage) > totalItem) ? totalItem : (itemPerPage * (currentPage - 1) + itemPerPage)} trong tổng số {totalItem} bản ghi
                </div>
                <div className="row 8d1c8cff-610a-4d72-82f2-e948cb1848ec" level={7} cateid={140}>
                    {hiddenPageSize ? null : <div className="row 1b44a252-c5ea-4aff-a72f-031b67a08f3c" level={8} cateid={140} >
                        <div className="w-text abcbe7b5-579f-40ed-abfc-1adffadeec15 regular2" level={9} cateid={139}>Items/page</div>
                        <div className="row 5f746375-6816-4c67-b614-6bdbe3fba40a" level={9} cateid={85} placeholder="10">
                            <Select1
                                placeholder={itemPerPage}
                                options={[10, 20, 50, 100, 200].map((item, _) => { return { id: item, name: item } })}
                                onChange={(ev) => {
                                    if (!isNaN(parseInt(ev.target.value)))
                                        itemPerPage = parseInt(ev.target.value);
                                    onChangePage(currentPage, isNaN(parseInt(ev.target.value)) ? itemPerPage : parseInt(ev.target.value));
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