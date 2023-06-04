import React from 'react'

const AddCustomerModal = ({ setName, setEmail, email, setPhoneNumber, phone_number, setBillingAddress, billing_address, handleClose, addCustomer, name, updateCustomer, updateForm }) => {
    return (
        <>
            <div className="modal fade" id="customers" tabIndex={-1} aria-labelledby="customersLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {updateForm ? 'Update Customer' : 'Create Customer'}
                            </h1>
                            <button type="button" id='addCustomerModalButton' className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-12">
                                    <span>Name</span>
                                    <input id='customer-name' type="text" className={name.class ? (`form-control ${name.class}`) : ('form-control')} placeholder='Enter Name' onChange={(e) => { setName({ ...name, name: e.target.value }) }} value={name.name} />
                                    {name.feedback && (
                                        <>
                                            <small className="valid-feedback">{name.feedback}</small>
                                            <small className="invalid-feedback">{name.feedback}</small>
                                        </>
                                    )}
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Email</span>
                                    <input id='customer-email' type="text" className={email.class ? (`form-control ${email.class}`) : ('form-control')} placeholder='Enter Email' onChange={(e) => { setEmail({ ...email, email: e.target.value }) }} value={email.email} />
                                    {email.feedback && (
                                        <>
                                            <small className="valid-feedback">{email.feedback}</small>
                                            <small className="invalid-feedback">{email.feedback}</small>
                                        </>
                                    )}
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Phone Number</span>
                                    <input id='customer-phone-number' type="text" className={phone_number.class ? (`form-control ${phone_number.class}`) : ('form-control')} placeholder='Enter Phone Number' onChange={(e) => { setPhoneNumber({ ...phone_number, phone_number: e.target.value }) }} value={phone_number.phone_number} />
                                    {phone_number.feedback && (
                                        <>
                                            <small className="valid-feedback">{phone_number.feedback}</small>
                                            <small className="invalid-feedback">{phone_number.feedback}</small>
                                        </>
                                    )}
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Billing Address</span>
                                    <input id='customer-billing-address' type="text" className={billing_address.class ? (`form-control ${billing_address.class}`) : ('form-control')} placeholder='Enter Billing Address' onChange={(e) => { setBillingAddress({ ...billing_address, billing_address: e.target.value }) }} value={billing_address.billing_address} />
                                    {billing_address.feedback && (
                                        <>
                                            <small className="valid-feedback">{billing_address.feedback}</small>
                                            <small className="invalid-feedback">{billing_address.feedback}</small>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => { updateForm ? (updateCustomer(e)) : (addCustomer(e)) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCustomerModal