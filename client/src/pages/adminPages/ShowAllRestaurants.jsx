/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllRestaurants, resetmessage } from "../../redux/features/restourant/restaurantSlice"
import RestaurantCard from "../../components/RestaurantCard"

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from "react-toastify";
import { getCategories } from "../../redux/features/category/categorySlice";
import { showAllProducts } from "../../redux/features/product/productSlice";

function ShowAllRestaurants() {

  const dispatch = useDispatch()

  const { allRestaurants } = useSelector(state => state.restaurant)

  const { message } = useSelector(state => state.restaurant)

  useEffect(() => {
    dispatch(getAllRestaurants())
    dispatch(getCategories());
    dispatch(showAllProducts());
  },[])
  useEffect(() => {
    if (message?.status == true) {
      toast.success(message.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => { dispatch(resetmessage()) }
      });
    }
  }, [message])

  return (
    <div className="container d-flex flex-wrap">

      <ToastContainer />
      {allRestaurants.map((e) => {
        return (
          <div key={e._id} className="m-2 mb-5">
            <RestaurantCard restaurant={e}></RestaurantCard>

          </div>
        )
      })}


    </div>
  )
}

export default ShowAllRestaurants