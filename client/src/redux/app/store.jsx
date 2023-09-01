import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from '../features/restourant/restaurantSlice'
import loggedReducer from '../features/logged/loggedSlice'
import productSlice from '../features/product/productSlice'
import categorySlice from '../features/category/categorySlice'
import cartSlice from '../features/cart/cartSlice'
import orderSlice from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    logged: loggedReducer,
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    order: orderSlice


  },
})