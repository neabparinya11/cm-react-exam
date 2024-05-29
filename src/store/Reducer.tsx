import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../pages/HomePage'

interface ProductState {
    products: IProduct[]
}

const initialState: ProductState = {
    products: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        AddProduct: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload
        }
    }
})

export const { AddProduct } = productSlice.actions
export default productSlice.reducer