import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  logged: localStorage.getItem("token") ? true : false,
  loggedUser: {},
  userCoupons: []
}


export const updateUser = createAsyncThunk('updateUser', async (action) => {

  const config = "bearer " + localStorage.getItem("token")
  const { firstName, lastName, address, country,image,id,balance } = action


    const body = {
      firstName,
      lastName,
      address,
      country,
      balance
    }

    const response = await fetch("http://localhost:5000/api/user/updateprofile/", {

      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'authorization': config,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    })

    if(image){
      const formData = new FormData(); // FormData nesnesi oluştur
  
      formData.append('profile_image', image);
  
      await fetch("http://localhost:5000/api/user/profileupload/" + id, {
  
        method: 'POST',
        body: formData,
        headers: {
          'authorization': config,
        },
      })

    }

    return response.data



})
export const getCoupons = createAsyncThunk('getCoupons', async () => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/api/user/showcoupons", {
      headers: {
        'authorization': config
      },
    })
    return response.data
    
  } catch (error) {
    console.log(error.response);
    throw error
  }
})


export const setUserDetails = createAsyncThunk('getUserDetails', async () => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/api/user/profile", {
      headers: {
        'authorization': config
      },
    })
    return response.data
    
  } catch (error) {
    console.log(error.response);
    throw error
  }
})

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLogged: (state,action) => { 
        state.logged = action.payload
    },
    exit: (state) =>{
      state.logged = false,
      state.loggedUser = {}
      localStorage.removeItem("token")
    }

  },
  extraReducers: builder => {
    
    builder.addCase(setUserDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(setUserDetails.fulfilled, (state, action) => {
      state.loggedUser = action?.payload?.user
      state.loading = false
    })
    builder.addCase(getCoupons.fulfilled, (state,action) => {
      state.userCoupons = action.payload.coupons
    })
    builder.addCase(setUserDetails.rejected, (state) => {
      localStorage.removeItem("token")
      state.loggedUser = {}
      state.logged = false
    })
  },
})


export const {setLogged ,exit} = loggedSlice.actions


export default loggedSlice.reducer