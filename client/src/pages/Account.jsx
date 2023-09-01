
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../style/account.css"
import { updateUser } from '../redux/features/logged/loggedSlice';
import { setUserDetails } from '../redux/features/logged/loggedSlice';
import { ToastContainer, toast } from "react-toastify";
import PersonIcon from '@mui/icons-material/Person';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DiscountIcon from '@mui/icons-material/Discount';
function Account() {

    const { loggedUser } = useSelector(state => state.logged)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: "",
        email: "",
        country: "",
        address: ''
    });


    let image = `http://localhost:5000/api/user/profileimage/${loggedUser._id}`;

    useEffect(() => {
        dispatch(setUserDetails());
    }, [dispatch]);





    useEffect(() => {
        image = `http://localhost:5000/api/user/profileimage/${loggedUser._id}`;
        setFormData((prevData) => ({
            ...prevData,
            address: loggedUser?.address || '',
            country: loggedUser?.country || '',
            lastName: loggedUser?.lastName || '',
            firstName: loggedUser?.firstName || '',
            email: loggedUser?.email || '',
            id: loggedUser?._id || ""
        }));
console.log(loggedUser);
    }, []);

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
        dispatch(updateUser(formData))
        toast.success( `Kullanıcı Bilgileri Güncellendi`, {
            position: "bottom-right",
            autoClose: 1000,
            icon: <PersonIcon></PersonIcon>,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });


    }

    const handleparaekle = () => {
        const a = {
            balance: 10000
        }
        dispatch(updateUser(a))
        toast.success( `Paranız 10000TL yapıldı.`, {
            position: "bottom-right",
            autoClose: 1000,
            icon: <LocalAtmIcon></LocalAtmIcon>,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    const handlekuponal = async () => {
       
        await fetch("http://localhost:5000/api/user/givecoupon",{
            method: "POST",
            headers: {
                "authorization" : "bearer " + localStorage.getItem("token")
            }
        })
        toast.success( `Tüm Kuponlar Verildi`, {
            position: "bottom-right",
            autoClose: 1000,
            icon: <DiscountIcon></DiscountIcon>,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }








    return (
        <div className='d-flex p-5'>
            
            <ToastContainer></ToastContainer>
            <div>
                <div className='imgcerceve border border-2'>
                    <img style={{ width: 320, height: 320 }} src={image} alt="" />


                </div>
                <div className='demo d-flex flex-column justify-content-center align-items-center'>
                    <h5>Demo</h5>
                    Bakiye: {loggedUser.balance} TL
                    <div>
                        <button onClick={handleparaekle}  className='btn btn-success m-1'>Para Ekle</button>
                        <button onClick={handlekuponal} className='btn btn-success m-1'>Kupon Al</button>

                    </div>
                    <p>Bu Bölüm Deneme Amaçlıdır</p>
                </div>

            </div>
            <form onSubmit={handleSubmitForm} className='formm'>

                <div className='d-flex flex-column'>
                    <label htmlFor="firstName">İsim</label>
                    <input className='inp' type="text" name='firstName' id='firstName' value={formData.firstName} onChange={handleChangeform} />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="lastName">Soyisim</label>
                    <input className='inp' type="text" name='lastName' id='lastName' value={formData.lastName} onChange={handleChangeform} />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="email">Email</label>
                    <input className='inp' type="text" name='email' id='email' disabled value={formData.email} onChange={handleChangeform} />
                </div>

                <div className="d-flex flex-column mt-3">
                    <label >Profil Fotoğrafı</label>
                    <input className='inpp' onChange={handleFileChange} name="image" type="file" />

                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="address">Adres</label>
                    <textarea className='inp' value={formData.address} onChange={handleChangeform} name="address" id="address" cols="5" rows="3"></textarea>
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="country">Ülke</label>
                    <input className='inp' onSubmit={handleSubmitForm} type="text" name='country' id='country' value={formData.country} onChange={handleChangeform} />
                </div>

                <button className='subbutton' type="submit">Submit</button>

            </form>





        </div>
    );
}

export default Account;