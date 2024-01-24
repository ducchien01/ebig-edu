// import ReactPaginate from "react-paginate";
// import Select2 from "../select2/Select2";
// import { useLocation } from 'react-router-dom';
// import './pagination.css';
// import { ControllerDA } from "../../core/controller";
// import { ActionType } from "../../core/ActionType";
// import { useEffect, useState } from "react";
// import ConfigAPI from "../../config/configApi";

// export default function Pagination({ controller, onChangePage, hiddenPageSize = false }) {
//     const location = useLocation();
//     const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
//     const [totalItem, setTotalItem] = useState(10)

//     const _InitData = async ({ page, size, query }) => {
//         if (!query) {
//             query = location.search;
//         }
//         var obj = {
//             "loadOptions": {
//                 "requireTotalCount": true,
//                 "skip": (page - 1) * size,
//                 "take": size,
//             },
//             "Action": ActionType.GetAll.value
//         }
//         const res = await ControllerDA.doAction(ConfigAPI.baseUrl, controller, obj, 1);
//         if (res.code == 200) {
//             setTotalItem(res.totalCount)
//             onChangePage(res.data)
//         }
//     }

//     useEffect(() => {
//         _InitData({ page: pageDetails.page, size: pageDetails.size })
//     }, [controller])

//     if (pageDetails.page > 1 && (totalItem === 0 || (Math.floor(totalItem / pageDetails.size) + (totalItem % pageDetails.size === 0 ? 0 : 1)) < pageDetails.page)) {
//         onChangePage([]);
//         return <div></div>;
//     }


//     if (totalItem > 0) {
//         return (
//             <div className="row 52637585-d60b-447c-a873-9df56bc9b2b4" level={6} cateid={140}>
//                 <div className="w-text cee2d49d-a1ab-4570-a72a-ad55b6058e34 regular2" level={7} cateid={139} >
//                     Hiển thị {pageDetails.size * (pageDetails.page - 1) + 1}-{((pageDetails.size * (pageDetails.page - 1) + pageDetails.size) > totalItem) ? totalItem : (pageDetails.size * (pageDetails.page - 1) + pageDetails.size)} trong tổng số {totalItem} bản ghi
//                 </div>
//                 <div className="row 8d1c8cff-610a-4d72-82f2-e948cb1848ec" level={7} cateid={140}>
//                     {hiddenPageSize ? null : <div className="row 1b44a252-c5ea-4aff-a72f-031b67a08f3c" level={8} cateid={140} >
//                         <div className="w-text abcbe7b5-579f-40ed-abfc-1adffadeec15 regular2" level={9} cateid={139}>Items/page</div>
//                         <div className="row 5f746375-6816-4c67-b614-6bdbe3fba40a" level={9} cateid={85} placeholder="10">
//                             <Select2
//                                 data={[10, 20, 50, 100, 200].map((item, _) => { return { id: item, name: item } })}
//                                 options={{ placeholder: `${pageDetails.size}` }}
//                                 onChange={(ev) => {
//                                     if (!isNaN(parseInt(ev.target.value)))
//                                         pageDetails.size = parseInt(ev.target.value);
//                                     const newPageDetails = { page: pageDetails.page, size: isNaN(parseInt(ev.target.value)) ? pageDetails.size : parseInt(ev.target.value) }
//                                     setPageDetails(newPageDetails);
//                                     _InitData(newPageDetails);
//                                 }}
//                             />
//                         </div>
//                     </div>}
//                     <ReactPaginate
//                         breakLabel="..."
//                         nextLabel="Next"
//                         onPageChange={(ev) => {
//                             setPageDetails({ page: ev.selected + 1, size: pageDetails.size });
//                             _InitData({ page: ev.selected + 1, size: pageDetails.size });
//                         }}
//                         forcePage={pageDetails.page - 1}
//                         // initialPage={pageDetails.page - 1}
//                         pageCount={Math.ceil(totalItem / pageDetails.size)}
//                         previousLabel="Previous"
//                         containerClassName="pagination row"
//                         pageClassName=""
//                         pageLinkClassName="nav-link"
//                         previousClassName="nav-link"
//                         previousLinkClassName="nav-link"
//                         nextClassName="nav-link regular2"
//                         nextLinkClassName="nav-link"
//                         activeClassName="active"
//                         hrefBuilder={(page, pageCount, selected) =>
//                             page >= 1 && page <= pageCount ? `/page/${page}` : '#'
//                         }
//                         renderOnZeroPageCount={null}
//                     />
//                 </div>
//             </div>
//         )
//     } else {
//         return (
//             <div></div>
//         )
//     }
// }