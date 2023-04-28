import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ViewCustomers from './ViewCustomers';

const Customers = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    const [reload, setReload] = useState(false);

    const handleClose = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setBillingAddress('');
    };

    const addCustomer = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/customer', { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                setReload(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setBillingAddress('');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                <Link className="nav-link text-dark d-flex p-0" data-bs-toggle="modal" data-bs-target="#customers">
                    <i className="nav-icon bi bi-filter-circle me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                    <p className='sidebar-links m-auto h6' style={{ color: 'grey' }}>
                        Add Customer
                    </p>
                </Link>
            </div>

            <div className="modal fade" id="customers" tabIndex={-1} aria-labelledby="customersLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Customer</h1>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-12">
                                    <span>Name</span>
                                    <input type="text" className="form-control" placeholder='Enter Name' onChange={(e) => { setName(e.target.value) }} value={name} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Email</span>
                                    <input type="text" className="form-control" placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Phone Number</span>
                                    <input type="text" className="form-control" placeholder='Enter Phone Number' onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Billing Address</span>
                                    <input type="text" className="form-control" placeholder='Enter Billing Address' onChange={(e) => { setBillingAddress(e.target.value) }} value={billing_address} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { addCustomer(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* view customers component */}
            <ViewCustomers reload={reload} />
        </>
    )
}

export default Customers