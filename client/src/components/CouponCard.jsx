/* eslint-disable react/prop-types */

function CouponCard({ coupon }) {
    return (
        <div className='d-flex flex-column border mx-2 align-items-center'>
            <div className='p-2 d-flex flex-column align-items-center'>
                <img src={coupon.image} style={{ width: 64, height: 64 }} alt="" />
                <h3>{coupon.amount}{coupon.type == "percentage" ? ("%"): ("TL")}</h3>
                <h3 className='text-center'>İndirim Kuponu</h3>
            </div>

        </div>
    )
}

export default CouponCard