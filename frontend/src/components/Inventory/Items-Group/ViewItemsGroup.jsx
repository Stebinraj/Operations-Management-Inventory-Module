import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewItemsGroup = (props) => {

    const [groupData, setGroupData] = useState([]);

    useEffect(() => {
        const getGroup = async () => {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setGroupData(response.data.success);
            }
        }
        getGroup();
    }, [props.reload]);

    return (
        <>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5 className="m-0">Avaliable Item Groups</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {groupData.map((value, index) => {
                            return (
                                <div className="col-sm-6 col-md-4 mb-2" key={index}>
                                    <ul className="list-group">
                                        <li className="list-group-item">{value.item_group_label}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewItemsGroup