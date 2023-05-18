import React from 'react'
import { Link } from 'react-router-dom'

const SalesReturnsProcessedItemsIconLabelLink = ({ processedReturnsItemsData }) => {
    return (
        <>
            {/* sales return processed items icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#salesReturnsProcessedItems" style={{ color: 'grey' }}>
                <i className="bi bi-capslock me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {processedReturnsItemsData.length}
                </span>
                Returns Processed Items
            </Link>
        </>
    )
}

export default SalesReturnsProcessedItemsIconLabelLink