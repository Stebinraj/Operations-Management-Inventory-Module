import React, { useState } from 'react'
import ReadItemsGroup from './ReadItemsGroup'
import axios from 'axios';

const ItemsGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [reload, setReload] = useState(false);

    const addGroup = async (e) => {
        e.preventDefault();
        setReload(false);
        const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
        if (response && response.data.success) {
            alert('Item Group Added Successfull !!!');
            setReload(true);
            setItemGroupLabel('');
        }
    }

    return (
        <>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name of Item Group</label>
                                <input type="text" className="form-control" onChange={(e) => { setItemGroupLabel(e.target.value) }} value={item_group_label} />
                            </div>
                            <button className="btn btn-primary w-100" onClick={(e) => { addGroup(e) }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-lg-6">
                <ReadItemsGroup reload={reload} />
            </div>
        </>
    )
}

export default ItemsGroup