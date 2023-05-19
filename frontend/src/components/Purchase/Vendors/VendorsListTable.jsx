import React from 'react'

const VendorsListTable = ({ vendorData, handleUpdateData }) => {

    const table = [
        { headings: 'Name' },
        { headings: 'Email' },
        { headings: 'Phone Number' },
        { headings: 'Address' },
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
                    {vendorData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-nowrap'>{value.name}</td>
                                <td className='text-nowrap'>{value.email}</td>
                                <td className='text-nowrap'>{value.phone_number}</td>
                                <td className='text-nowrap'>{value.address}</td>
                                <td className='text-nowrap'>
                                    <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#addVendors" onClick={(e) => { handleUpdateData(e, value) }}>Update</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default VendorsListTable