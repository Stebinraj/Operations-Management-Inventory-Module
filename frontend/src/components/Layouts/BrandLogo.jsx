import React from 'react'
import { Link } from 'react-router-dom'

const BrandLogo = () => {
    return (
        <>
            <Link className="brand-link pl-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png"
                    alt="AdminLTE Logo" className="brand-image" />
                <span className="brand-text">Company</span>
            </Link>
        </>
    )
}

export default BrandLogo