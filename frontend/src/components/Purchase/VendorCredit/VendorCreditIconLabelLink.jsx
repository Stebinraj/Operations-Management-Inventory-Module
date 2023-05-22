import React from 'react'
import { Link } from 'react-router-dom'

const VendorCreditIconLabelLink = ({ vendorCreditsData }) => {
    return (
        <>
            {/* bills payments icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#vendorsCredited" style={{ color: 'grey' }}>
                <i className="bi bi-currency-exchange me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {vendorCreditsData.length}
                </span>
                Vendors Credited
            </Link>
        </>
    )
}

export default VendorCreditIconLabelLink