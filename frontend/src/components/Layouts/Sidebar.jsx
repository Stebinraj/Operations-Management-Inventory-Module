import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    // sidebar links with icons, path, color, size
    const sidebarLinks = [
        { title: 'Dashboard', navigate: '/', icon: 'bi-house-door', fontSize: '21px', iconColor: 'blue' },
        { title: 'Items Group', navigate: '/group/items', icon: 'bi-collection', fontSize: '21px', iconColor: 'blue' },
        { title: 'Items', navigate: '/view/items', icon: 'bi-bag', fontSize: '21px', iconColor: 'brown' },
        { title: 'Inventory Adjustments', navigate: '/adjustments/inventory', icon: 'bi-bag-plus', fontSize: '21px', iconColor: 'orange' },
        { title: 'Customers', navigate: '/customers', icon: 'bi-person-circle', fontSize: '21px', iconColor: 'purple' },
        { title: 'Sales Orders', navigate: '/orders/sales', icon: 'bi-bag-check', fontSize: '21px', iconColor: 'indigo' },
        { title: 'Packages', navigate: '/packages', icon: 'bi-cart4', fontSize: '21px', iconColor: 'lightBlue' },
        { title: 'Delivery Challans', navigate: '/delivery/challans', icon: 'bi-card-checklist', fontSize: '21px', iconColor: 'pink' },
        { title: 'Shipments', navigate: '/shipments', icon: 'bi-truck', fontSize: '21px', iconColor: 'orange' },
        { title: 'Delivered Items', navigate: '/delivered/items', icon: 'bi-patch-check', fontSize: '21px', iconColor: 'purple' },
        { title: 'Invoices', navigate: '/invoices', icon: 'bi-ticket-perforated', fontSize: '21px', iconColor: 'red' },
        { title: 'Payments Received', navigate: '/payments/received', icon: 'bi-receipt', fontSize: '21px', iconColor: 'teal' },
        { title: 'Sales Returns', navigate: '/returns/sales', icon: 'bi-box', fontSize: '21px', iconColor: 'blue' },
        { title: 'Returned Items', navigate: '/returns/items', icon: 'bi-boxes', fontSize: '21px', iconColor: 'blue' },
        { title: 'Credit Notes', navigate: '/returns/credit', icon: 'bi-card-list', fontSize: '21px', iconColor: 'brown' },
        { title: 'Vendors', navigate: '/vendors', icon: 'bi-person-up', fontSize: '21px', iconColor: 'orange' }
    ]

    return (
        <>
            {/* sidebar */}
            <div className="sidebar" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column">
                        <li className="nav-item">
                            {sidebarLinks.map((value, index) => {
                                return (
                                    <Link key={index} to={value.navigate} replace={true} className="nav-link text-dark" onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }) }}>
                                        <i className={`nav-icon ${value.icon}`} style={{ fontSize: value.fontSize, color: value.iconColor }}></i>
                                        <p className='sidebar-links ml-3' style={{ color: 'grey' }}>
                                            {value.title}
                                        </p>
                                    </Link>
                                )
                            })}
                        </li>
                    </ul>
                </nav>
                {/* sidebar-menu */}
            </div>
        </>
    )
}

export default Sidebar