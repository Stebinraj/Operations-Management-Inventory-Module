import React from 'react'
import { Link } from 'react-router-dom'

const OrdersLink = () => {
    return (
        <>
            <Link className="nav-link text-dark d-flex p-0" data-bs-toggle="modal" data-bs-target="#customers">
                <i className="nav-icon bi-cart-check me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                <p className='sidebar-links m-auto h6' style={{ color: 'grey' }}>
                    Orders
                </p>
            </Link>
        </>
    )
}

export default OrdersLink