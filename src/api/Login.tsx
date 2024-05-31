import Admin from '../data/UserData.json'
import Cookies from 'js-cookie'

async function Login(email: string, password: string) {
    if (email == Admin.email && password == Admin.password) {
        return { status: 200, token: `email:${email}` }
    } else {
        return { status: 400 }
    }
}

async function Logout(){
    Cookies.remove('token')
}

export {
    Login,
    Logout
}