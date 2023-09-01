/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import "../style/cart.css"
import CartEachProduct from "../components/CartEachProduct";
import { useEffect, useState } from "react";
import {  setUserDetails } from "../redux/features/logged/loggedSlice";
import { order } from "../redux/features/order/orderSlice";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeAll } from "../redux/features/cart/cartSlice";
function Cart() {

    const { cartItems, cartSum, } = useSelector(state => state.cart)
    const { loggedUser } = useSelector(state => state.logged)
    const { userCoupons } = useSelector(state => state.logged)

    const [cartsumm, setcartsumm] = useState(Number(cartSum))
    const [changedsum, setchangedsum] = useState(false)
    const [usedcoupon, setusedCoupon] = useState({
        amount: "0",
        type: "0"
    })
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        setcartsumm(cartSum)
    },[cartSum])

    useEffect(() => {
            dispatch(setUserDetails())

    },[])
    const handleClick = () => {
        console.log(loggedUser);
        if (cartItems?.length > 0) {

            if (loggedUser.balance > Number(cartsumm)) {

                dispatch(order([cartItems, usedcoupon , cartsumm]))
                toast.success( `Sipariş Başarıyla Tamamlandı`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    navigate("/");
                    dispatch(removeAll())
                    dispatch(setUserDetails())
                    
            }else{
                toast.error( `Yeteri Kadar Bakiyeniz Bulunmuyor`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

        }
    }

    const handleCartSum = (e) => {
        const discount = e.target.value
        if (discount == "nocoupon") {
            setcartsumm(cartSum)

        } else {
            const type = discount.split(" ")
            if (type[1] == "percentage") {
                const type = discount.split(" ")
                const bcartsum = cartSum * (100 - Number(type[0])) / 100
                if(bcartsum < 0){
                    setcartsumm(0)
                }else{

                    setcartsumm(bcartsum)
                }
                setchangedsum(true)
                setusedCoupon({
                    amount: type[0],
                    type: type[1]
                })

            }
            if (type[1] == "value") {
                const type = discount.split(" ")
                const bcartsum = cartSum - Number(type[0])
                if(bcartsum < 0){
                    setcartsumm(0)
                }else{

                    setcartsumm(bcartsum)
                }
                setchangedsum(true)
                setusedCoupon({
                    amount: type[0],
                    type: type[1]
                })

            }
        }

    }

    return (
        <div className="Cart d-flex justify-content-between">
            <ToastContainer></ToastContainer>
            <div className="productss bordered">
                {(cartItems?.length > 0) ?

                    cartItems.map((product) => {
                        return (<CartEachProduct key={product.product._id} product={product}> </CartEachProduct>)
                    })

                    :
                    <div>

                    </div>

                }


            </div>
            <div className="prices bordered d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between">
                    <div className="aaaaaa">

                        Sepet Toplamı:
                    </div>
                    <div className="d-flex flex-column sayilar">
                        {cartItems?.map((e) => {
                            return (<span className="text-end" key={e.product._id}>{e.product.price * e.quantity} TL</span>)
                        })}


                    </div>

                </div>
                <div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div>

                            {userCoupons.length > 0 && cartItems.length > 0 && (

                                <div>
                                    <select onChange={handleCartSum} name="coupon" id="coupon">

                                        <option value={"nocoupon"}>Kupon Kullanma</option>
                                        {userCoupons.map((index, indexe) => {
                                            return (<option key={index._id + indexe} value={`${index.amount} ${index.type}`}>{index.amount}{index.type == "value" ? " TL İndirim" : "% İndirim"}</option>)

                                        })}
                                    </select>

                                </div>


                            )

                            }
                        </div>
                        <div className="d-flex justify-content-end">

                            {changedsum && (<span style={{ textDecoration: "line-through" }}>{cartSum} TL</span>)}    {cartsumm} TL
                        </div>

                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <button onClick={handleClick} className="btn btn-success"> Satın Al</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cart;