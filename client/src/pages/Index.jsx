
import { useDispatch, useSelector } from "react-redux";
import CategoryMini from "../components/CategoryMini";
import { useEffect } from "react";
import { getAllRestaurants } from "../redux/features/restourant/restaurantSlice";
import { getCategories } from "../redux/features/category/categorySlice";
import { showAllProducts } from "../redux/features/product/productSlice";
import { getCoupons } from "../redux/features/logged/loggedSlice";
function Index() {

    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRestaurants())
        dispatch(getCategories());
        dispatch(showAllProducts());
        dispatch(getCoupons());
    }, [])

    return (
        <div className="d-flex main flex-column">
            <div className="slider " >
                <div className="slide d-flex justify-content-end align-items-center">
                    <div className="asdasd p-2 mb-5">
                        <h3 className="text-light ">En Sevdiğin Restaurantlar şimdi AfiyetAppda</h3>
                    </div>


                </div>
                <div className="slide d-flex justify-content-end align-items-center">
                    <div className="asdasd p-2 mb-5">
                        <h3 className="text-light ">En Sevdiğin Restaurantlar şimdi AfiyetAppda</h3>
                    </div>


                </div>
                <div className="slide d-flex justify-content-end align-items-center">
                    <div className="asdasd p-2 mb-5">
                        <h3 className="text-light ">En Sevdiğin Restaurantlar şimdi AfiyetAppda</h3>
                    </div>


                </div>
                <div className="slide d-flex justify-content-end align-items-center">
                    <div className="asdasd p-2 mb-5">
                        <h3 className="text-light ">En Sevdiğin Restaurantlar şimdi AfiyetAppda</h3>
                    </div>


                </div>
                <div className="slide d-flex justify-content-end align-items-center">
                    <div className="asdasd p-2 mb-5">
                        <h3 className="text-light ">En Sevdiğin Restaurantlar şimdi AfiyetAppda</h3>
                    </div>


                </div>

            </div>
            <div className="border-2 border asdf p-3 m-3">
                <h5 className="d-inline">Kategoriler</h5>
                <div className=" d-flex flex-wrap">
                    {categories.map((category) => {
                        return <CategoryMini key={category._id} category={category}></CategoryMini>
                    })}

                </div>
                <br />
            </div>



        </div>

    );
}

export default Index;