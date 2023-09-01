/* eslint-disable react/prop-types */
import React from 'react'

function CartEachProduct({ product }) {


    const image = `http://localhost:5000/api/restaurant/productimage/${product.product._id}`
    return (
        <div className='bordered eachdiv'>


            <div className='d-flex align-items-center'>
                <img src={image} style={{ width: 64, height: 64 }} alt="" />
            </div>


            <div className='d-flex justify-content-between aaaa'>

                <div className='d-flex bbc align-items-center'>
                    <div className='d-flex flex-column producttname ml-3'>
                        <span className='boldd'>İsim:</span>
                        <span className='boldd'>{product.product.name}</span>

                    </div>
                    <div className='d-flex flex-column producttdesc'>
                        <span className='boldd'>Açıklama:</span>
                        <span className='anan'>{product.product.description}</span>

                    </div>

                </div>


                <div className='d-flex'>
                    <div className='d-flex flex-column justify-content-center mx-3'>
                        <span className='boldd'>Adet</span>
                        <span className='text-center'>{product.quantity}</span>

                    </div>
                    <div className='d-flex flex-column justify-content-center mr-1'>
                        <span className='boldd'>Fiyat</span>
                        <span className='text-center'> {product.product.price * product.quantity}</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CartEachProduct