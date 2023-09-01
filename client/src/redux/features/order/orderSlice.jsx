import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const initialState = {
  logged: []
}


export const order = createAsyncThunk('order', async (action) => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const items = action[0]
    const usedCoupon = action[1]
    const cartsumm = action[2]
    console.log(cartsumm);
    const response = await fetch("http://localhost:5000/api/user/order", {
      method: "POST" , 

      headers: {
        'Content-Type': 'application/json',
        'authorization': config
      },
      body: JSON.stringify({items, usedCoupon , cartsumm})
    })
    return response.data
    
  } catch (error) {
    console.log(error);
  }
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {


  },
  extraReducers: builder => {
    
    builder.addCase(order.fulfilled, (action) => {
      console.log(action);
    })
  },
})




export default orderSlice.reducer