import { useNavigate } from "react-router-dom"
import { IProduct } from "../pages/HomePage"
import { useCallback, useEffect, useMemo, useState } from "react"

interface IProductTable {
    data: IProduct[],
    pageNumber: number,
    amountProduct: number
}

function ProductTable({ data, pageNumber, amountProduct }: IProductTable) {
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate()

    const onDetail = (id: number) => {
        navigate('/detail/' + id)
    }

    const pageList = useMemo(() => {
        return Array(pageNumber).fill(0).map((e, i) => i + 1)
    }, [pageNumber])

    const pageStart = useMemo(() => {
        return (page - 1) * amountProduct + 1
    }, [amountProduct, page])

    const onChangePage = useCallback((value: number) => {
        setPage(value)
    }, [])

    useEffect(()=>{
        setPage(1)
    },[data.length])

    const sliceData = pageNumber != 0 ? data.slice((page - 1) * amountProduct, (data.length < amountProduct ? data.length : amountProduct) * page) : data
    
    const pageEnd = useMemo(() => {
        return pageList.length != 0 ? (data.length < amountProduct ? data.length : amountProduct) * page : sliceData.length
    }, [amountProduct, data.length, page, pageList.length, sliceData.length])

    return (
        <div className="table-auto bg-transparent">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Thumbnail</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Stock</th>
                        {data[0]?.totalPrice && <th>Total Price</th>}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {sliceData && sliceData.map((prod) => {
                        return (
                            <tr key={prod.id} className="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <img src={prod.thumbnail} alt="" className="max-w-36 max-h-36" />
                                </td>
                                <td className="px-6 py-4">{prod.title}</td>
                                <td className="px-6 py-4">{prod.price}</td>
                                <td className="px-6 py-4">{prod.stock}</td>
                                {prod?.totalPrice && <td className="px-6 py-4">{prod.totalPrice}</td>}
                                <td className="px-6 py-4">
                                    <button
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        onClick={() => onDetail(prod.id)}
                                    >Detail</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{pageStart}-{pageEnd}</span> of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    {pageList.length > 1 && pageList.map((page) => {
                        return (
                            <li key={page}>
                                <button onClick={() => onChangePage(page)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default ProductTable