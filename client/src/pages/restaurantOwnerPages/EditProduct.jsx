/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../../style/restaurantedit.css"
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, resetmessagee, showAllProducts, updateProduct } from '../../redux/features/product/productSlice';

import { ToastContainer, toast } from "react-toastify";
import { getAllRestaurants } from '../../redux/features/restourant/restaurantSlice';
import { getCategories } from '../../redux/features/category/categorySlice';
function EditProduct() {
  const navigate = useNavigate()
  const { editingProduct } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getAllRestaurants())
    dispatch(getCategories());
    dispatch(showAllProducts());
  },[])
  const { productid } = useParams();




  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'asf',
    description: '',
    id: '',
});

const { messagee } = useSelector(state => state.product)

useEffect(()=>{

  if(messagee?.status == true){
    toast.success(messagee.message, {
      position: "bottom-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {dispatch(resetmessagee()) ; navigate("/editRestaurant/" + editingProduct.restaurantid)}
  });
  }
},[messagee])


useEffect(() => {
    dispatch(getProductDetails(productid));

}, [productid]);

useEffect(() => {
    setFormData((prevData) => ({
        ...prevData,
        price: editingProduct?.price || '',
        category: editingProduct?.category || '',
        name: editingProduct?.name || '',
        description: editingProduct?.description || '',
        id:  editingProduct?._id || ""
    }));

}, [editingProduct]);

const handleChangeform = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleFileChange = (e) => {

    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    
    dispatch(updateProduct(formData))

}


  return (
    <div className="alldiv dfa">
      
      <ToastContainer />
      <div className="innerdiv d-flex justify-content-center flex-column">
        <h2 className='text-center mt-2'>Ürünü Düzenle</h2>
        <form onSubmit={handleSubmitForm} className="w-100 d-flex flex-column align-items-center">
          <div className="d-flex flex-column w-50 mt-2">
            <label>Ürün İsmi</label>
            <input onChange={handleChangeform} value={formData.name} className="inputt" name="name" type="text" placeholder="Ürün ismi" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Ürün Açıklaması</label>
            <input value={formData.description} onChange={handleChangeform} className="inputt" name="description" type="text" placeholder="Açıklama" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label >Ürün Fotoğrafı</label>
            <input onChange={handleFileChange} name="image" type="file" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Ürün Fiyatı</label>
            <input value={formData.price} className="inputt" onChange={handleChangeform} name="price" type="number" placeholder="Fiyat" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Ürün Kategorisi</label>
            <select name="category" value={formData.category} onChange={handleChangeform} className="selectt" id="cars">
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
            <button type="submit" onClick={handleSubmitForm} className="p-2 px-4 rounded-pill createbutton">Düzenle</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct