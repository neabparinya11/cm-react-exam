import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import LoginForm from '../forms/LoginForm'
import { SubmitHandler } from 'react-hook-form'
import { Login } from '../api/Login'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface ILoginForm {
    email: string,
    password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { isSubmitting, errors } } = LoginForm()

    const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
        Login(data.email, data.password).then((res) => {
            if (res.status == 200 && res.token != undefined) {
                Cookies.set('token', res.token)
                navigate("/")
            } else {
                console.log("error")
            }
        })
    }

    const onError = () => {

    }
    return (
        <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
            <Box sx={{ display: 'flex', width: 1, height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: [], gap: 2 }}>
                    <Typography variant='h3' align='center'>Login</Typography>
                    {(errors.email || errors.password) && <Alert>Email or password incorrect</Alert>}
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginX: 2, gap: 2 }}>
                        <TextField label='Email' {...register('email')} />
                        <TextField label='Password' type='password' {...register('password')} />
                        <Button type='submit' disabled={isSubmitting} >Submit</Button>
                    </Box>
                </Paper>
            </Box>
        </form >
    )
}

export default LoginPage