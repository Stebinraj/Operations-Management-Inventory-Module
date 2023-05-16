import React from 'react'
import { Link } from 'react-router-dom'

const DeliveredIconsLabelLink = ({ deliveredItemsData }) => {
    return (
        <>
            {/* delivered icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#deliveredItems" style={{ color: 'grey' }}>
                <i className="bi bi-check-circle me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {deliveredItemsData.length}
                </span>
                Delivered Items
            </Link>
        </>
    )
}

export default DeliveredIconsLabelLink