/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import "../../style/addproduct.css"
import { createProduct, showAllProducts } from '../../redux/features/product/productSlice';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from "react-toastify";
import { resetmessagee } from '../../redux/features/product/productSlice';
import { getAllRestaurants } from '../../redux/features/restourant/restaurantSlice';
import { getCategories } from '../../redux/features/category/categorySlice';

function AddProduct() {
  const { restaurantid } = useParams();
  const [formData, setFormData] = useState({});
  console.log(restaurantid);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRestaurants())
    dispatch(getCategories());
    dispatch(showAllProducts());
  },[])
  const { messagee } = useSelector(state => state.product)

  useEffect(() => {

    if (messagee?.status == true) {
      toast.success(messagee.message, {
        position: "bottom-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          dispatch(resetmessagee());
          // navigate("/editrestaurant/" + restaurantid)
        }
      });
    }
  }, [messagee])


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createProduct(formData))

  };



  useEffect(() => {
    setFormData({
      ...formData,
      restaurantid: restaurantid,
      categoryname: "Çorba"
    });
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };


  return (

    <div className="alldivv dfa">

      <ToastContainer />
      <div className="innerdivv d-flex justify-content-center flex-column ">
        <h2 className='text-center'>Ürün Oluştur</h2>
        <form onSubmit={submitHandler} className="w-100 d-flex flex-column align-items-center">
          <div className="d-flex flex-column w-50 mt-1">
            <label>Ürün İsmi</label>
            <input onChange={handleInputChange} className="inputt" name="name" type="text" placeholder="Ürün İsmi" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Fiyat</label>
            <input onChange={handleInputChange} className="inputt" name="price" type="number" placeholder="Fiyat" />

          </div>

          <div className="d-flex flex-column w-50 mt-3">
            <label>Açıklama</label>
            <input onChange={handleInputChange} className="inputt" name="description" type="text" placeholder="Ürün Açıklaması" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label >Ürünün Fotoğrafı</label>
            <input onChange={handleFileChange} name="image" type="file" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Ürünün Kategorisi</label>
            {/* <input onChange={handleInputChange} className="inputt" name="categoryname" type="text" placeholder="Kategori" /> */}
            <select name="categoryname" onChange={handleInputChange} className="selectt" id="cars">
              <option value="Çorba">Çorba</option>  
              <option value="Makarna">Makarna</option>
              <option value="Döner">Döner</option>
              <option value="Kebap">Kebap</option>
              <option value="Burger">Burger</option>
              <option value="Çiğ Köfte">Çiğ Köfte</option>
              <option value="Kahvaltı">Kahvaltı</option>
              <option value="Köfte">Köfte</option>
              <option value="Lahmacun">Lahmacun</option>
              <option value="Mantı">Mantı</option>
              <option value="Börek">Börek</option>
              <option value="Tatlılar">Tatlılar</option>
              <option value="Deniz Ürünleri">Deniz Ürünleri</option>
            </select>
          </div>
          <div className="mt-4">
            <button type="submit" className="p-2 px-4 rounded-pill createbutton">Oluştur</button>
          </div>


        </form>




      </div>



    </div>


  )
}

export default AddProduct