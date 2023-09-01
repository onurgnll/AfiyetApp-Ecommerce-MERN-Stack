/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "../style/categories.css"
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setUserDetails } from '../redux/features/logged/loggedSlice';
import { getFavoritesForLogged } from '../redux/features/product/productSlice';
import { addTocart } from '../redux/features/cart/cartSlice';
import StarIcon from '@mui/icons-material/Star';
import { ToastContainer, toast } from "react-toastify";
function ProductCardShow({ product }) {
    const image = `http://localhost:5000/api/restaurant/productimage/${product._id}`

    const { loggedUser, logged } = useSelector(state => state.logged)


    const [favorited, setFavorited] = useState(loggedUser?.favoriteProducts);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddToCart = async () => {

        dispatch(addTocart(product))
        toast.success( `${product.name} Sepete Eklendi`, {
            position: "bottom-right",
            autoClose: 1000,
            icon: <AddShoppingCartIcon></AddShoppingCartIcon>,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            
            theme: "light",
            });

    }

    const handleremoveproduct = async () => {
        try {
            if (logged) {

                const data = {
                    "id": product._id
                }
                await fetch("http://localhost:5000/api/user/removefromFavorites", {
                    method: "POST",
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem("token"),

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(() => {
                    setFavorited(prevFavorited => prevFavorited.filter(id => id !== product._id));
                    dispatch(setUserDetails())
                    toast.error( `${product.name} Favorilerden Çıkarıldı`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        icon: <StarIcon />,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    dispatch(getFavoritesForLogged())
                })

            } else {
                navigate("/login")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddFavorite = async () => {
        try {
            if (logged) {
                const data = {
                    "id": product._id
                }
                await fetch("http://localhost:5000/api/user/addToFavorites", {
                    method: "POST",
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem("token"),

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(() => {
                    setFavorited(prevFavorited => [...prevFavorited, product._id])
                    dispatch(setUserDetails())
                    toast.success( `${product.name} Favorilere Eklendi`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        icon: <StarIcon />,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    dispatch(getFavoritesForLogged())
                })

            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
        if (logged) {
            setFavorited(loggedUser.favoriteProducts)
        }
    }, [])


    return (


        <div className="cardproduct">
            <ToastContainer></ToastContainer>
            <img src={image} className="cardproductimage" alt="..." />

            <p className="cardproduct-title">{product.name}</p>
            <div className="cardproduct-body d-flex flex-column justify-content-between">
                <div>
                    <div className="cardproduct-desc text-start">
                        <span className="descc">Ürün Açıklaması:</span> <span className="desc">{product.description}</span>

                    </div>
                    <div className="cardproduct-desc text-start restt">
                        <span className="descc">Restoran:</span> <span className="desc">{product.restaurantname}</span>
                    </div>
                    <div className="cardproduct-desc text-start restt">
                        <span className="descc">Ortalama Teslimat Süresi:</span> <span className="desc">30dk</span>
                    </div>

                </div>
                <div className="alt d-flex justify-content-between">
                    <span className='price'>{product.price}TL</span>
                    <div>
                        {logged ?
                            ((favorited.includes(product._id)) ? (<button onClick={handleremoveproduct} className='favorite'><DoneIcon></DoneIcon></button>) : (<button onClick={handleAddFavorite} className='favorite'><FavoriteIcon></FavoriteIcon></button>))
                            : (<button onClick={handleAddFavorite} className='favorite'><FavoriteIcon></FavoriteIcon></button>)}

                        <button onClick={handleAddToCart} className='addtocart'><AddShoppingCartIcon></AddShoppingCartIcon></button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductCardShow