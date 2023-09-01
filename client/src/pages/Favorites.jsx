import { useEffect } from "react";
import {  useSelector } from "react-redux";
import ProductCardShow from "../components/ProductCardShow";

function Favorites() {

    const {allFavorites} = useSelector(state => state.product)

    useEffect(() => {
    },[])



    return (
        <>
        <h3 className="p-2">Favorilerim</h3>
        <div className="d-flex flex-wrap">
            {allFavorites?.map((element) => {
                return <ProductCardShow key={element._id} product={element} ></ProductCardShow>
                
            })}
        </div>
        
        </>
     );
}

export default Favorites;