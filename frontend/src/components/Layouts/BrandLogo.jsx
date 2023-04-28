import React from 'react'
import { Link } from 'react-router-dom'

const BrandLogo = () => {
    return (
        <>
            <Link to={'/'} replace={true} className="brand-link pl-0" onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }) }}>
                <img src={require('../../assets/images/logo.webp')} alt="inventory" className="brand-image" />
                <span className="brand-text">Inventory</span>
            </Link>
        </>
    )
}

export default BrandLogo