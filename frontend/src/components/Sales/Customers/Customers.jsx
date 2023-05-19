import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AddCustomerButton from './AddCustomerButton';
import AddCustomerModal from './AddCustomerModal';
import CustomerLists from './CustomerLists';
import CustomerListTable from './CustomerListTable';

const Customers = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    // conditionally render form create and update user
    const [updateForm, setupdateForm] = useState(false);

    // state variable of customers datas
    const [customerData, setCustomerData] = useState([]);
    const [id, setId] = useState('');

    // create / update form close to set variables empty 
    const handleClose = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setBillingAddress('');
        setupdateForm(false);
    };

    // create new customer
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

    // fetch customers and set to setCustomerData
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

    // before updating customer store id, name, email, phone number, billing address to a variable
    const handleUpdateData = async (e, value) => {
        e.preventDefault();
        setId(value._id);
        setName(value.name);
        setEmail(value.email);
        setPhoneNumber(value.phone_number);
        setBillingAddress(value.billing_address);
        setupdateForm(true);
    };

    // update a customer
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
                toast.success('Customer Updated !!!');
                await getCustomer();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // handle side-effects while fetching customers
    useEffect(() => {
        getCustomer();
    }, [])

    return (
        <>
            {/* add customer button component */}
            <AddCustomerButton />

            {/* add customer modal form component */}
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
            {/* add customer modal form component */}

            {/* customer lists components */}
            <CustomerLists
                customerListTable={
                    <CustomerListTable
                        customerData={customerData}
                        handleUpdateData={handleUpdateData}
                    />
                }
            />
        </>
    )
}

export default Customers