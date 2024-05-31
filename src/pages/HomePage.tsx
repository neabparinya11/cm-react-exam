import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from 'react-redux'
import { AddProduct } from '../store/Reducer'
import ProductTable from "../components/ProductTable"
import { useSelector } from 'react-redux'
import { RootState } from "../store/Store"
import axiosInstance from "../api/ApiInstance"

export interface IProduct {
    id: number,
    title: string,
    description: string,
    brand: string,
    images: string[],
    thumbnail: string,
    discountPercentage: number,
    category: string,
    price: number,
    rating: number,
    stock: number,
    totalPrice?: number
}

export interface IStoreProduct {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

function HomePage() {
    const dispatch = useDispatch()
    const [ search, setSearch ] = useState<string>("")
    const [ filterText, setFilterText ] = useState<string>("")
    const { products } = useSelector((state: RootState)=> state.products)
    const [ store, setStore ] = useState<IStoreProduct>({} as IStoreProduct)
    const [ amountProducts, setAmountProduct ] = useState<number>(30)
    const [ pageNumber, setPageNumber ] = useState<number>(0)

    useEffect(() => {
        const fetchProduct = async () => {
            const res: IStoreProduct = await axiosInstance.get('/products').then(res => res.data)
            const resultAll: IStoreProduct = await axiosInstance.get(`/products?skip=0&limit=${res.total}`).then(res => res.data)
            setStore(res)
            setAmountProduct(res.limit)
            
            dispatch(AddProduct(resultAll.products))
        }
        fetchProduct()
    }, [dispatch])

    const onSearching = useCallback((value: string)=> {
        setSearch(value)
    },[setSearch])   

    const resultSearchData:IProduct[] = useMemo(()=>{
        if(search != ""){
            return products.filter((data:IProduct)=> data.title.toLowerCase().includes(search.toLowerCase()))
        }else{
            return products
        }
    },[products, search])

    const resultFilterData = useMemo(()=>{
        switch (filterText){
            case "All":
                setPageNumber(0)
                return resultSearchData
            case "Price more than 1000":
                setPageNumber(Math.ceil(resultSearchData.filter((data:IProduct)=> data.price > 1000 && data.discountPercentage > 0).length / amountProducts))
                return resultSearchData.filter((data:IProduct)=> data.price > 1000 && data.discountPercentage > 0)
            case "Total Price":
                setPageNumber(Math.ceil(resultSearchData.length/ amountProducts))
                return resultSearchData.map((data) => ({
                    ...data,
                    totalPrice: (data.stock*data.price)
                }))
            case "Rating":
                setPageNumber(Math.ceil(resultSearchData.length/ amountProducts))
                return resultSearchData.map(x => x).sort((a, b)=> b.rating - a.rating).sort((a, b) => a.price - b.price)
            default:
                setPageNumber(Math.ceil(resultSearchData.length / amountProducts))
                return resultSearchData
        }
    },[amountProducts, filterText, resultSearchData])

    return (
        <div className="flex-column bg-transparent justify-center items-center p-16 bg-white border-b">
            <div className="flex-column md:flex gap-6 p-7 bg-white border-b">
                <form action="">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Search</label>
                   <input 
                    type="text" 
                    placeholder="Search name..." 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                    onChange={(e)=> onSearching(e.currentTarget.value)}    
                /> 
                </form>
                <form action="" className="">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                    <select onChange={(e)=> setFilterText(e.currentTarget.value)} name="" id="" defaultValue={"Choose a filter"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="Choose a filter">Choose a filter</option>
                        <option value="All">All</option>
                        <option value="Price more than 1000">Price more than 1000</option>
                        <option value="Total Price">Total Price</option>
                        <option value="Rating">Rating</option>
                    </select>
                </form>
            </div>
            <ProductTable data={resultFilterData} pageNumber={pageNumber} amountProduct={store.limit} />
        </div>
    )
}

export default HomePage