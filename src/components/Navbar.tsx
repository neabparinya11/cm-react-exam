import { AppBar, Button, ButtonGroup, ThemeProvider, Typography } from "@mui/material"
import { Logout } from "../api/Login"
import { useNavigate } from "react-router-dom"
import { defaultTheme } from "../theme/DefaultTheme"

function Navbar() {
    const navigate = useNavigate()

    const onLogout = () => {
        Logout().then(() => navigate('/login'))
    }

    const onSummary = () => {
        navigate('/summary')
    }

    const onHome = () => {
        navigate('/')
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <AppBar position="absolute" sx={{ padding: 2, boxShadow: 1 }} color="secondary">
                <ButtonGroup variant="text" sx={{ display: 'flex', justifyContent: 'end' }} color='primary'>
                    <Button
                        onClick={()=> onHome()}
                    ><Typography fontWeight={'bold'}>Home</Typography>
                    </Button>
                    <Button
                        onClick={() => onSummary()}
                    ><Typography fontWeight={'bold'}>Summary</Typography>
                    </Button>
                    <Button
                        onClick={() => onLogout()}
                    ><Typography fontWeight={'bold'}>Logout</Typography>
                    </Button>
                </ButtonGroup>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar