import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            {/* navbar */}
            <nav className="main-header navbar navbar-expand navbar-white">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="pushmenu"><i className="fas fa-bars"></i></Link>
                    </li>
                </ul>

                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* user panel */}
                    <li>
                        <div className="user-panel d-flex">
                            <div className="image">
                                <img src={require('../../assets/images/userlogo.png')} alt="User" />
                            </div>
                            <div className="info ">
                                <Link className="d-block text-dark">User</Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar