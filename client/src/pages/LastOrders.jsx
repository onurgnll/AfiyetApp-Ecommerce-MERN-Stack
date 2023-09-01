import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/features/logged/loggedSlice";

import ProductCardShow from "../components/ProductCardShow";
function LastOrders() {

    const { loggedUser } = useSelector(state => state.logged)
    console.log(loggedUser);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserDetails())
    }, [])

    const b = [...(loggedUser?.pastOrders || [])].reverse();

    
    return (


        <div>
            <h1 className="mt-3 text-center">{b?.length > 0 ?"Geçmiş Siparişlerin": "Henüz Bir Sipariş Vermedin"}</h1>
            {b?.map((element) => {

                console.log(typeof Date(element.date))
                const date = new Date(element.date)
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                return (
                    <div className="d-flex flex-column" key={element.date}>
                        
                        <hr />
                        <h3>Şu Tarihte: {hour}:{minute} {day}/{month}/{year}</h3>
                        <div className="d-flex flex-wrap">
                        {element.products.map((product) => {
                            return (
                                <div className="d-flex flex-column" key={product.product._id}>
                                    <h5 className="text-center" style={{marginBottom:0}}>{product.quantity} Adet</h5>

                                    <ProductCardShow  product={product.product}></ProductCardShow>
                                </div>
                            )
                            
                            // product.product.name
                        })}
                        </div>
                    </div>
                )
            })}


        </div>


    );
}

export default LastOrders;