import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import AddCustomerButton from './AddCustomerButton';
import AddCustomerModal from './AddCustomerModal';
import CustomerLists from './CustomerLists';
import CustomerListTable from './CustomerListTable';

const Customers = () => {

    const [name, setName] = useState({ name: '', class: '', feedback: '' });
    const [email, setEmail] = useState({ email: '', class: '', feedback: '' });
    const [phone_number, setPhoneNumber] = useState({ phone_number: '', class: '', feedback: '' });
    const [billing_address, setBillingAddress] = useState({ billing_address: '', class: '', feedback: '' });
    // conditionally render form create and update user
    const [updateForm, setupdateForm] = useState(false);
    const nameRegex = /^[A-Za-z\s]+$/;

    // state variable of customers datas
    const [customerData, setCustomerData] = useState([]);
    const [id, setId] = useState('');

    // create / update form close to set variables empty 
    const handleClose = async () => {
        setName({ name: '', class: '', feedback: '' });
        setEmail({ email: '', class: '', feedback: '' });
        setPhoneNumber({ phone_number: '', class: '', feedback: '' });
        setBillingAddress({ billing_address: '', class: '', feedback: '' });
        setupdateForm(false);
    };

    // create new customer
    const addCustomer = async (e) => {
        try {
            e.preventDefault();
            if (await ValidateName() & await validateEmail() & await validatePhoneNumber() & await validateBillingAddress()) {
                const response = await axios.post('/customer', {
                    name: name.name,
                    email: email.email,
                    phone_number: phone_number.phone_number,
                    billing_address: billing_address.billing_address
                });
                if (response && response.data.success) {
                    toast.success('Customer Added Successfully !!!');
                    setTimeout(() => {
                        setName({ name: '', class: '', feedback: '' });
                        setEmail({ email: '', class: '', feedback: '' });
                        setPhoneNumber({ phone_number: '', class: '', feedback: '' });
                        setBillingAddress({ billing_address: '', class: '', feedback: '' });
                        document.getElementById("addCustomerModalButton").click();
                    }, 1000);
                    await getCustomer();
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // fetch customers and set to setCustomerData
    const getCustomer = async () => {
        try {
            const response = await axios.get('/customer');
            if (response && response.data.success) {
                setCustomerData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // before updating customer store id, name, email, phone number, billing address to a variable
    const handleUpdateData = async (e, value) => {
        e.preventDefault();
        setId(value._id);
        setName({ ...name, name: value.name });
        setEmail({ ...email, email: value.email });
        setPhoneNumber({ ...phone_number, phone_number: value.phone_number });
        setBillingAddress({ ...billing_address, billing_address: value.billing_address });
        setupdateForm(true);
    };

    // update a customer
    const updateCustomer = async (e) => {
        try {
            e.preventDefault();
            if (await ValidateName() & await validateEmail() & await validatePhoneNumber() & await validateBillingAddress()) {
                const response = await axios.put(`/customer/${id}`, {
                    name: name.name,
                    email: email.email,
                    phone_number: phone_number.phone_number,
                    billing_address: billing_address.billing_address
                });
                if (response && response.data.success) {
                    setId('');
                    setTimeout(() => {
                        setName({ name: '', class: '', feedback: '' });
                        setEmail({ email: '', class: '', feedback: '' });
                        setPhoneNumber({ phone_number: '', class: '', feedback: '' });
                        setBillingAddress({ billing_address: '', class: '', feedback: '' });
                        document.getElementById("addCustomerModalButton").click();
                        setupdateForm(false);
                    }, 1000);
                    toast.success('Customer Updated !!!');
                    await getCustomer();
                }
            };
        } catch (error) {
            console.log(error.message);
        }
    };

    // validate name
    const ValidateName = async () => {
        if (name.name === "") {
            setName({ ...name, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (nameRegex.test(name.name)) {
            setName({ ...name, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setName({ ...name, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // validate email
    const validateEmail = async () => {
        if (email.email === "") {
            setEmail({ ...email, feedback: 'Required *', class: 'is-invalid' });
            return false;
        }
        else if (EmailValidator.validate(email.email)) {
            setEmail({ ...email, feedback: 'All Good', class: 'is-valid' });
            return true;
        }
        else {
            setEmail({ ...email, feedback: 'Invalid Email', class: 'is-invalid' });
            return false;
        }
    };

    // validate phone number
    const validatePhoneNumber = async () => {
        const pattern_1 = /^\d{10}$/;
        const pattern_2 = /^[1-9]\d{2}[-][1-9]\d{2}[-]\d{4}$/;
        const pattern_3 = /^[1-9]\d{2}\.\d{3}\.\d{4}$/;
        const pattern_4 = /^[1-9]\d{2}\s\d{3}\s\d{4}$/;

        if (pattern_1.test(phone_number.phone_number) || pattern_2.test(phone_number.phone_number) || pattern_3.test(phone_number.phone_number) || pattern_4.test(phone_number.phone_number)) {
            setPhoneNumber({ ...phone_number, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (phone_number.phone_number === "") {
            setPhoneNumber({ ...phone_number, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else {
            setPhoneNumber({ ...phone_number, feedback: 'Invalid Phone Number', class: 'is-invalid' });
            return false;
        }
    };

    // Validate billing Address
    const validateBillingAddress = async () => {
        const address_pattern = /^([a-zA-Z0-9\s,-]+)$/;
        if (address_pattern.test(billing_address.billing_address)) {
            setBillingAddress({ ...billing_address, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (billing_address.billing_address === "") {
            setBillingAddress({ ...billing_address, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else {
            setBillingAddress({ ...billing_address, feedback: 'Invalid Address', class: 'is-invalid' });
            return false;
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