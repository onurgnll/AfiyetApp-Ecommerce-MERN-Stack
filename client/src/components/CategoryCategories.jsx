/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */


import {  useSelector } from "react-redux"
import "../style/categories.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function CategoryCategories({ categoryName }) {

  const { categories } = useSelector(state => state.category);
  const navigate = useNavigate()
  useEffect(() => {
    setselectedCheckbox(categoryName)
  }, [])

  const [selectedCheckbox , setselectedCheckbox] = useState();

  const handleCheckboxChange = (checkboxId) => {
      setselectedCheckbox( checkboxId === selectedCheckbox ? checkboxId : checkboxId)
      navigate(`/category?name=`+ checkboxId)
  };
  return (
    <div className="kategoriler">
      {categories.map((category) => {


        return (
          <div key={category.name} onClick={() => handleCheckboxChange(category.name)} className={`rounded-pill cursor-pointer d-flex justify-content-between border border-1 m-2 p-2 ${selectedCheckbox === category.name ? "koyulastir" : "normal"}`}>
            <label className="cursor-pointer form-check-label" htmlFor={category.name}>{category.name}</label>
            <input className="form-check-input cursor pointer"type="checkbox" onChange={()=> ""} checked={selectedCheckbox == category.name} id={category.name} />

          </div>
        )

      })}
    </div>
  )
}

export default CategoryCategories