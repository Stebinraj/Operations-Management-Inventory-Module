import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReadItemsGroup = (props) => {

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
                    <ul className="list-group">
                        {groupData.map((value, index) => {
                            return (
                                <li key={index} className="list-group-item">{value.item_group_label}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ReadItemsGroup