/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOnRestaurant, showAllProducts } from "../../redux/features/product/productSlice";
import ProductCard from "../../components/ProductCard";

import "../../style/restaurantedit.css"
import { getAllRestaurants } from '../../redux/features/restourant/restaurantSlice';
import { getCategories } from '../../redux/features/category/categorySlice';


function EditRestaurantProducts({restaurantid}) {
    const navigate = useNavigate();

    const {productsOnRestaurant} = useSelector(state => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRestaurants())
        dispatch(getCategories());
        dispatch(showAllProducts());
      },[])
    useEffect(() => {
        dispatch(getProductsOnRestaurant(restaurantid))
        console.log("girdi");
    },[])
    

    return (
        <div className='d-flex flex-wrap'>


            {productsOnRestaurant.map((product) => {
                return(

                    <ProductCard key={product._id} product={product}> </ProductCard>
                )
                
            })}


            <div onClick={()=> navigate("/addproduct/" + restaurantid)}>
                <Card sx={{ width: 250, height: 339 }} className="dfa cursor-pointer">
                    <AddIcon className="eklediv" sx={{ fontSize: 250 }}></AddIcon>
                </Card>


            </div>

        </div>
    )
}

export default EditRestaurantProducts