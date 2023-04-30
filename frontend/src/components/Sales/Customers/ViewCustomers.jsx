import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewCustomers = (props) => {

    const [customerData, setCustomerData] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');

    const getCustomer = async () => {
        const response = await axios.get('http://localhost:5000/customer');
        if (response && response.data.success) {
            setCustomerData(response.data.success);
        }
    };

    const handleUpdateData = async (e, value) => {
        e.preventDefault();
        setId(value._id);
        setName(value.name);
        setEmail(value.email);
        setPhoneNumber(value.phone_number);
        setBillingAddress(value.billing_address);
    };

    const updateCustomer = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/customer/${id}`, { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                setName('');
                setEmail('');
                setPhoneNumber('');
                setBillingAddress('');
                await getCustomer();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleClose = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setBillingAddress('');
    };

    useEffect(() => {
        getCustomer();
    }, [props.reload])

    return (
        <>
            <div className="modal fade" id="updateCustomers" tabIndex={-1} aria-labelledby="updateCustomersLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Customer</h1>
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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { updateCustomer(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered">
                            <thead className='text-bg-primary'>
                                <tr>
                                    <th scope="col" className='text-nowrap'>Name</th>
                                    <th scope="col" className='text-nowrap'>Email</th>
                                    <th scope="col" className='text-nowrap'>Phone Number</th>
                                    <th scope="col" className='text-nowrap'>Billing Address</th>
                                    <th scope="col" className='text-nowrap'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-nowrap'>{value.name}</td>
                                            <td className='text-nowrap'>{value.email}</td>
                                            <td className='text-nowrap'>{value.phone_number}</td>
                                            <td className='text-nowrap'>{value.billing_address}</td>
                                            <td className='text-nowrap'>
                                                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#updateCustomers" onClick={(e) => { handleUpdateData(e, value) }}>Update</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewCustomers