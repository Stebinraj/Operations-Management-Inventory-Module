import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ViewItemsGroup from './ViewItemsGroup';
import AddItems from './AddItems';
import { toast } from 'react-toastify';
import CreateItemGroup from './CreateItemGroup';
import { useNavigate } from 'react-router-dom';

const ItemsGroup = () => {
    // State variables to view items group
    const [itemGroupData, setItemGroupData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);

    const [item_group_label, setItemGroupLabel] = useState('');
    const [item_group_id, setItemGroupId] = useState('');
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
    const [image_of_item, setImageOfItem] = useState([]);
    const navigate = useNavigate();

    // create new item groups
    const addGroup = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
            if (response && response.data.success) {
                toast.success('Group Created Successfully !!!');
                await getItemsGroup();
                setItemGroupLabel('');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // add new items to inventory
    const addItems = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('photo', image_of_item);
            formData.append('item_group_id', item_group_id);
            formData.append('item_name', item_name);
            formData.append('unit', unit);
            formData.append('dimensions', JSON.stringify(dimensions));
            formData.append('weight', weight);
            formData.append('manufacturer', manufacturer);
            formData.append('brand', brand);
            formData.append('selling_price', selling_price);
            formData.append('cost_price', cost_price);
            formData.append('description', description);
            formData.append('opening_stock', opening_stock);
            formData.append('reorder_point', reorder_point);
            formData.append('preferred_vendor', preferred_vendor);
            formData.append('added_date', new Date());
            const response = await axios.post('http://localhost:5000/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response && response.data.success) {
                toast.success('Items Created Successfully !!!');
                setItemGroupLabel('');
                setItemGroupId('');
                setItemName('');
                setUnit('');
                setDimensions('');
                setWeight('');
                setManufacturer('');
                setBrand('');
                setSellingPrice('');
                setCostPrice('');
                setDescription('');
                setOpeningStock('');
                setReorderPoint('');
                setPreferredVendor('');
                setImageOfItem([]);
                setTimeout(() => {
                    navigate('/view/items');
                }, 2500);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // create new items groups
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

    // fetch vedors and set to vendorsData
    const getVendors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/vendors');
            if (response && response.data.success) {
                setVendorsData(response.data.success);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // handles side-effects while fething items group
    useEffect(() => {
        getItemsGroup();
        getVendors();
    }, []);

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
                    itemGroupData={itemGroupData} />
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
                    item_name={item_name}
                    unit={unit}
                    weight={weight}
                    manufacturer={manufacturer}
                    brand={brand}
                    selling_price={selling_price}
                    cost_price={cost_price}
                    description={description}
                    opening_stock={opening_stock}
                    reorder_point={reorder_point}
                    preferred_vendor={preferred_vendor}
                    image_of_item={image_of_item}
                    vendorsData={vendorsData}
                />
                {/* Add items component */}
            </div>
        </>
    )
}

export default ItemsGroup