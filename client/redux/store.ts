import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    notification: notificationReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch