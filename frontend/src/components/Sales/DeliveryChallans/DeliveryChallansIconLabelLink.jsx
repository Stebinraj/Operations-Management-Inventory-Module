import React from 'react'
import { Link } from 'react-router-dom'

const DeliveryChallansIconLabelLink = ({ deliveryChallansData }) => {
    return (
        <>
            {/* delivery challans icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#deliveryChallans" style={{ color: 'grey' }}>
                <i className="bi bi-postcard me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {deliveryChallansData.length}
                </span>
                Delivery Challans
            </Link>
        </>
    )
}

export default DeliveryChallansIconLabelLink