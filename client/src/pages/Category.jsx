/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../style/categories.css"
import { useDispatch, useSelector } from 'react-redux';
import CategoryCategories from '../components/CategoryCategories';
import ProductCardShow from '../components/ProductCardShow';
import { getAllRestaurants } from '../redux/features/restourant/restaurantSlice';
import { getCategories } from '../redux/features/category/categorySlice';
import { showAllProducts } from '../redux/features/product/productSlice';
import { getCoupons } from '../redux/features/logged/loggedSlice';
function Category() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get('name');
  const dispatch = useDispatch();
  const { allProducts } = useSelector(state => state.product)

  const [filteredProducts , setFilteredProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllRestaurants())
    dispatch(getCategories());
    dispatch(showAllProducts());
    dispatch(getCoupons());
  },[])

  useEffect(() => {
    
    const products = allProducts.filter((category) => category.category.toLowerCase().includes(categoryName.toLowerCase()))
    setFilteredProducts(products)
  }, [categoryName])

  return (
    <div className='d-flex height100'>
      <div className='col-2 kategoriler'>
        <div className='border border-2 kategoriesss'>
          <h2 className='text-center'>Kategoriler</h2>

          <CategoryCategories categoryName={categoryName}></CategoryCategories>
        </div>


      </div>
      <div className='urunler d-flex flex-wrap'>
        {filteredProducts.map((product) => {
          return (<ProductCardShow key={product._id} product={product}></ProductCardShow>)
        })}
      </div>
    </div>
  )
}

export default Category