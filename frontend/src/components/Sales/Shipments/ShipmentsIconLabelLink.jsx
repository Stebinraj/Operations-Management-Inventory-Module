import React from 'react'
import { Link } from 'react-router-dom'

const ShipmentsIconLabelLink = () => {
    return (
        <>
            {/* shipments icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#packedItems" style={{ color: 'grey' }}>
                <i className="bi bi-box2 me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    2
                </span>
                Shipped Items
            </Link>
        </>
    )
}

export default ShipmentsIconLabelLink