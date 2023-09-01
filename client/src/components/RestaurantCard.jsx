/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRestaurant, getRestaurantOwner } from '../redux/features/restourant/restaurantSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
function RestaurantCard({ restaurant }) {
    const dispatch = useDispatch()
    const [owner , setOwner] = useState("")
    const navigate = useNavigate()
    const handleDelete = () => {
        dispatch(deleteRestaurant(restaurant._id))
    }

    useEffect(() => {
        dispatch(getRestaurantOwner(restaurant.controllerUser)).then((data) => {
            setOwner(data.payload.user.email);
        });
    },[])
    const image = `http://localhost:5000/api/restaurant/restaurantimage/${restaurant._id}`
    return (
        <Card sx={{ width: 300 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Açıklama: {restaurant.description}
                    <br />
                    Açılış Saati: {restaurant.openTime}
                    <br />
                    Kapanış Saati: {restaurant.closeTime}
                    <br />
                    <br />
                    Sahibi: {owner}
                    <br />
                    <br />
                    Puanı: {restaurant.averageRank}
                    <br />
                    Paunlayan: {restaurant.userRanked}
                    <br />
                    <br />
                    Adres: {restaurant.address}
            

                </Typography>
            </CardContent>
            <CardActions>
                <button  onClick={() => navigate(`/editRestaurant/${restaurant._id}`)} className='rounded-pill btn btn-primary border border-2 border-light p-1 cursor-pointer'><EditIcon></EditIcon>Düzenle</button>
                <button onClick={handleDelete} className='rounded-pill btn btn-danger border border-2 border-light p-1 px-3 cursor-pointer'><DeleteIcon></DeleteIcon>Sil</button>
            </CardActions>
        </Card>
    )
}

export default RestaurantCard