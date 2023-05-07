import React from 'react'

const CreateItemGroup = ({ setItemGroupLabel, addGroup, item_group_label }) => {
    return (
        <>
            {/* create new item group form */}
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
            {/* create new item group form */}
        </>
    )
}

export default CreateItemGroup