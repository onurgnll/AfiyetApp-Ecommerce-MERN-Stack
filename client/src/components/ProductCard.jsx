/* eslint-disable react/prop-types */

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/features/product/productSlice';
import "../style/eachproduct.css"
import { useNavigate } from 'react-router-dom';


function ProductCard({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteHandle = () => {
        dispatch(deleteProduct(product._id))
    }

    const image = `http://localhost:5000/api/restaurant/productimage/${product._id}`

    return (
        <div className='eachproduct'>
            <Card sx={{ width: 250, height: 345,
                    overflow: "auto" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Açıklama: {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Fiyat: {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Kategori: {product.category}
                    </Typography>
                </CardContent>
                <CardActions>
                    <button onClick={() => navigate("/editproduct/" +product._id )} className='rounded-pill btn btn-primary border border-2 border-light p-1 cursor-pointer'><EditIcon></EditIcon>Düzenle</button>
                    <button onClick={deleteHandle} className='rounded-pill btn btn-danger border border-2 border-light p-1 px-3 cursor-pointer'><DeleteIcon></DeleteIcon>Sil</button>
                </CardActions>
            </Card>


        </div>
    )
}

export default ProductCard