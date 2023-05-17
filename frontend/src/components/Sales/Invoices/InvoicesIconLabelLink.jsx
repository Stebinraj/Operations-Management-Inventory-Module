import React from 'react'
import { Link } from 'react-router-dom'

const InvoicesIconLabelLink = ({ invoicedItemsData }) => {
    return (
        <>
            {/* invoices icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#invoicedItems" style={{ color: 'grey' }}>
                <i className="bi bi-clipboard-check me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {invoicedItemsData.length}
                </span>
                Invoiced Items
            </Link>
        </>
    )
}

export default InvoicesIconLabelLink