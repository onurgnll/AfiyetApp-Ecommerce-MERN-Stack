
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {
  products : [],
  categories: []
}


export const getItemsFromCategory = createAsyncThunk('getItemsFromCategory', async (action) => {
  const response = await axios.get("http://localhost:5000/api/user/showcategoryitems?name=" + action,)
  return response.data
})
export const getCategories = createAsyncThunk('getCategories', async () => {
  const response = await axios.get("http://localhost:5000/api/user/showcategories")
  return response.data
})






export const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: builder => {
    
    builder.addCase(getItemsFromCategory.fulfilled, (state, action) => {
      state.products = action.payload.products
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories
    })
    

  },
  reducers: {

  }
})



export default categorySlice.reducer