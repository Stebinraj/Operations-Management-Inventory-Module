import React from 'react'
import { Link } from 'react-router-dom'

const PurchaseCartIconsLabelLink = ({ purchaseCartData }) => {
    return (
        <>
            {/* purchase cart icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#purchaseCartItems" style={{ color: 'grey' }}>
                <i className="bi bi-cart me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {purchaseCartData.length}
                </span>
                Cart
            </Link>
        </>
    )
}

export default PurchaseCartIconsLabelLink