import "../style/RegisterPage.css"
import React, { useState } from "react";
import * as Components from './Components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogged, setUserDetails } from "../redux/features/logged/loggedSlice";



function RegisterPage() {


    const location = useLocation();
    const a = location.state && location.state.signin != null ? location.state.signin : "true";

    const [signin, setsignin] = React.useState(a);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const changeHandle = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case "registerisim":
                setRegisterName(value);
                break;
            case "registeremail":
                setRegisterEmail(value);
                break;
            case "registerpassword":
                setRegisterPassword(value);
                break;
            case "loginemail":
                setLoginEmail(value);
                break;
            case "loginpassword":
                setLoginPassword(value);
                break;
            default:
                break;
        }
    }


    const onSubmitLogin = async (e) => {
        e.preventDefault();

        const data = {
            email: loginEmail,
            password: loginPassword
        }

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
        if (result.success) {
            localStorage.setItem("token", result.token)

            toast.success('Başarıyla Giriş Yapıldı', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {dispatch(setLogged(true))
                    dispatch(setUserDetails());
                }
            });


        }
        else {
            toast.error(result.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }

    }
    const onSubmitRegister = async (e) => {
        e.preventDefault();

        const firstName = registerName.split(" ")[0];
        const lastName = registerName.split(" ")[1];

        const data = {
            email: registerEmail,
            password: registerPassword,
            firstName,
            lastName
        }

        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("token", result.token)
            
            toast.success('Başarıyla Kayıt Olundu', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {dispatch(setLogged(true));
            
                dispatch(setUserDetails());navigate("/");}
            });
        }
        else {
            toast.error(result.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    }


    return (
        <div className="registerlogin">

            <ToastContainer />
            <Components.Container>
                <Components.SignUpContainer $signinin={signin}>
                    <Components.Form onSubmit={onSubmitRegister}>
                        <Components.Title>Hesap Oluştur</Components.Title>
                        <Components.Input onChange={changeHandle} id="registerisim" required type='text' placeholder='İsim Soyisim' />
                        <Components.Input type='email' required onChange={changeHandle} id="registeremail" placeholder='Email' />
                        <Components.Input type='password' minLength={6} required onChange={changeHandle} id="registerpassword" placeholder='Şifre' />
                        <Components.Button>Kayıt Ol</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer $signinin={signin}>
                    <Components.Form onSubmit={onSubmitLogin}>
                        <Components.Title>Giriş Yap</Components.Title>
                        <Components.Input type='email' onChange={changeHandle} id="loginemail" required placeholder='Email' />
                        <Components.Input type='password' onChange={changeHandle} id="loginpassword" required placeholder='Şifre' />
                        <Components.Anchor href='#'>Şifreni mi unuttun?</Components.Anchor>
                        <Components.Button>Giriş Yap</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer $signinin={signin}>
                    <Components.Overlay $signinin={signin}>

                        <Components.LeftOverlayPanel $signinin={signin}>
                            <Components.Title>Hesabın Var mı?</Components.Title>
                            <Components.Paragraph>
                                Bilgilerini girerek giriş yapabilirsin
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setsignin("true")}>
                                Giriş Yap
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel $signinin={signin}>
                            <Components.Title>Hoşgeldin</Components.Title>
                            <Components.Paragraph>
                                Henüz Hesabın Yoksa Kayıt Ol Butonuna tıkla Ve Kayıt Ol
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setsignin("false")}>
                                Kayıt Ol
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>


        </div>
    );
}

export default RegisterPage;