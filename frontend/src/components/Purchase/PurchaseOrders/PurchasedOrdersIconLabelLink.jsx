import React from 'react'
import { Link } from 'react-router-dom'

const PurchasedOrdersIconLabelLink = ({ purchaseOrdersData }) => {
    return (
        <>
            {/* purchased orders icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#purchaseOrderItems" style={{ color: 'grey' }}>
                <i className="bi bi-cart-check me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {purchaseOrdersData.length}
                </span>
                Purchase Orders
            </Link>
        </>
    )
}

export default PurchasedOrdersIconLabelLink