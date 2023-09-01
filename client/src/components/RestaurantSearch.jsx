/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "../style/arama.css"
import { useNavigate } from 'react-router-dom';
function RestaurantSearch({ restaurant }) {

  const image = `http://localhost:5000/api/restaurant/restaurantimage/${restaurant._id}`
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/restaurant/" + restaurant.name)
  }
  

  
  return (
    <div onClick={handleClick} className='restaurantsearchdiv'>

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
            Puanı: {restaurant.averageRank}
            <br />
            <br />
            Adres: {restaurant.address}


          </Typography>
        </CardContent>
      </Card>

    </div>
  )
}

export default RestaurantSearch