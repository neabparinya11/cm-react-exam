import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../api/ApiInstance"
import { IProduct } from "./HomePage"
import DefaultImage from '/default-image.jpg'

function DetailPage() {
    const params = useParams()
    const [profileProduct, setProfileProduct] = useState<IProduct>()
    const [ selectedImg, setSelectedImg ] = useState<string>('')

    useEffect(() => {
        console.log("componentDidMount")
        const fetch = async () => {
            console.log("Fetch Data")
            const res:IProduct = await axiosInstance.get(`/products/${params.id}`).then(res => res.data)
            
            console.log("Set Data")
            setProfileProduct(res)
            setSelectedImg(res.images[0])
        }
        fetch()

        return () => console.log("componentUnMount")
    }, [params.id])

    return (
        <div className="flex-colum bg-transparent justify-center items-center p-12 bg-white border-b h-screen">
            <div className="flex-row md:flex justify-evenly p-2 mt-12 rounded-lg border-2 border-gray-300">
                <div className="grid gap-4">
                    <div className="flex justify-center">
                        <img className="max-h-64 max-w-full rounded-lg" src={selectedImg} alt="" onError={(e) => {e.currentTarget.src = DefaultImage}} />
                    </div>
                    <div className={`grid grid-cols-3 gap-2`}>
                        {profileProduct && profileProduct.images.map((url) => <button key={url} onClick={() => setSelectedImg(url)}><img src={url} alt="" className="h-36 w-36 rounded-lg border-2 " /></button>)}
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-gray-700">
                    <h1 className="text-2xl font-bold ">{profileProduct?.title}</h1>
                    <h3 className="text-xl ">Price: {profileProduct?.price.toLocaleString(undefined, {maximumFractionDigits: 3})}</h3>
                    <h3 className="text-xl">Stock: {profileProduct?.stock}</h3>
                </div>
            </div>
        </div>
    )
}

export default DetailPage