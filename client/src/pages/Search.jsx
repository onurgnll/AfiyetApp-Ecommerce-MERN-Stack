/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import "../style/arama.css"
import ProductCardShow from '../components/ProductCardShow';
import CategoryMini from '../components/CategoryMini';
import RestaurantSearch from '../components/RestaurantSearch';
function Search() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searching = searchParams.get('query');
    const { allRestaurants } = useSelector(state => state.restaurant)
    const { categories } = useSelector(state => state.category)
    const { allProducts } = useSelector(state => state.product)

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);


    useEffect(() => {
        
        setFilteredCategories([])
        setFilteredProducts([])
        setFilteredRestaurants([])

        const categoriess = categories.filter((category) => category.name.toLowerCase().includes(searching.toLowerCase()))
        const restaurants = allRestaurants.filter((category) => category.name.toLowerCase().includes(searching.toLowerCase()))
        const products = allProducts.filter((category) => category.name.toLowerCase().includes(searching.toLowerCase()))

        setFilteredCategories(categoriess)
        setFilteredProducts(products)
        setFilteredRestaurants(restaurants)
        

    }, [searching])

    return (
        <div className='d-flex flex-column arama'>
            {filteredProducts.length > 0 ? (
                <div className='products'>
                    <div className='genellll'>Yemekler</div>
                    <div className='d-flex flex-wrap'>

                        {filteredProducts.map((product) => {
                            return (<ProductCardShow key={product._id} product={product}></ProductCardShow>)
                        })}
                    </div>

                </div>
            ) : (
                <div></div>
            )}
            
            {filteredCategories.length > 0 ? (
                <div className='products'>
                    <div className='genellll'>Kategoriler</div>
                    <div className='d-flex flex-wrap'>
                        {filteredCategories.map((category) => {
                            return (<CategoryMini key={category._id} category={category}></CategoryMini>)
                        })}
                    </div>

                </div>
            ) : (
                <div></div>
            )}

        </div>
    )
}

export default Search