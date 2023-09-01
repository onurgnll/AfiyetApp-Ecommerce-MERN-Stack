import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRestaurantbynamee } from '../redux/features/restourant/restaurantSlice';
import "../style/restaurantdetails.css"
function RestaurantDetails() {

    const { restaurantname } = useParams();
    const { gotRestaurant } = useSelector(state => state.restaurant)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRestaurantbynamee(restaurantname))
    }, [])

    console.log(gotRestaurant);
    const image = `http://localhost:5000/api/restaurant/restaurantimage/${gotRestaurant._id}`
    return (
        <div className='w-100 h-100 p-3'>
            
        <div className='endis'>
            <div className='d-flex'>
                <div className='restaurantimage'>
                    <img src={image} alt="" />
                </div>
                <div className='title'>
                    {gotRestaurant.name}
                </div>
            </div>
        </div>
        
        </div>

    )
}

export default RestaurantDetails