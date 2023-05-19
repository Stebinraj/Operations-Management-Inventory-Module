import React, { useEffect, useState } from 'react'
import AddVendorsButton from './AddVendorsButton'
import AddVendorsModal from './AddVendorsModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import VendorsList from './VendorsList';
import VendorsListTable from './VendorsListTable';

const Vendors = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    // conditionally render form create and update user
    const [updateForm, setupdateForm] = useState(false);

    // state variable of customers datas
    const [vendorData, setVendorData] = useState([]);
    const [id, setId] = useState('');

    // create / update form close to set variables empty 
    const handleClose = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhoneNumber('');
        setAddress('')
        setupdateForm(false);
    };


    // create new vendors
    const addVendor = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/vendors', { name, email, phone_number, address });
            if (response && response.data.success) {
                toast.success('Vendor Added Successfully !!!');
                setName('');
                setEmail('');
                setPhoneNumber('');
                setAddress('');
                await getVendors();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // before updating customer store id, name, email, phone number, billing address to a variable
    const handleUpdateData = async (e, value) => {
        e.preventDefault();
        setId(value._id);
        setName(value.name);
        setEmail(value.email);
        setPhoneNumber(value.phone_number);
        setAddress(value.address);
        setupdateForm(true);
    };

    // update new vendors
    const updateVendor = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/vendors/${id}`, { name, email, phone_number, address });
            if (response && response.data.success) {
                setName('');
                setEmail('');
                setPhoneNumber('');
                setAddress('');
                setId('');
                toast.success('Vendor Updated !!!');
                await getVendors();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // fetch vendors and set to vendorData
    const getVendors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/vendors');
            if (response && response.data.success) {
                setVendorData(response.data.success)
                setupdateForm(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // handle sideeffects while fetching vendors
    useEffect(() => {
        getVendors();
    }, [])


    return (
        <>
            {/* Add vendors button component */}
            <AddVendorsButton />

            {/* add vendors modal form component */}
            <AddVendorsModal
                setName={setName}
                setEmail={setEmail}
                email={email}
                setPhoneNumber={setPhoneNumber}
                phone_number={phone_number}
                setAddress={setAddress}
                address={address}
                handleClose={handleClose}
                name={name}
                updateForm={updateForm}
                addVendor={addVendor}
                updateVendor={updateVendor}
            />
            {/* add vendors modal form component */}

            {/* vendors lists components */}
            <VendorsList
                vendorsListTable={
                    <VendorsListTable
                        vendorData={vendorData}
                        handleUpdateData={handleUpdateData}
                    />
                }
            />
        </>
    )
}

export default Vendors