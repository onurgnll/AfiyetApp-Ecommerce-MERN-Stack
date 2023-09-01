/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestoreIcon from '@mui/icons-material/Restore';
import StarIcon from '@mui/icons-material/Star';
import DiscountIcon from '@mui/icons-material/Discount';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { red, blue, common } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { exit, getCoupons, setUserDetails } from '../redux/features/logged/loggedSlice';
import CouponCard from './CouponCard';

import { ToastContainer, toast } from "react-toastify";
const theme = createTheme({
    palette: {
        primary: blue,   // Başlık ve vurgulamalar için renk
        secondary: red,  // İkincil renk
        common: {
            white: common.white, // Beyaz rengi common objesinde bulabilirsiniz
        },
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function HesabımDropdown() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    
    const { cartItems } = useSelector(state => state.cart)
    const open = Boolean(anchorEl);
    const {userCoupons} = useSelector(state => state.logged)

    const handleClick = (event) => {
        dispatch(getCoupons());
        
        dispatch(setUserDetails())
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }

    }

    const handleExit = () => {
        dispatch(exit())
        navigate("/")

    }

    const handleClose = () => {
        setAnchorEl(null);
    };



    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
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
                <PersonIcon></PersonIcon> Hesabım
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
                <MenuItem
                    style={{ color: 'gray' }} onClick={() => {cartItems.length > 0 ? navigate("/cart") : toast.error( `Sepetinizde Ürün Bulunmuyor`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        })}}><ShoppingCartIcon></ShoppingCartIcon>Sepetim</MenuItem>
                <MenuItem
                    style={{ color: 'gray' }} onClick={() => navigate("/lastorders")}><RestoreIcon></RestoreIcon>Geçmiş Siparişlerim</MenuItem>
                <MenuItem
                    style={{ color: 'gray' }} onClick={() => navigate("/favorites")}><StarIcon></StarIcon>Favorilerim</MenuItem>
                <MenuItem
                    style={{ color: 'gray' }} onClick={handleClickOpen1}><DiscountIcon></DiscountIcon>Kuponlarım</MenuItem>
                <MenuItem
                    style={{ color: 'gray' }} onClick={() => navigate("/account")}><SettingsIcon></SettingsIcon>Hesap Ayarları</MenuItem>
                <MenuItem
                    style={{ color: 'gray' }} onClick={handleExit}><LogoutIcon></LogoutIcon>Çıkış</MenuItem>
            </Menu>
            <Dialog
                open={open1}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Kuponların"}</DialogTitle>
                <DialogContent>
                    {!(userCoupons.length > 0) ?
                        (<div>Hiç Kuponunuz Bulunmuyor</div>)
                    :
                    (<div className='d-flex'  style={{maxWidth: 1000 , overflow: "auto"}}>
                    {userCoupons.map((coupon,index) => {
                        return (<CouponCard key={coupon._id + index} coupon={coupon}></CouponCard>)
                    })}

                    </div>)
                    
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>Kapat</Button>
                </DialogActions>
            </Dialog>

        </ThemeProvider>

    );
}

export default HesabımDropdown;