/* eslint-disable react/prop-types */


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import PersonIcon from '@mui/icons-material/Person';

import Button from '@mui/material/Button';
import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { red, blue, common } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: blue,   // Başlık ve vurgulamalar için renk
        secondary: red,  // İkincil renk
        common: {
            white: common.white, // Beyaz rengi common objesinde bulabilirsiniz
        },
    },
});


function GirisYapDropDown() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
          }
          
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogin = () => {
        navigate("/login", { replace: true, props: {signin: true} })
    }

    const handleRegister=() => {
        navigate("/register", { replace: true, state: {signin: false} })
        
    }
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
            <PersonIcon></PersonIcon> Giriş Yap
        </Button>


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
                <MenuItem onClick={handleLogin}><LoginIcon></LoginIcon>Giriş Yap</MenuItem>
                <MenuItem onClick={handleRegister}><PersonAddAltIcon></PersonAddAltIcon>Kayıt Ol</MenuItem>
            </Menu>

            </ThemeProvider>

    );
}

export default GirisYapDropDown;