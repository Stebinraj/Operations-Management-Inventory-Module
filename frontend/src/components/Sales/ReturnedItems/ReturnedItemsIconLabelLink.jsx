import React from 'react'
import { Link } from 'react-router-dom'

const ReturnedItemsIconLabelLink = ({ returnedItemsData }) => {
    return (
        <>
            {/* returned items icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#returnedItems" style={{ color: 'grey' }}>
                <i className="bi bi-cart-plus me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {returnedItemsData.length}
                </span>
                Returned Items
            </Link>
        </>
    )
}

export default ReturnedItemsIconLabelLink