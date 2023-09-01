/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllRestaurants, getRestaurantDetails, updateRestaurant } from '../../redux/features/restourant/restaurantSlice';
import "../../style/restaurantedit.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditRestaurantProducts from './EditRestaurantProducts';

import {  resetError, resetmessage } from "../../redux/features/restourant/restaurantSlice";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from "react-toastify";
import { resetmessagee, showAllProducts } from '../../redux/features/product/productSlice';
import { getCategories } from '../../redux/features/category/categorySlice';

function EditRestaurant() {
    
    useEffect(() => {
        dispatch(getAllRestaurants())
        dispatch(getCategories());
        dispatch(showAllProducts());
      },[])

    const { restaurantid } = useParams();

    const dispatch = useDispatch()

    const { editingRestaurant } = useSelector(state => state.restaurant)
    const { messagee } = useSelector(state => state.product)

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        closeTime: '',
        openTime: '',
        description: '',
        isOpen: true,
        address: '',
        id: '',
    });

    useEffect(() => {
        dispatch(getRestaurantDetails(restaurantid));

    }, [restaurantid]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            address: editingRestaurant?.address || '',
            country: editingRestaurant?.country || '',
            closeTime: editingRestaurant?.closeTime || '',
            name: editingRestaurant?.name || '',
            description: editingRestaurant?.description || '',
            isOpen: editingRestaurant?.isOpen || '',
            openTime: editingRestaurant?.openTime || '',
            id:  editingRestaurant?._id || ""
        }));

    }, [editingRestaurant]);

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
        
        dispatch(updateRestaurant(formData))

    }

    const {error, message} = useSelector(state => state.restaurant)     

    useEffect(()=>{
      if(error?.status == false){
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 1300,
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
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {dispatch(resetmessage())}
      });
      }
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
          onClose: () => {dispatch(resetmessagee())}
      });
      }
    },[error,message,messagee])

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        
      <ToastContainer />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Restoran Bilgileri" value="1" />
                            <Tab label="Menü Detayları" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className="alldiv dfa">
                            <div className="innerdiv d-flex justify-content-center flex-column">
                                <h2 className='text-center mt-2'>Restoranını Düzenle</h2>
                                <form onSubmit={handleSubmitForm} className="w-100 d-flex flex-column align-items-center">
                                    <div className="d-flex flex-column w-50 mt-1">
                                        <label>Restoran İsmi</label>
                                        <input onChange={handleChangeform} value={formData.name} className="inputt" name="name" type="text" placeholder="Restoranın İsmi" />

                                    </div>
                                    <div className="d-flex flex-column w-50 mt-3">
                                        <label>Restoran Açıklaması</label>
                                        <input value={formData.description} onChange={handleChangeform} className="inputt" name="description" type="text" placeholder="Açıklama" />

                                    </div>
                                    <div className="d-flex flex-column w-50 mt-3">
                                        <label >Restoran Fotoğrafı</label>
                                        <input onChange={handleFileChange} name="image" type="file" />

                                    </div>
                                    <div className="d-flex flex-column w-50 mt-3">
                                        <label>Restoran Adresi</label>
                                        <input value={formData.address} className="inputt" onChange={handleChangeform} name="address" type="text" placeholder="Adres" />

                                    </div>
                                    <div className="d-flex flex-column w-50 mt-3">
                                        <label>Ülke</label>
                                        <select name="country" className="selectt">
                                            <option name="Türkiye" value="Türkiye">Türkiye</option>
                                            <option name="ABD" value="ABD">ABD</option>
                                            <option name="Ukrayna" value="Ukrayna">Ukrayna</option>
                                            <option name="Fransa" value="Fransa">Fransa</option>
                                        </select>

                                    </div>
                                    <div className="d-flex justify-content-center w-50 mt-3">
                                        <div className='d-flex flex-column align-items-center justify-content-center'>
                                            <label>Açılış Saati</label>
                                            <input value={formData.openTime} className="inputt w-50" onChange={handleChangeform} name="openTime" type="text" placeholder="Açılış Saati örn.(10:00)" />

                                        </div>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <label>Kapanış Saati</label>
                                            <input value={formData.closeTime} className="inputt w-50" onChange={handleChangeform} name="closeTime" type="text" placeholder="Kapanış Saati örn.(00:00)" />

                                        </div>

                                    </div>

                                    <div className="d-flex flex-column dfa w-50 mt-3">
                                        <label>Açık mı?</label>
                                        <select name="isOpen" onChange={handleChangeform} className="selectt w-50">
                                            <option name="opened" value={true}>Açık</option>
                                            <option name="closed" value={false}>Kapalı</option>
                                        </select>

                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" onClick={handleSubmitForm} className="p-2 px-4 mb-2 rounded-pill createbutton">Düzenle</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </TabPanel>
                    
                    <TabPanel value="2">
                        <EditRestaurantProducts restaurantid={restaurantid}></EditRestaurantProducts>

                    </TabPanel>
                </TabContext>
            </Box>

        </>
    )
}

export default EditRestaurant