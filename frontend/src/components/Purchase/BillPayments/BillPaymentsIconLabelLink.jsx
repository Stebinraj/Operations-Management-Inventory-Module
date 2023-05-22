import React from 'react'
import { Link } from 'react-router-dom'

const BillPaymentsIconLabelLink = ({ billsPaymentsData }) => {
    return (
        <>
            {/* bills payments icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#billsPayments" style={{ color: 'grey' }}>
                <i className="bi bi-check2-square me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {billsPaymentsData.length}
                </span>
                Bills Paid
            </Link>
        </>
    )
}

export default BillPaymentsIconLabelLink