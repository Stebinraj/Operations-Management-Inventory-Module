import React from 'react'

const AddCustomerModal = ({ setName, setEmail, email, setPhoneNumber, phone_number, setBillingAddress, billing_address, handleClose, addCustomer, name, updateCustomer, updateForm }) => {
    return (
        <>
            <div className="modal fade" id="customers" tabIndex={-1} aria-labelledby="customersLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {updateForm ? (
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Customer</h1>
                            ) : (
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create Customer</h1>
                            )}
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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { updateForm ? (updateCustomer(e)) : (addCustomer(e)) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCustomerModal