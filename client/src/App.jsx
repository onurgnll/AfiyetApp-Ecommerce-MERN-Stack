/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurants, getOpenRestaurants } from './redux/features/restourant/restaurantSlice';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Cart from './pages/Cart';
import LastOrders from './pages/LastOrders';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import { getCoupons, setUserDetails } from './redux/features/logged/loggedSlice';
import CreateRestaurant from './pages/adminPages/CreateRestaurant';
import ShowAllRestaurants from './pages/adminPages/ShowAllRestaurants';
import EditRestaurant from './pages/restaurantOwnerPages/EditRestaurant';
import AddProduct from './pages/restaurantOwnerPages/AddProduct';
import EditProduct from './pages/restaurantOwnerPages/EditProduct';
import Category from './pages/Category';
import Search from './pages/Search';
import { getCategories } from './redux/features/category/categorySlice';
import { getFavoritesForLogged, showAllProducts } from './redux/features/product/productSlice';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  const dispatch = useDispatch();

  const { logged, loggedUser } = useSelector(state => state.logged)
  useEffect(() => {
    dispatch(getOpenRestaurants());

    dispatch(getAllRestaurants())
    dispatch(getCategories());
    dispatch(showAllProducts());
    dispatch(getFavoritesForLogged());
    dispatch(getCoupons());
    if (logged) {

      dispatch(setUserDetails())
    }
  }, []);



  return (
    <div className='App'>

      <Header className="header"> </Header>
      <div className='mainbody'>
        <Routes>

          <Route exact path="/"   element={<Index></Index>} ></Route>
          <Route
            path="/addproduct/:restaurantid"
            element={loggedUser?.role === "owner" || loggedUser?.role === "admin" ? (<AddProduct />) : (<NotFound></NotFound>)}
          />
          <Route
            path="/editproduct/:productid"
            element={loggedUser?.role === "owner" || loggedUser?.role === "admin" ? (<EditProduct></EditProduct>) : (<NotFound></NotFound>)}
          />
          <Route
            path="/login"
            element={logged ? <Navigate to="/"></Navigate> : <RegisterPage></RegisterPage>}
          />
          <Route
            path="/register"
            element={logged ? <Navigate to="/"></Navigate> : <RegisterPage></RegisterPage>}
          />
          <Route
            path="/category"
            element={<Category></Category>}
          />
          <Route
            path="/search"
            element={<Search></Search>}
          />
          <Route
            path="/cart"
            element={logged ? <Cart></Cart> : <Navigate to="/login"></Navigate>}
          />
          <Route
            path="/account"
            element={logged ? <Account></Account> : <Navigate to="/login"></Navigate>}
          />
          <Route
            path="/favorites"
            element={logged ? <Favorites></Favorites> : <Navigate to="/login"></Navigate>}
          />
          <Route
            path="/createRestaurant"
            element={loggedUser?.role == "admin" ? <CreateRestaurant></CreateRestaurant> : <Navigate to="/"></Navigate>}
          />
          <Route
            path="/editRestaurant/:restaurantid"
            element={loggedUser?.role === "owner" || loggedUser?.role === "admin" ? (
              <EditRestaurant />
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route
            path="/restaurant/:restaurantname"
            element={<RestaurantDetails></RestaurantDetails>}

          />
          <Route
            path="/showAllRestaurants"
            element={loggedUser?.role == "admin" ? <ShowAllRestaurants></ShowAllRestaurants> : <Navigate to="/"></Navigate>}
          />
          <Route
            path="/lastorders"
            element={logged ? <LastOrders></LastOrders> : <Navigate to="/login"></Navigate>}
          />
          <Route path="*" element={<NotFound></NotFound>} ></Route>
        </Routes>


      </div>

    </div>
  )
}

export default App
