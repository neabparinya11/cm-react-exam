import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Middleware({ children }: { children: JSX.Element }) {
    // const [isLoggin, setIsLoggIn] = useState<boolean>(false)

    // useEffect(() => {
    //     const checkToken = () => {
    //         const token = Cookies.get('token')
    //         if (!token || token == undefined) {
    //             setIsLoggIn(false)
    //             return <Navigate to={"/login"} replace />
    //         }
    //         setIsLoggIn(true)
    //     }
    //     checkToken()
    // }, [isLoggin])

    // return children

    const token = Cookies.get('token')

    if(!token || token == undefined) {
        return <Navigate to={"/login"} replace />
    }else{
        return children
    }
} 