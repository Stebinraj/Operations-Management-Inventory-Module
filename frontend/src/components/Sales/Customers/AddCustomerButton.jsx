import React from 'react'
import { Link } from 'react-router-dom'

const AddCustomerButton = () => {
    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                <Link className="nav-link text-dark d-flex p-0" data-bs-toggle="modal" data-bs-target="#customers">
                    <i className="nav-icon bi bi-filter-circle me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                    <p className='sidebar-links m-auto h6' style={{ color: 'grey' }}>
                        Add Customer
                    </p>
                </Link>
            </div>
        </>
    )
}

export default AddCustomerButton