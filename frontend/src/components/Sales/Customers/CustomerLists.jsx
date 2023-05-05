import React from 'react'

const CustomerLists = ({ customerData, handleUpdateData }) => {

    const table = [
        { headings: 'Name' },
        { headings: 'Email' },
        { headings: 'Phone Number' },
        { headings: 'Billing Address' },
        { headings: 'Actions' },
    ]

    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered">
                            <thead className='text-bg-primary'>
                                <tr>
                                    {table.map((value, index) => {
                                        return (
                                            <th scope="col" key={index} className='text-nowrap'>{value.headings}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-nowrap'>{value.name}</td>
                                            <td className='text-nowrap'>{value.email}</td>
                                            <td className='text-nowrap'>{value.phone_number}</td>
                                            <td className='text-nowrap'>{value.billing_address}</td>
                                            <td className='text-nowrap'>
                                                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#updateCustomers" onClick={(e) => { handleUpdateData(e, value) }}>Update</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerLists