import React from 'react'
import { Link } from 'react-router-dom'

const BrandLogo = () => {
    return (
        <>
            {/* brand logo */}
            <Link to={'/'} replace={true} className="brand-link" onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }) }}>
                <img src={require('../../assets/images/brand-logo.png')} alt="inventory" className="brand-image" />
                <span className="brand-text">Inventory</span>
            </Link>
        </>
    )
}

export default BrandLogo