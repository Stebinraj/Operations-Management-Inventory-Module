import React from 'react'

const AddVendorsModal = ({ setName, setEmail, email, setPhoneNumber, phone_number, setAddress, address, handleClose, name, updateForm, addVendor, updateVendor }) => {
    return (
        <>
            <div className="modal fade" id="addVendors" tabIndex={-1} aria-labelledby="addVendorsLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {updateForm ? 'Update Vendor' : 'Create Vendor'}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
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
                                    <span>Address</span>
                                    <input type="text" className="form-control" placeholder='Enter Billing Address' onChange={(e) => { setAddress(e.target.value) }} value={address} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { updateForm ? (updateVendor(e)) : (addVendor(e)) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVendorsModal