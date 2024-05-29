import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

// const rootReducer = combineReducers({
//     productSlice,
// })

const persistedReducer = persistReducer(persistConfig, productSlice)

// const store = configureStore({
//     reducer:{
//         products: productSlice
//     },
// })

const store = configureStore({
    reducer: {
        products : persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['_persist'],
            },
        }),
})

const persisitor = persistStore(store)

export {
    store,
    persisitor
}
export type RootState = ReturnType<typeof store.getState>