import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

interface ILoginForm{
    email: string,
    password: string
}

const loginValidate = Yup.object().shape({
    email: Yup.string().min(1).required().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/), // change to regex
    password: Yup.string().min(8).required()
})

function LoginForm(){
    const form = useForm<ILoginForm>({
        resolver: yupResolver(loginValidate),
        defaultValues:{
            email: '',
            password: ''
        }
    })

    return form
}

export default LoginForm