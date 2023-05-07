import React from 'react';

const ViewItemsGroup = ({ itemGroupData }) => {

    return (
        <>
            {/* view item groups */}
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5 className="m-0">Avaliable Item Groups</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {itemGroupData.map((value, index) => {
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
            {/* view item groups */}
        </>
    )
}

export default ViewItemsGroup