import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AdjustmentModal from './AdjustmentModal';
import ItemsList from './ItemsList';
import ItemsListTable from './ItemsListTable';
import AdjustmentForm from './AdjustmentForm';

const ViewItems = ({ itemsPage }) => {

    // State variables to view items
    const [itemsData, setItemsData] = useState([]);

    // State variables to adjust inventory adjustments
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

    // fetch items and set to setItemsData
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

    // store item id, selling price, opening_stock, description in state variable for inventory adjustments
    const handleAdjust = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setSellingPrice(value.selling_price);
        setOpeningStock(value.opening_stock);
        setDescription(value.description);
    };

    // When changing the mode of adjustment, reset quantity, value and reason if necessary
    const handleModeOfAdjustmentChange = (e) => {
        const selectedMode = e.target.value;
        setModeOfAdjustment(selectedMode);
        if (selectedMode === 'Quantity') {
            setQuantity('');
        } else if (selectedMode === "Value") {
            setValue('');
        }
        setReason('');
    };

    // submit inventory adjustments data
    const submitAdjustment = async (e) => {
        try {
            e.preventDefault();
            // checking for non negative while adding opening stock and quantity
            if (Number(opening_stock) + Number(quantity) < 0) {
                toast.error('Invalid Quantity !!!');
                setItemId('');
                setModeOfAdjustment('');
                setReason('');
                setDescription('');
                setSellingPrice('');
                setOpeningStock('');
                setQuantity('');
                setValue('');
                return;
            }
            // checking for non negative while adding selling price and value
            else if (Number(selling_price) + Number(value) < 0) {
                toast.error('Invalid Value !!!');
                setItemId('');
                setModeOfAdjustment('');
                setReason('');
                setDescription('');
                setSellingPrice('');
                setOpeningStock('');
                setQuantity('');
                setValue('');
                return;
            }
            // send adjustments data to the database
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
            // if adjustment data sends and save successfully an alert appears then the state variables set to empty
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

    // closing the adjustment to make state variables empty
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