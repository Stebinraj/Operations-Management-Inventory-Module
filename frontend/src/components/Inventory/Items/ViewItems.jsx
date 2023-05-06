import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AdjustmentModal from './AdjustmentModal';
import ItemsList from './ItemsList';

const ViewItems = () => {

    const [itemsData, setItemsData] = useState([]);

    const [item_id, setItemId] = useState('');
    const [mode_of_adjustment, setModeOfAdjustment] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const randomNum = Math.floor(Math.random() * 10000000000);
    const reference_number = String(randomNum).padStart(10, '0');

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAdjust = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setSellingPrice(value.selling_price);
        setOpeningStock(value.opening_stock);
        setDescription(value.description);
    };

    const handleModeOfAdjustmentChange = (e) => {
        const selectedMode = e.target.value;
        setModeOfAdjustment(selectedMode);
        if (selectedMode === 'Quantity') {
            setQuantity('');
            setReason('');
        } else if (selectedMode === "Value") {
            setValue('');
            setReason('');
        }
    };

    const submitAdjustment = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/adjust-items/${item_id}`, {
                item_id,
                mode_of_adjustment,
                reference_number,
                date: new Date(),
                reason,
                description,
                quantity,
                value
            });
            if (response && response.data.success) {
                toast.success('Items Adjusted Successfully !!!');
                setItemId('');
                setModeOfAdjustment('');
                setReason('');
                setDescription('');
                setSellingPrice('');
                setOpeningStock('');
                setQuantity('');
                setValue('');
                await getItems();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdjustClose = async (e) => {
        e.preventDefault();
        setItemId('');
        setModeOfAdjustment('');
        setReason('');
        setDescription('');
        setSellingPrice('');
        setOpeningStock('');
        setQuantity('');
        setValue('');
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            <AdjustmentModal
                handleAdjustClose={handleAdjustClose}
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
                submitAdjustment={submitAdjustment}
            />

            <ItemsList
                handleAdjust={handleAdjust}
                itemsData={itemsData}
            />
        </>
    )
}

export default ViewItems