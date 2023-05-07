import React from 'react'
import { Link } from 'react-router-dom'

const FilterButton = () => {
    return (
        <>
            {/* inventory adjustments filter link */}
            <div className="col-12 d-flex justify-content-end mb-2">
                <Link className="nav-link text-dark d-flex p-0" data-bs-toggle="collapse" data-bs-target="#filterInventoryReports">
                    <i className="nav-icon bi bi-filter-circle me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                    <p className='sidebar-links m-auto h6' style={{ color: 'grey' }}>
                        Filter
                    </p>
                </Link>
            </div>
        </>
    )
}

export default FilterButton