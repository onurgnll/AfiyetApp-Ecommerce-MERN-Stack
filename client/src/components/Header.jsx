import "../style/header.css"
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'
import GirisYapDropDown from "./GirisYapDropDown";
import { useNavigate } from "react-router-dom";
import HesabımDropdown from "./HesabımDropdown";
import SepetimDropDown from "./SepetimDropDown";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import afiyetapp from "../assets/afiyetapp.png"
function Header() {
    const navigate = useNavigate()
    const [searchparam , setsearchparam] = useState();
    const changeHandle = (e) => {
        
        setsearchparam(e.target.value);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(searchparam != ""){

            navigate("/search?query=" + searchparam)
        }
        else{
            navigate("/")
        }
    }


    const { logged, loggedUser } = useSelector(state => state.logged)
    return (
        <div className="header d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
                <img  onClick={() => navigate("/")} className=" cursor-pointer" src={afiyetapp} style={{ width: "25%"}} />
                {/* <h1 onClick={() => navigate("/")} className="ml-5 cursor-pointer text-light">AfiyetApp</h1> */}


                {loggedUser?.role === "admin" && (
                    <div className="d-flex">
                        <div onClick={() => navigate("/createrestaurant")} className="d-flex rounded-pill border border-2 cw border-light align-items-center p-1 cursor-pointer ml-2">
                            <AddBusinessIcon></AddBusinessIcon> Restaurant Ekle
                        </div>
                        <div onClick={()=> navigate("/showallrestaurants")} className="d-flex rounded-pill border border-2 cw border-light align-items-center p-1 cursor-pointer ml-2">
                            <StoreIcon></StoreIcon> Restaurantları Göster
                        </div>
                    </div>
                )}
                {loggedUser?.role === "owner" && (
                    <div className="d-flex">
                        <div onClick={() => navigate(`/editRestaurant/${loggedUser?.restaurants[0]}`)} className="d-flex rounded-pill border border-2 cw border-light align-items-center p-1 cursor-pointer ml-2">
                            <EditIcon></EditIcon>Restoranını Düzenle
                        </div>
                    </div>
                )}
                <div className="mr-5 d-flex align-items-center justify-content-around">
                    <div>
                        <form onSubmit={onSubmit} >
                        <SearchIcon className="cw"></SearchIcon>

                        <input type="text" onSubmit={onSubmit} onChange={changeHandle} className="rounded-pill border-0 p-1" placeholder="Ürün ismi" />
                        </form>
                    </div>

                    <div>
                        {logged ?
                            <div className="d-flex rounded-pill cw border border-2 border-light align-items-center cursor-pointer ml-2">

                                <HesabımDropdown></HesabımDropdown>
                            </div>


                            :
                            <div >


                                <div className="d-flex rounded-pill cw border border-2 border-light align-items-center  cursor-pointer ml-2">

                                    <GirisYapDropDown></GirisYapDropDown>
                                </div>

                            </div>

                        }

                    </div>
                    <div>
                        <div className="d-flex rounded-pill border border-2 cw border-light align-items-center cursor-pointer ml-2">
                            
                            <SepetimDropDown></SepetimDropDown>
                        </div>
                    </div>

                </div>
            </div>


        </div >
    );
}

export default Header;