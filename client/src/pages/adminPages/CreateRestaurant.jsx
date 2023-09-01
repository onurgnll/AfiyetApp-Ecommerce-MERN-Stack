/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import "../../style/createrestaurant.css"
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant, resetError, resetmessage } from "../../redux/features/restourant/restaurantSlice";
import { useNavigate } from "react-router-dom";
// or
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from "react-toastify";


function CreateRestaurant() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {error, message} = useSelector(state => state.restaurant)

  useEffect(()=>{
    if(error?.status == false){
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {dispatch(resetError())}
    });
    }
    if(message?.status == true){
      toast.success(message.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {dispatch(resetmessage()); navigate("/showallrestaurants")}
    });
    }
  },[error,message])

  const submitHandler = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Bu Restoranı Oluşturmak İstiyor musun?',
      message: 'Emin Misin?.',
      buttons: [
        {
          label: 'Evet',
          onClick: () => {
            
            dispatch(createRestaurant((formData)))
        }},
        {
          label: 'Hayır'
        }
      ]
    });
  };

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

    <div className="createrestaurantcontainer dfa">
      
      <ToastContainer />
      <div className="innerdiva d-flex justify-content-center ">
        <form onSubmit={submitHandler} className="w-100 d-flex flex-column align-items-center">
          <div className="d-flex flex-column w-50 mt-5">
            <label>Restoran İsmi</label>
            <input required onChange={handleInputChange} className="inputt" name="name" type="text" placeholder="Restoranın İsmi" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Restoran Sahibi Emaili</label>
            <input required onChange={handleInputChange} className="inputt" name="owneremail" type="email" placeholder="Kontrol Eden Kullanıcı" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label >Restoran Fotoğrafı</label>
            <input onChange={handleFileChange} name = "image"  type="file" />

          </div>
          <div className="d-flex flex-column w-50 mt-3">
            <label>Restoran Adresi</label>
            <input required onChange={handleInputChange} className="inputt" name="address" type="text" placeholder="Adres" />

          </div>
          <div className="d-flex flex-column w-50 mt-3 ">
            <label>Ülke</label>
            <select name="country"  value={formData.country} onChange={handleInputChange} className="selectt" id="cars">
              <option name="Türkiye" value="Türkiye">Türkiye</option>
              <option name="ABD" value="ABD">ABD</option>
              <option name="Ukrayna" value="Ukrayna">Ukrayna</option>
              <option name="Fransa" value="Fransa">Fransa</option>
            </select>

          </div>
          <div className="mt-4 mb-3 ">
            <button type="submit" className="p-2 px-4 rounded-pill createbutton">Oluştur</button>
          </div>


        </form>




      </div>



    </div>


  )
}

export default CreateRestaurant