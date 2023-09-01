
import {  createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartSize: 0,
  cartItems: [],
  cartSum: 0
}






export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // extraReducers: builder => {

  // },
  reducers: {
    addTocart: (state, action) => {
      const newitem = {
        product: action.payload,
        quantity: 1
      }

      const existingItem = state.cartItems.find(item => item.product._id == action.payload._id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.cartSum += existingItem.product.price
      } else {
        state.cartSum += newitem.product.price
        state.cartSize += 1;
        state.cartItems.push(newitem);
      }
    },

    removeFormCart: (state, action) => {

      state.cartItems.map((e, index) => {
        if (e.product._id == action.payload._id) {
          if (e.quantity > 1) {
            e.quantity -= 1
            state.cartSum -= e.product.price
          }
          else if (e.quantity == 1) {
            state.cartItems.splice(index, 1)
            state.cartSum -= e.product.price

            state.cartSize -= 1

          }
          // state.cartSum -= action.payload.product.price * action.payload.quantity
        }
      })


    },

    removeAll: (state) => {

      state.cartItems = [];
      state.cartSum = 0;
      state.cartSize = 0;
    },
    setCartItem: (state,action) => {
      console.log(action.payload);
      state.cartItems = action.payload;
      console.log(state.cartItems);
    }


  }

}
)



export const { addTocart,setCartItem, removeFormCart, decreaseAmount, increaseAmount, removeAll } = cartSlice.actions
export default cartSlice.reducer