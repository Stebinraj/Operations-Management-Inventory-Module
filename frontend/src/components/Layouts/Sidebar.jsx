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
        { title: 'Sales Orders', navigate: '/orders/sales', icon: 'bi-bag-check', fontSize: '21px', iconColor: 'indigo' }
    ]

    return (
        <>
            {/* sidebar */}
            <div className="sidebar">
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