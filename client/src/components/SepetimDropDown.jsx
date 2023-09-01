/* eslint-disable react/prop-types */


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import * as React from 'react';

import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { ToastContainer, toast } from "react-toastify";
import { red, blue, common } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFormCart } from '../redux/features/cart/cartSlice';

const theme = createTheme({
    palette: {
        primary: blue,   // Başlık ve vurgulamalar için renk
        secondary: red,  // İkincil renk
        common: {
            white: common.white, // Beyaz rengi common objesinde bulabilirsiniz
        },
    },
});



function SepetimDropDown() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const {  logged } = useSelector(state => state.logged)
    const { cartItems  } = useSelector(state => state.cart)
    const open = Boolean(anchorEl);


    const goToCartHandle = () => {
        if (logged) {
            navigate("/cart")
        }
        else {
            navigate("/login")
        }
    }

    const handleClick = (event) => {

        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }

    }

    const removefromcart = (a) => {
        dispatch(removeFormCart(a))
        toast.error( `${a.name} Sepetten Çıkarıldı`, {
            position: "bottom-right",
            autoClose: 1000,
            icon: <RemoveShoppingCartIcon></RemoveShoppingCartIcon>,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Button
                id="basic-button"
                style={{ color: theme.palette.common.white }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="buttonlowercase cursor-pointer"
            >
                <ShoppingCartIcon></ShoppingCartIcon>
                <p className="c">Sepetim</p>
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </Button>


            <ToastContainer></ToastContainer>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    onMouseLeave: handleClose
                }}
            >
                {!(cartItems.length > 0) ? (
                    <MenuItem>Sepetiniz Boş</MenuItem>
                ) : (
                    <div>
                        {cartItems.map((element) => (
                            <MenuItem  sx={{ width: 200, pointerEvents: 'none' }} className='d-flex justify-content-between' key={element.product._id}>
                                <div>
                                    <img style={{ height: 24, width: 24 }} src={`http://localhost:5000/api/restaurant/productimage/${element.product._id}`} alt="" />
                                    <span>{element.product.name}</span>
                                </div>
                                <div>
                                    <span className='badge text-bg-secondary'>
                                        {element.quantity}
                                    </span>
                                    <span onClick={() => removefromcart(element.product)} style={{pointerEvents: 'all'}} className='badge text-bg-danger'>
                                        -
                                    </span>

                                </div>
                            </MenuItem>
                        ))}
                        <hr style={{ margin: 0 }} />
                        <MenuItem style={{ color: 'gray' }} onClick={goToCartHandle}>Sepete Git</MenuItem>
                    </div>
                )}


            </Menu>

        </ThemeProvider >

    );
}

export default SepetimDropDown;