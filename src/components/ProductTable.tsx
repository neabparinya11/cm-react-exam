import { useNavigate } from "react-router-dom"
import { IProduct } from "../pages/HomePage"
import { useCallback, useEffect, useMemo, useState } from "react"
import DefaultImage from '/default-image.jpg'

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
        return Array(pageNumber).fill(0).map((_, i) => i + 1)
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
        return pageList.length != 0 ? (data.length < amountProduct * page ? data.length : amountProduct* page ) : sliceData.length
    }, [amountProduct, data.length, page, pageList.length, sliceData.length])

    return (
        <div className="table-auto bg-transparent">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-base text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-2 py-2">Thumbnail</th>
                        <th scope="col" className="px-2 py-2">Title</th>
                        <th scope="col" className="px-2 py-2">Price</th>
                        <th scope="col" className="px-2 py-2">Stock</th>
                        {data[0]?.totalPrice && <th>Total Price</th>}
                        <th scope="col" className="px-2 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {sliceData && sliceData.map((prod) => {
                        return (
                            <tr key={prod.id} className="text-sm bg-white border-b">
                                <td className="px-2 py-2">
                                    <img src={prod.thumbnail} alt="" onError={(e) => {
                                        e.currentTarget.src = DefaultImage
                                        }} className="max-w-36 max-h-36 object-contain" />
                                </td>
                                <td className="px-2 py-2 font-medium text-lg">{prod.title}</td>
                                <td className="px-2 py-2">{prod.price.toLocaleString(undefined, {maximumFractionDigits: 3})}</td>
                                <td className="px-2 py-2">{prod.stock}</td>
                                {prod?.totalPrice && <td className="px-2 py-2">{prod.totalPrice.toLocaleString(undefined, {maximumFractionDigits: 3})}</td>}
                                <td className="px-2 py-2">
                                    <button
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                                        onClick={() => onDetail(prod.id)}
                                    >Detail</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 ">{pageStart}-{pageEnd}</span> of <span className="font-semibold text-gray-900 ">{data.length}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    {pageList.length > 1 && pageList.map((pageN) => {
                        return (
                            <li key={pageN}>
                                <button onClick={() => onChangePage(pageN)} className={`${page == pageN? 'text-gray-200' : 'hover:bg-gray-100 hover:text-gray-700' } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-600 bg-white border border-gray-300 rounded-s-lg `} disabled={page == pageN}>{pageN}</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default ProductTable