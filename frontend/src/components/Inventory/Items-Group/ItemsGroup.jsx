import React, { useState } from 'react'
import axios from 'axios';
import ViewItemsGroup from './ViewItemsGroup';
import AddItems from './AddItems';
import { toast } from 'react-toastify';

const ItemsGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [reload, setReload] = useState(false);

    const addGroup = async (e) => {
        e.preventDefault();
        setReload(false);
        const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
        if (response && response.data.success) {
            toast.success('Group Created Successfully !!!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                newestOnTop: false,
                theme: "light",
            });
            setReload(true);
            setItemGroupLabel('');
        }
    }

    return (
        <>
            <div className="col-md-6">
                {/* create new item group */}
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h5 className="m-0">Create Item Group</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <span className="card-text">Name of Item Group</span>
                                <input type="text" className="form-control" onChange={(e) => { setItemGroupLabel(e.target.value) }} value={item_group_label} placeholder='Enter Group Name' />
                            </div>
                            <button className="btn btn-primary w-100" onClick={(e) => { addGroup(e) }}>Submit</button>
                        </form>
                    </div>
                </div>
                {/* create new item group */}

                {/* View item group component */}
                <ViewItemsGroup reload={reload} />
                {/* View item group component */}
            </div>

            <div className="col-md-6">
                {/* Add items component */}
                <AddItems reload={reload} />
                {/* Add items component */}
            </div>
        </>
    )
}

export default ItemsGroup