import { useSelector } from "react-redux"
import { RootState } from "../store/Store"
import { Box, Paper, ThemeProvider, Typography } from "@mui/material"
import { IProduct } from "./HomePage"
import { useMemo } from "react"
import { defaultTheme } from "../theme/DefaultTheme"

function SummaryPage(){
    const { products } = useSelector((select: RootState)=> select.products)
    const result = useMemo(()=>{ return products.reduce(( total, current: IProduct) => total + (current.price*current.stock), 0)},[products])

    return(
        <ThemeProvider theme={defaultTheme} >
            <Paper sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent'}}>
                <Box>
                    <Typography variant="h2">Amount of Product: {products.length}</Typography>
                    <Typography variant="h2">Total: {result.toLocaleString(undefined, {maximumFractionDigits: 5})}</Typography>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}

export default SummaryPage