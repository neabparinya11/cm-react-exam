import Admin from '../data/UserData.json'

async function Login(email: string, password: string) {
    if (email == Admin.email && password == Admin.password) {
        // const token = sign({ user: email}, 'secret')
        return { status: 200, token: '' }
    } else {
        return { status: 400 }
    }
}

export {
    Login
}