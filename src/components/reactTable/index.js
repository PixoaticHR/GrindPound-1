import React, { useState } from "react"
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

const ReactTable = ({
    columns,
    data,
    pageCount,
    totalRow,
    handleUpdateCartItem,
    handleRemoveFromCart,
    setDeleteId
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state: { pageIndex, pageSize, globalFilter, sortBy },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            manualGlobalFilter: true,
            manualSortBy: true,
            initialState: {
                pageIndex: 0,
                pageSize: totalRow,
            },
            pageCount: pageCount,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    )
    const [pageArr, setPageArr] = useState([]);

    React.useEffect(() => {
        const arr = [];
        for (let i = 1; i <= pageCount; i++) {
            arr.push(i)
        }
        setPageArr(arr);
    }, [pageCount]);

    console.log('page ==> ', page);

    return (
        <div className="overflow-x-auto">
            <table
                {...getTableProps()}
                className="table table-compact table-zebra w-full"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    className="border font-poppins text-[#1C1243] p-3"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} >
                    {page.length > 0 ? (
                        page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell) => {
                                        console.log('row ==> ', row);
                                        if (cell.column.Header == "QTY") {
                                            return (
                                                <td {...cell.getCellProps()}
                                                    className="border text-center text-sm font-poppins text-[#1C1243]"
                                                >
                                                    <span style={{ border: "1px solid #000", borderRadius: "3px", padding: "5px 7px" }}>
                                                        <button disabled={row?.values?.quantity == 1} onClick={() => {
                                                            // if (row?.values?.quantity == 1) {
                                                            //     handleRemoveFromCart({
                                                            //         type:'cart',
                                                            //         id:row?.original?.id
                                                            //     });
                                                            // } else {
                                                               
                                                            // };
                                                            handleUpdateCartItem(row?.original?.id, (row?.values?.quantity - 1));
                                                        }} style={{ lineHeight: "0px", fontSize: "25px", verticalAlign: "sub" }}>-</button>
                                                        <span style={{ padding: '10px' }}>{cell.render("Cell")}</span>
                                                        <button onClick={() => handleUpdateCartItem(row?.original?.id, (row?.values?.quantity + 1))} style={{ lineHeight: "0px", fontSize: "18px" }}>+</button>
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td {...cell.getCellProps()}
                                                    className="border text-center text-sm font-poppins text-[#1C1243]"
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            )
                                        }

                                    })}
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="hover">
                            <td colSpan={10000} className="text-center font-poppins">
                                Data not found!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default ReactTable;