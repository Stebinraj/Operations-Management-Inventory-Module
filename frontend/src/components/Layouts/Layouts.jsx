import React from 'react'
import Navbar from './Navbar'
import BrandLogo from './BrandLogo'
import Sidebar from './Sidebar'
// import ContentHeader from './ContentHeader'
import Footer from './Footer'
import MainContent from './MainContent'

const Layouts = (props) => {
    return (
        <>
            <div className="wrapper">
                {/* Navbar */}
                <Navbar />
                {/* navbar */}

                {/* Main Sidebar Container */}
                <aside className="main-sidebar bg-white position-fixed vh-100">
                    {/* Brand Logo */}
                    <BrandLogo />

                    {/* Sidebar */}
                    <Sidebar />
                    {/* sidebar */}
                </aside>

                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    {/* <ContentHeader /> */}
                    {/* content-header */}

                    {/* Main content */}
                    <div className="content pt-3">
                        <MainContent
                            dashboard={props.dashboard}
                            itemGroup={props.itemGroup}
                            items={props.items}
                            inventoryAdjustment={props.inventoryAdjustment}
                            customers={props.customers}
                            salesOrder={props.salesOrder}
                        />
                    </div>
                    {/* content */}
                </div>
                {/* content wrapper */}

                {/* Main Footer */}
                <Footer />

                <div id="sidebar-overlay" data-widget="pushmenu"></div>

            </div>
            {/* wrapper */}
        </>
    )
}

export default Layouts