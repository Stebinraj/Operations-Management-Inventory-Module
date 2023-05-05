import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AddCustomerButton from './AddCustomerButton';
import AddCustomerModal from './AddCustomerModal';
import CustomerLists from './CustomerLists';

const Customers = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    const [updateForm, setupdateForm] = useState(false);

    const [customerData, setCustomerData] = useState([]);
    const [id, setId] = useState('');

    const handleClose = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setBillingAddress('');
        setupdateForm(false);
    };

    const addCustomer = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/customer', { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                toast.success('Customer Added Successfully !!!');
                setName('');
                setEmail('');
                setPhoneNumber('');
                setBillingAddress('');
                await getCustomer();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customer');
            if (response && response.data.success) {
                setCustomerData(response.data.success);
                setupdateForm(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleUpdateData = async (e, value) => {
        e.preventDefault();
        setId(value._id);
        setName(value.name);
        setEmail(value.email);
        setPhoneNumber(value.phone_number);
        setBillingAddress(value.billing_address);
        setupdateForm(true);
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
                setId('');
                await getCustomer();
                toast.success('Customer Updated !!!');
                await getCustomer();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCustomer();
    }, [])

    return (
        <>
            <AddCustomerButton />

            <AddCustomerModal
                setName={setName}
                setEmail={setEmail}
                email={email}
                setPhoneNumber={setPhoneNumber}
                phone_number={phone_number}
                setBillingAddress={setBillingAddress}
                billing_address={billing_address}
                handleClose={handleClose}
                addCustomer={addCustomer}
                name={name}
                updateCustomer={updateCustomer}
                updateForm={updateForm}
            />

            <CustomerLists
                customerData={customerData}
                handleUpdateData={handleUpdateData}
            />
        </>
    )
}

export default Customers