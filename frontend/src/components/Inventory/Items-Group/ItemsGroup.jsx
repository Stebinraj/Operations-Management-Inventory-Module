import React, { useEffect, useRef, useState } from 'react'
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
    const alpabeticRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const numberRegex = /^[0-9]*$/;

    const [item_group_label, setItemGroupLabel] = useState({ item_group_label: '', class: '', feedback: '' });
    const [item_group_id, setItemGroupId] = useState({ item_group_id: '', class: '', feedback: '' });
    const [item_name, setItemName] = useState({ item_name: '', class: '', feedback: '' });
    const [unit, setUnit] = useState({ unit: '', class: '', feedback: '' });
    const [length, setLength] = useState({ length: '', class: '', feedback: '' });
    const [width, setWidth] = useState({ width: '', class: '', feedback: '' });
    const [height, setHeight] = useState({ height: '', class: '', feedback: '' });
    const [weight, setWeight] = useState({ weight: '', class: '', feedback: '' });
    const [manufacturer, setManufacturer] = useState({ manufacturer: '', class: '', feedback: '' });
    const [brand, setBrand] = useState({ brand: '', class: '', feedback: '' });
    const [selling_price, setSellingPrice] = useState({ selling_price: '', class: '', feedback: '' });
    const [cost_price, setCostPrice] = useState({ cost_price: '', class: '', feedback: '' });
    const [description, setDescription] = useState('');
    const [opening_stock, setOpeningStock] = useState({ opening_stock: '', class: '', feedback: '' });
    const [reorder_point, setReorderPoint] = useState({ reorder_point: '', class: '', feedback: '' });
    const [preferred_vendor, setPreferredVendor] = useState({ preferred_vendor: '', class: '', feedback: '' });
    const [image_of_item, setImageOfItem] = useState([]);
    const navigate = useNavigate();
    const fileInput = useRef(null);

    // create new item groups
    const addGroup = async (e) => {
        try {
            e.preventDefault();
            if (await validateItemGroup()) {
                const response = await axios.post('http://localhost:5000/items-group', { item_group_label: item_group_label.item_group_label });
                if (response && response.data.success) {
                    toast.success('Group Created Successfully !!!');
                    await getItemsGroup();
                    setTimeout(() => {
                        setItemGroupLabel({ item_group_label: '', class: '', feedback: '' });
                    }, 1000);
                    return;
                }
            }
        } catch (error) {
            console.error(error.message);
            return;
        }
    }

    // add new items to inventory
    const addItems = async (e) => {
        try {
            e.preventDefault();
            if (await validateItemGroupId()
                & await validateItemName()
                & await validateUnit()
                & await validateWeight()
                & await validateManufacturer()
                & await validateBrand()
                & await validateSellingPrice()
                & await validateCostPrice()
                & await validateOpeningStock()
                & await validateReorderPoint()
                & await validatePreferredVendor()
                & await validateLength()
                & await validateWidth()
                & await validateHeight()) {
                const formData = new FormData();
                formData.append('item_group_id', item_group_id.item_group_id);
                formData.append('item_name', item_name.item_name);
                formData.append('unit', unit.unit);
                formData.append('length', length.length);
                formData.append('width', width.width);
                formData.append('height', height.height);
                formData.append('weight', weight.weight);
                formData.append('manufacturer', manufacturer.manufacturer);
                formData.append('brand', brand.brand);
                formData.append('selling_price', selling_price.selling_price);
                formData.append('cost_price', cost_price.cost_price);
                formData.append('description', description);
                formData.append('opening_stock', opening_stock.opening_stock);
                formData.append('reorder_point', reorder_point.reorder_point);
                formData.append('preferred_vendor', preferred_vendor.preferred_vendor);
                formData.append('photo', image_of_item);
                formData.append('added_date', new Date());
                const response = await axios.post('http://localhost:5000/items', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response && response.data.success) {
                    toast.success('Items Created Successfully !!!');
                    setTimeout(async () => {
                        setItemGroupLabel({ item_group_label: '', class: '', feedback: '' });
                        setItemGroupId({ item_group_id: '', class: '', feedback: '' });
                        setItemName({ item_name: '', class: '', feedback: '' });
                        setUnit({ unit: '', class: '', feedback: '' });
                        setLength({ length: '', class: '', feedback: '' });
                        setWidth({ width: '', class: '', feedback: '' });
                        setHeight({ height: '', class: '', feedback: '' });
                        setWeight({ weight: '', class: '', feedback: '' });
                        setManufacturer({ manufacturer: '', class: '', feedback: '' });
                        setBrand({ brand: '', class: '', feedback: '' });
                        setSellingPrice({ selling_price: '', class: '', feedback: '' });
                        setCostPrice({ cost_price: '', class: '', feedback: '' });
                        setDescription('');
                        setOpeningStock({ opening_stock: '', class: '', feedback: '' });
                        setReorderPoint({ reorder_point: '', class: '', feedback: '' });
                        setPreferredVendor({ preferred_vendor: '', class: '', feedback: '' });
                        setImageOfItem([]);
                        await handleClearFileInput()
                    }, 1000);
                    setTimeout(() => {
                        navigate('/view/items');
                    }, 2500);
                }
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

    // Validate items group
    const validateItemGroup = async () => {
        if (item_group_label.item_group_label === "") {
            setItemGroupLabel({ ...item_group_label, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (alpabeticRegex.test(item_group_label.item_group_label)) {
            setItemGroupLabel({ ...item_group_label, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!alpabeticRegex.test(item_group_label.item_group_label)) {
            setItemGroupLabel({ ...item_group_label, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setItemGroupLabel({ ...item_group_label, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate item name
    const validateItemName = async () => {
        if (item_name.item_name === "") {
            setItemName({ ...item_name, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (alpabeticRegex.test(item_name.item_name)) {
            setItemName({ ...item_name, feedback: 'All Good', class: 'is-valid' });
            return true
        } else if (!alpabeticRegex.test(item_name.item_name)) {
            setItemName({ ...item_name, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setItemName({ ...item_name, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate group id
    const validateItemGroupId = async () => {
        if (item_group_id.item_group_id === "") {
            setItemGroupId({ ...item_group_id, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else {
            setItemGroupId({ ...item_group_id, feedback: 'All Good', class: 'is-valid' });
            return true;
        }
    };

    // validate unit
    const validateUnit = async () => {
        if (unit.unit === "") {
            setUnit({ ...unit, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (alpabeticRegex.test(unit.unit)) {
            setUnit({ ...unit, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!alpabeticRegex.test(unit.unit)) {
            setUnit({ ...unit, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setUnit({ ...unit, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate weight
    const validateWeight = async () => {
        if (weight.weight === "") {
            setWeight({ ...weight, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(weight.weight)) {
            setWeight({ ...weight, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!numberRegex.test(weight.weight)) {
            setWeight({ ...weight, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setWeight({ ...weight, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate manufacturer
    const validateManufacturer = async () => {
        if (manufacturer.manufacturer === "") {
            setManufacturer({ ...manufacturer, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (alpabeticRegex.test(manufacturer.manufacturer)) {
            setManufacturer({ ...manufacturer, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!alpabeticRegex.test(manufacturer.manufacturer)) {
            setManufacturer({ ...manufacturer, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setManufacturer({ ...manufacturer, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate brand
    const validateBrand = async () => {
        if (brand.brand === "") {
            setBrand({ ...brand, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (alpabeticRegex.test(brand.brand)) {
            setBrand({ ...brand, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!alpabeticRegex.test(brand.brand)) {
            setBrand({ ...brand, feedback: 'Text Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setBrand({ ...brand, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate selling price
    const validateSellingPrice = async () => {
        if (selling_price.selling_price === "") {
            setSellingPrice({ ...selling_price, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(selling_price.selling_price)) {
            setSellingPrice({ ...selling_price, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!numberRegex.test(selling_price.selling_price)) {
            setSellingPrice({ ...selling_price, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setSellingPrice({ ...selling_price, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    }

    // validate cost price
    const validateCostPrice = async () => {
        if (cost_price.cost_price === "") {
            setCostPrice({ ...cost_price, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(cost_price.cost_price)) {
            setCostPrice({ ...cost_price, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!numberRegex.test(cost_price.cost_price)) {
            setCostPrice({ ...cost_price, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setCostPrice({ ...cost_price, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    }

    // validate Opening Stock
    const validateOpeningStock = async () => {
        if (opening_stock.opening_stock === "") {
            setOpeningStock({ ...opening_stock, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(opening_stock.opening_stock)) {
            setOpeningStock({ ...opening_stock, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!numberRegex.test(opening_stock.opening_stock)) {
            setOpeningStock({ ...opening_stock, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setOpeningStock({ ...opening_stock, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate reorder point
    const validateReorderPoint = async () => {
        if (reorder_point.reorder_point === "") {
            setReorderPoint({ ...reorder_point, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (numberRegex.test(reorder_point.reorder_point)) {
            setReorderPoint({ ...reorder_point, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else if (!numberRegex.test(reorder_point.reorder_point)) {
            setReorderPoint({ ...reorder_point, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        } else {
            setReorderPoint({ ...reorder_point, feedback: 'Invalid', class: 'is-invalid' });
            return false;
        }
    };

    // validate preferred vendor
    const validatePreferredVendor = async () => {
        if (preferred_vendor.preferred_vendor === "") {
            setPreferredVendor({ ...preferred_vendor, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else {
            setPreferredVendor({ ...preferred_vendor, feedback: 'All Good', class: 'is-valid' });
            return true;
        }
    };

    // validate length
    const validateLength = async () => {
        if (length.length === "") {
            setLength({ ...length, feedback: '', class: '' });
            return true;
        } else if (numberRegex.test(length.length)) {
            setLength({ ...length, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setLength({ ...length, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // validate width
    const validateWidth = async () => {
        if (width.width === "") {
            setWidth({ ...width, feedback: '', class: '' });
            return true;
        } else if (numberRegex.test(width.width)) {
            setWidth({ ...width, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setWidth({ ...width, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // validate width
    const validateHeight = async () => {
        if (height.height === "") {
            setHeight({ ...height, feedback: '', class: '' });
            return true;
        } else if (numberRegex.test(height.height)) {
            setHeight({ ...height, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            setHeight({ ...height, feedback: 'Number Only Accepted', class: 'is-invalid' });
            return false;
        }
    };

    // handle clear file input
    const handleClearFileInput = async () => {
        if (fileInput.current) {
            fileInput.current.value = ''; // Clear the value of the file input
        }
    };

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
                    length={length}
                    width={width}
                    height={height}
                    setLength={setLength}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    setBrand={setBrand}
                    setCostPrice={setCostPrice}
                    setSellingPrice={setSellingPrice}
                    setManufacturer={setManufacturer}
                    setItemName={setItemName}
                    setUnit={setUnit}
                    setWeight={setWeight}
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
                    vendorsData={vendorsData}
                    fileInput={fileInput}
                />
                {/* Add items component */}
            </div>
        </>
    )
}

export default ItemsGroup