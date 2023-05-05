import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ViewItemsGroup from './ViewItemsGroup';
import AddItems from './AddItems';
import { toast } from 'react-toastify';
import CreateItemGroup from './CreateItemGroup';
import { useNavigate } from 'react-router-dom';

const ItemsGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [reload, setReload] = useState(false);
    const [groupData, setGroupData] = useState([]);

    const [item_group_id, setItemGroupId] = useState('');
    const [itemGroupData, setItemGroupData] = useState([]);
    const [item_name, setItemName] = useState('');
    const [unit, setUnit] = useState('');
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: ''
    });
    const [weight, setWeight] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [description, setDescription] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [reorder_point, setReorderPoint] = useState('');
    const [preferred_vendor, setPreferredVendor] = useState('');
    const [image_of_item, setImageOfItem] = useState('');
    const navigate = useNavigate();

    const addGroup = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
            if (response && response.data.success) {
                toast.success('Group Created Successfully !!!');
                setReload(true);
                setItemGroupLabel('');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const addItems = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items', {
                item_group_id,
                item_name,
                unit,
                dimensions,
                weight,
                manufacturer,
                brand,
                selling_price,
                cost_price,
                description,
                opening_stock,
                reorder_point,
                preferred_vendor,
                image_of_item
            });
            if (response && response.data.success) {
                toast.success('Items Created Successfully !!!');
                setTimeout(() => {
                    navigate('/view/items');
                }, 2500);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const getGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setGroupData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const getItemsGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemGroupData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getGroup();
        getItemsGroup();
    }, [reload]);

    return (
        <>
            <div className="col-md-6">
                {/* create new item group */}
                <CreateItemGroup
                    setItemGroupLabel={setItemGroupLabel}
                    addGroup={addGroup}
                    item_group_label={item_group_label}
                />
                {/* create new item group */}

                {/* View item group component */}
                <ViewItemsGroup
                    groupData={groupData} />
                {/* View item group component */}
            </div>

            <div className="col-md-6">
                {/* Add items component */}
                <AddItems
                    itemGroupData={itemGroupData}
                    item_group_id={item_group_id}
                    setItemGroupId={setItemGroupId}
                    addItems={addItems}
                    setImageOfItem={setImageOfItem}
                    setPreferredVendor={setPreferredVendor}
                    setReorderPoint={setReorderPoint}
                    setOpeningStock={setOpeningStock}
                    setDescription={setDescription}
                    setDimensions={setDimensions}
                    setBrand={setBrand}
                    setCostPrice={setCostPrice}
                    setSellingPrice={setSellingPrice}
                    setManufacturer={setManufacturer}
                    setItemName={setItemName}
                    setUnit={setUnit}
                    setWeight={setWeight}
                    dimensions={dimensions}
                />
                {/* Add items component */}
            </div>
        </>
    )
}

export default ItemsGroup