import React from 'react'

const CustomerListTable = ({ customerData, handleUpdateData }) => {

    const table = [
        { headings: 'Name' },
        { headings: 'Email' },
        { headings: 'Phone Number' },
        { headings: 'Billing Address' },
        { headings: 'Actions' },
    ]

    return (
        <>
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
                                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#customers" onClick={(e) => { handleUpdateData(e, value) }}>Update</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default CustomerListTable