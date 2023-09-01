/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


function CategoryMini({ category }) {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate("/category?name="+category.name)
    }


    return (
        <div className="cardd" onClick={handleclick}>
            {/* <div style={{ width: '6rem', height: '6rem', backgroundImage: `url(${category.imageurl})`, backgroundSize: 'cover',backgroundPosition: "center" }} /> */}
            <img src={category.image} className="cardimage" alt="..."/>
            <div className="cardd-body">
                <p className="cardd-title">{category.name}</p>


            </div>
        </div>
    );
}

export default CategoryMini