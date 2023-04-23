import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column">
                        <li className="nav-item">
                            <Link to={'/'} replace={true} className="nav-link">
                                <i className="nav-icon bi bi-house-door" style={{ fontSize: '21px', color: 'blue' }}></i>
                                <p className='sidebar-links ml-3' style={{ color: 'grey' }}>
                                    Dashboard
                                </p>
                            </Link>
                            <Link to={'/group/items'} replace={true} className="nav-link text-dark">
                                <i className="nav-icon bi bi-collection" style={{ fontSize: '21px', color: 'blue' }}></i>
                                <p className='sidebar-links ml-3' style={{ color: 'grey' }}>
                                    Items Group
                                </p>
                            </Link>
                            <Link to={'/view/items'} replace={true} className="nav-link text-dark">
                                <i className="nav-icon bi-bag" style={{ fontSize: '21px', color: 'brown' }}></i>
                                <p className='sidebar-links ml-3' style={{ color: 'grey' }}>
                                    Items
                                </p>
                            </Link>
                            <Link className="nav-link text-dark">
                                <i className="nav-icon bi bi-bag-plus" style={{ fontSize: '21px', color: 'orange' }}></i>
                                <p className='sidebar-links ml-3' style={{ color: 'grey' }}>
                                    Inventory Adjustments
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* sidebar-menu */}
            </div>
        </>
    )
}

export default Sidebar