import React from 'react'
import CustomerUpdateModal from './CustomerUpdateModal';
import CustomerLists from './CustomerLists';

const ViewCustomers = ({ customerData, handleUpdateData, name, setName, setEmail, setBillingAddress, email, billing_address, setPhoneNumber, phone_number, handleClose, updateCustomer }) => {
    return (
        <>
            <CustomerUpdateModal
                name={name}
                setName={setName}
                setEmail={setEmail}
                setBillingAddress={setBillingAddress}
                email={email}
                billing_address={billing_address}
                setPhoneNumber={setPhoneNumber}
                phone_number={phone_number}
                handleClose={handleClose}
                updateCustomer={updateCustomer}
            />

            <CustomerLists
                customerData={customerData}
                handleUpdateData={handleUpdateData}
            />
        </>
    )
}

export default ViewCustomers