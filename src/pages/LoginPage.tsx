import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import LoginForm from '../forms/LoginForm'
import { SubmitHandler } from 'react-hook-form'
import { Login } from '../api/Login'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState } from 'react'

interface ILoginForm {
    email: string,
    password: string
}

function LoginPage() {
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { isSubmitting, errors } } = LoginForm()
    const [ valid, setValid ] = useState<boolean>(false)

    const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
        Login(data.email, data.password).then((res) => {
            if (res.status == 200 && res.token != undefined) {
                Cookies.set('token', res.token)
                setValid(false)
                navigate("/")
            } else {
                setValid(true)
            }
        })
    }

    const onError = () => {

    }
    return (
        <Paper>
            <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
                <Box sx={{ display: 'flex', width: 1, height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4, gap: 2, width: 1 / 4 }}>
                        <Typography variant='h3' align='center'>Login</Typography>
                        {valid ? <Alert severity='error'>Email or password incorrect</Alert> : <></>}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 1 }}>
                            <Box width={'100%'}>
                                <TextField label='Email' {...register('email')} fullWidth />
                                {errors.email && <Typography color="error" >Email is invalid</Typography>}
                            </Box>
                            <Box width={'100%'}>
                                <TextField label='Password' type='password' {...register('password')} fullWidth />
                                {errors.password && <Typography color="error" >Password is invalid</Typography>}
                            </Box>
                            <Button type='submit' variant="contained" disabled={isSubmitting} >Submit</Button>
                        </Box>
                    </Paper>
                </Box>
            </form>
        </Paper>
    )
}

export default LoginPage