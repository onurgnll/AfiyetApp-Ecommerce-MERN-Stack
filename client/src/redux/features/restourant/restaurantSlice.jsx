import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {
  loading: false,
  openedRestaurants: [],
  allRestaurants: [],
  restaurantOwner: "",
  editingRestaurant: {},
  error: null,
  message: null,
  gotRestaurant: {}
}


export const updateRestaurant = createAsyncThunk('updateRestaurant', async (action) => {

  const config = "bearer " + localStorage.getItem("token")
  const { name, address, id, country, image, closeTime, openTime, isOpen, description } = action
  const a = isOpen == "true"
console.log(country);
  let there;
  await fetch("http://localhost:5000/api/restaurant/getrestaurantbyname/" + name, {

    method: 'GET',
    headers: {
      'authorization': config
    },
  }).then((response) => {
    return response.json()
  }).then((data) => {
    if (data.success == true) {
      there = data.restaurant
      if(id != data.restaurant._id){

        throw new Error("Böyle Bir Restoran Zaten Var")
      }
    }
  })

  if (there) {
    const body = {
      name,
      address,
      country,
      closeTime,
      openTime,
      isOpen: a,
      description
    }
    const response = await fetch("http://localhost:5000/api/admin/updaterestaurant/" + id, {

      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'authorization': config,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    })



    const formData = new FormData(); // FormData nesnesi oluştur

    formData.append('restaurant_image', image);

    await fetch("http://localhost:5000/api/restaurant/restaurantupload/" + id, {

      method: 'POST',
      body: formData,
      headers: {
        'authorization': config,
      },
    })
    return response.data


  }

})







export const deleteRestaurant = createAsyncThunk('deleteRestaurant', async (action) => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.delete("http://localhost:5000/api/admin/deleterestaurant/" + action, {
      headers: {
        'authorization': config
      },
    })
    return response.data

  } catch (error) {
    console.log(error);

  }
})

export const getRestaurantOwner = createAsyncThunk('getRestaurantOwner', async (action) => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/api/user/userdetails/" + action, {
      headers: {
        'authorization': config
      },
    })

    return response.data

  } catch (error) {
    console.log(error);

  }
})



export const createRestaurant = createAsyncThunk('createRestaurant', async (action) => {
  const config = "bearer " + localStorage.getItem("token")
  const { name, address, owneremail, country, image } = action


  let user;
  await fetch("http://localhost:5000/api/user/userdetailsbyemail/" + owneremail, {

    method: 'GET',
    headers: {
      'authorization': config
    },
  }).then((response) => {
    return response.json()
  }).then((data) => {
    if (data.success == true) {
      user = data.user
    } else {
      throw new Error(data.message)
    }
  })

  if (user) {
    
    if(user.restaurants.length > 0){
      throw new Error("Bu Kullanıcının zaten restoranı var")
    }
    
    const body = {
      name,
      address,
      country,
      controllerUser: user._id
    }


    let restaurant;

    await fetch("http://localhost:5000/api/admin/createRestaurant", {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'authorization': config,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    }).then((response) => {

      return response.json()

    }).then((data) => {
      if (data.success == true) {
        restaurant = data.restaurant
      } else {
        throw new Error(data.message)
      }
    })


    const formData = new FormData(); // FormData nesnesi oluştur

    formData.append('restaurant_image', image);

    await fetch("http://localhost:5000/api/restaurant/restaurantupload/" + restaurant._id, {

      method: 'POST',
      body: formData,
      headers: {
        'authorization': config,
      },
    }).then((response) => {

      return response.json()

    }).then((data) => {
      if (data.success == false) {
        throw new Error(data.message)
      }
    })

    return restaurant

  }


})
export const getAllRestaurants = createAsyncThunk('getAllRestaurants', async () => {
  const config = "bearer " + localStorage.getItem("token")
  const response = await axios.get("http://localhost:5000/api/restaurant/showallrestaurants", {
    headers: {
      'authorization': config
    },
  })
  return response.data
})

export const getRestaurantDetails = createAsyncThunk('getRestaurantDetails', async (action) => {
  const config = "bearer " + localStorage.getItem("token")
  const response = await axios.get("http://localhost:5000/api/restaurant/showrestaurant/" + action, {
    headers: {
      'authorization': config
    },
  })
  return response.data
})


export const getRestaurantbynamee = createAsyncThunk('getRestaurantbynamee', async (action) => {
  const response = await axios.get("http://localhost:5000/api/restaurant/getrestaurantbyname/" + action, {
  })
  return response.data
})

export const getOpenRestaurants = createAsyncThunk('getOpenRestaurants', async () => {
  const response = await axios.get("http://localhost:5000/api/restaurant/showopenrestaurants")
  return response.data
})

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  extraReducers: builder => {

    builder.addCase(updateRestaurant.rejected, (state, action) => {
      state.error = { status: false, message: action.error.message }
    })
    builder.addCase(updateRestaurant.fulfilled, (state) => {
      state.message = { status: true, message: "Restoran Başarıyla Güncellendi" }
    })
    builder.addCase(createRestaurant.rejected, (state, action) => {
      state.error = { status: false, message: action.error.message }
    })
    builder.addCase(createRestaurant.fulfilled, (state) => {
      state.message = { status: true, message: "Restoran Başarıyla Oluşturuldu" }
    })

    builder.addCase(getOpenRestaurants.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getOpenRestaurants.fulfilled, (state, action) => {
      state.openedRestaurants = action.payload.restaurants
      state.loading = false
    })
    builder.addCase(getAllRestaurants.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
      state.allRestaurants = action.payload.restaurants
      state.loading = false
    })
    builder.addCase(getRestaurantOwner.fulfilled, (state, action) => {
      state.restaurantOwner = action.payload.user
      state.loading = false
    })
    builder.addCase(getRestaurantDetails.fulfilled, (state, action) => {
      state.editingRestaurant = action.payload.restaurant
      state.loading = false
    })
    builder.addCase(deleteRestaurant.fulfilled, (state, action) => {
      const deletedProductId = action.payload.restaurant._id;
      state.allRestaurants = state.allRestaurants.filter(restaurant => restaurant._id !== deletedProductId);

      state.message = { status: true, message: "Restoran Başarıyla Silindi" }
    });
    builder.addCase(getRestaurantbynamee.fulfilled, (state, action) => {
      state.gotRestaurant = action.payload.restaurant
    });
  },
  reducers: {
    resetError: (state) => {
      state.error = {}
    },
    resetmessage: (state) => {
      state.message = {}
    },
    setError: (state, action) => {
      console.log("action");
      console.log(action.payload);
      state.error = { status: action.payload.status, message: action.payload.message }
      console.log(state.error);
    }

  }
})



export const { resetError, setError, resetmessage } = restaurantSlice.actions
export default restaurantSlice.reducer