import { useSelector } from "react-redux"
import { RootState } from "../store/Store"
import { Paper, Typography } from "@mui/material"
import { IProduct } from "./HomePage"
import { useMemo } from "react"

function SummaryPage(){
    const { products } = useSelector((select: RootState)=> select.products)
    const result = useMemo(()=>{ return products.reduce(( total, current: IProduct) => total + current.price, 0)},[products])

    return(
        <>
            <Paper>
                <Typography>Total: {result}</Typography>
            </Paper>
        </>
    )
}

export default SummaryPage