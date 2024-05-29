import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Reducer'

const store = configureStore({
    reducer:{
        products: productSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>