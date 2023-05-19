import React from 'react'
import { Link } from 'react-router-dom'

const CreditNotesIconLabelLink = ({ creditNotesData }) => {
    return (
        <>
            {/* issued credits notes icons with label link */}
            <Link className="position-relative ms-4 h6 sidebar-links" data-bs-toggle="modal" data-bs-target="#issuedCreditNotes" style={{ color: 'grey' }}>
                <i className="bi bi-file-earmark-check me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {creditNotesData.length}
                </span>
                Issued Credit Notes
            </Link>
        </>
    )
}

export default CreditNotesIconLabelLink