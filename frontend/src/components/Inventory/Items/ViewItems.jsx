import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AdjustmentModal from './AdjustmentModal';
import ItemsList from './ItemsList';
import ItemsListTable from './ItemsListTable';
import AdjustmentForm from './AdjustmentForm';
import { v4 as uuidv4 } from 'uuid';

const ViewItems = ({ itemsPage }) => {

    // State variables to view items
    const [itemsData, setItemsData] = useState([]);

    // State variables to adjust inventory adjustments
    const [item_id, setItemId] = useState('');
    const [mode_of_adjustment, setModeOfAdjustment] = useState({ mode_of_adjustment: '', class: '', feedback: '' });
    const [reason, setReason] = useState({ reason: '', class: '', feedback: '' });
    const [description, setDescription] = useState({ description: '', class: '', feedback: '' });
    const [selling_price, setSellingPrice] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [quantity, setQuantity] = useState({ quantity: '', class: '', feedback: '' });
    const [value, setValue] = useState({ value: '', class: '', feedback: '' });
    const aplhaNumericRegex = /^[\w\s]+$/;
    const numberRegex = /^[-+]?\d+$/;

    // fetch items and set to setItemsData
    const getItems = async () => {
        try {
            const response = await axios.get('/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // store item id, selling price, opening_stock, description in state variable for inventory adjustments
    const handleAdjust = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setSellingPrice(value.selling_price);
        setOpeningStock(value.opening_stock);
        setDescription({ ...description, description: value.description });
    };

    // When changing the mode of adjustment, reset quantity, value and reason if necessary
    const handleModeOfAdjustmentChange = (e) => {
        setModeOfAdjustment({ ...mode_of_adjustment, mode_of_adjustment: e.target.value });
        if (e.target.value === 'Quantity') {
            setQuantity({ quantity: '', class: '', feedback: '' });
        } else if (e.target.value === "Value") {
            setValue({ value: '', class: '', feedback: '' });
        }
        setReason({ reason: '', class: '', feedback: '' });
    };

    // submit inventory adjustments data
    const submitAdjustment = async (e) => {
        try {
            e.preventDefault();
            const validateQuantityorValue = mode_of_adjustment.mode_of_adjustment === "Quantity" ? await validateQuantity() : mode_of_adjustment.mode_of_adjustment === "Value" ? await validateValue() : null
            if (await validateModeOfAdjustment() & await validateReason() & await validateDescription() & validateQuantityorValue) {
                // checking for non negative while adding opening stock and quantity
                if (Number(opening_stock) + Number(quantity.quantity) < 0) {
                    toast.error('Invalid Quantity !!!');
                    await handleAdjustClose();
                    return;
                }
                // checking for non negative while adding selling price and value
                else if (Number(selling_price) + Number(value.value) < 0) {
                    toast.error('Invalid Value !!!');
                    await handleAdjustClose();
                    return;
                }
                // send adjustments data to the database
                const response = await axios.put(`/adjust-items/${item_id}`, {
                    item_id,
                    mode_of_adjustment: mode_of_adjustment.mode_of_adjustment,
                    reference_number:uuidv4().replace(/-/g, ''),
                    date: new Date(),
                    reason: reason.reason,
                    description: description.description,
                    quantity: quantity.quantity,
                    value: value.value
                });
                // if adjustment data sends and save successfully an alert appears then the state variables set to empty
                if (response && response.data.success) {
                    toast.success('Items Adjusted Successfully !!!');
                    setTimeout(async () => {
                        await handleAdjustClose();
                        document.getElementById("closeAdjustmentModalButton").click();
                    }, 1000);
                    await getItems();
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // validate mode of adjustment
    const validateModeOfAdjustment = async () => {
        if (mode_of_adjustment.mode_of_adjustment === '') {
            setModeOfAdjustment({ ...mode_of_adjustment, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (mode_of_adjustment.mode_of_adjustment) {
            setModeOfAdjustment({ ...mode_of_adjustment, feedback: 'All Good', class: 'is-valid' });
            return true;
        }
    };

    // validate reason
    const validateReason = async () => {
        if (reason.reason === "") {
            setReason({ ...reason, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (aplhaNumericRegex.test(reason.reason)) {
            setReason({ ...reason, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setReason({ ...reason, feedback: 'Text and Numbers Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // validate quantity
    const validateQuantity = async () => {
        if (quantity.quantity === "") {
            setQuantity({ ...quantity, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(quantity.quantity)) {
            setQuantity({ ...quantity, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setQuantity({ ...quantity, feedback: 'Numbers Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // validate description
    const validateDescription = async () => {
        if (description.description === "") {
            setDescription({ ...description, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else {
            setDescription({ ...description, feedback: 'All Good', class: 'is-valid' });
            return true;
        }
    }

    // validate value
    const validateValue = async () => {
        if (value.value === "") {
            setValue({ ...value, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(value.value)) {
            setValue({ ...value, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setValue({ ...value, feedback: 'Numbers Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // closing the adjustment to make state variables empty
    const handleAdjustClose = async () => {
        setItemId('');
        setModeOfAdjustment({ mode_of_adjustment: '', class: '', feedback: '' });
        setReason({ reason: '', class: '', feedback: '' });
        setDescription({ description: '', class: '', feedback: '' });
        setSellingPrice('');
        setOpeningStock('');
        setQuantity({ quantity: '', class: '', feedback: '' });
        setValue({ value: '', class: '', feedback: '' });
    };

    // handle side-effects while fetching items
    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            {/* adjustment modal component */}
            <AdjustmentModal
                handleAdjustClose={handleAdjustClose}
                submitAdjustment={submitAdjustment}
                adjustmentForm={
                    <AdjustmentForm
                        handleModeOfAdjustmentChange={handleModeOfAdjustmentChange}
                        setDescription={setDescription}
                        setQuantity={setQuantity}
                        setReason={setReason}
                        setValue={setValue}
                        mode_of_adjustment={mode_of_adjustment}
                        opening_stock={opening_stock}
                        quantity={quantity}
                        selling_price={selling_price}
                        value={value}
                        reason={reason}
                        description={description}
                    />
                }
            />
            {/* adjustment modal component */}

            {/* items list component */}
            <ItemsList
                itemsListTable={
                    <ItemsListTable
                        handleAdjust={handleAdjust}
                        itemsData={itemsData}
                        itemsPage={itemsPage}
                    />
                }
            />
        </>
    )
}

export default ViewItems