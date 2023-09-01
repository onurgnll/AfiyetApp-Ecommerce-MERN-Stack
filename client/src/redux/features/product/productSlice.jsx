import { formGroupClasses } from '@mui/material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {
  loading: false,
  productsOnRestaurant: [],
  messagee: {},
  editingProduct:{},
  allProducts: []
}
export const deleteProduct = createAsyncThunk('deleteProduct', async (action) => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.delete("http://localhost:5000/api/restaurant/removeProduct/" + action, {
      headers: {
        'authorization': config
      },
    })
    return response.data

  } catch (error) {
    console.log(error);

  }
})
export const showAllProducts = createAsyncThunk('showAllProducts', async () => {
  try {
    const config = "bearer " + localStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/api/restaurant/showAllProducts/", {
      headers: {
        'authorization': config
      },
    })
    return response.data

  } catch (error) {
    console.log(error);

  }
})


export const createProduct = createAsyncThunk('createProduct', async (action) => {
  try {
    const config = "bearer " + localStorage.getItem("token")

    const { name, categoryname, description,price , restaurantid, image } = action
    console.log(action);

    const body = {
      name,
      price,
      description,
      restaurantid,
      categoryname

    }

    const response = await fetch("http://localhost:5000/api/restaurant/addNewProduct", {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'authorization': config,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    })

    const result = await response.json()
    console.log(result);
    if(image){
      const formData = new FormData(); // FormData nesnesi oluştur
  
      formData.append('product_image', image);
  
      await fetch("http://localhost:5000/api/restaurant/productupload/" + result.product._id, {
  
        method: 'POST',
        body: formData,
        headers: {
          'authorization': config,
        }

      })
    }
    return response.data

  } catch (error) {
    
    console.log(error);
    return error

  }
})


export const getProductsOnRestaurant = createAsyncThunk('getProductsOnRestaurant', async (action) => {

  const config = "bearer " + localStorage.getItem("token")
  const response = await axios.get("http://localhost:5000/api/restaurant/showProductsOnRestaurant/" + action, {
    headers: {
      'authorization': config
    },
  })
  return response.data
})


export const getProductDetails = createAsyncThunk('getProductDetails', async (action) => {
  const config = "bearer " + localStorage.getItem("token")
  const response = await axios.get("http://localhost:5000/api/restaurant/showproduct/" + action, {
    headers: {
      'authorization': config
    },
  })
  return response.data
})
export const getFavoritesForLogged = createAsyncThunk('getFavoritesForLogged', async () => {
  const config = "bearer " + localStorage.getItem("token")
  
  const response = await axios.get("http://localhost:5000/api/user/getFavoritesForLogged", {
    headers: {
      'authorization': config
    },
  })
  return response.data
})







export const updateProduct = createAsyncThunk('updateProduct', async (action) => {

  const config = "bearer " + localStorage.getItem("token")
  const { name, id, price, image, category, description } = action


    const body = {
      name,
      price,
      category,
      description
    }
    const response = await fetch("http://localhost:5000/api/restaurant/updateProduct/" + id, {

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
  
      formData.append('product_image', image);
  
      await fetch("http://localhost:5000/api/restaurant/productupload/" + id, {
  
        method: 'POST',
        body: formData,
        headers: {
          'authorization': config,
        },
      })

    }

    return response.data



})









export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    
    builder.addCase(getFavoritesForLogged.fulfilled, (state, action) => {
      state.allFavorites = action.payload.products
    }),


    builder.addCase(getProductsOnRestaurant.fulfilled, (state, action) => {
      state.productsOnRestaurant = action.payload.products
      state.loading = formGroupClasses
    }),
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      // action.payload'dan silinen ürünün kimliğini alabilirsiniz
      const deletedProductId = action.payload.product._id;
      state.messagee = { status: true, message: "Ürün Başarıyla Silindi" }
      state.productsOnRestaurant = state.productsOnRestaurant.filter(product => product._id !== deletedProductId);
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.messagee = { status: true, message: "Ürün Başarıyla Oluşturuldu" }
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.messagee = { status: true, message: "Ürün Başarıyla Güncellendi" }
    });
 
    builder.addCase(showAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload.products
    })
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.editingProduct = action.payload.product
      state.loading = false
    })
  },
  reducers: {

    resetmessagee: (state) => {
      state.messagee = {}
    }
  }
})



export const { resetmessagee } = productSlice.actions
export default productSlice.reducer