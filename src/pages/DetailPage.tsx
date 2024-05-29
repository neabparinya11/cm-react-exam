import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../api/ApiInstance"
import { IProduct } from "./HomePage"

function DetailPage() {
    const params = useParams()
    const [profileProduct, setProfileProduct] = useState<IProduct>()

    useEffect(() => {
        const fetch = async () => {
            const res = await axiosInstance.get(`/products/${params.id}`).then(res => res.data)
            setProfileProduct(res)
        }
        fetch()
    }, [params.id])

    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                    {profileProduct && profileProduct.images.map((url) => <img key={url} src={url} alt="" width={150} height={150} />)}
                </div>
                <div className="p-5">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{profileProduct && profileProduct.title}</h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{profileProduct && profileProduct.price}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{profileProduct && profileProduct.stock}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailPage