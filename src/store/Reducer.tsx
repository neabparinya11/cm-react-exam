import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        AddProduct: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { AddProduct } = productSlice.actions
export default productSlice.reducer