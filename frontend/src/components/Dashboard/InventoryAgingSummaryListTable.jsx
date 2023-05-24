import moment from 'moment';
import React from 'react'

const InventoryAgingSummaryListTable = ({ itemsData }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>0 to 30 Days</th>
                            <th scope="col" className='text-nowrap'>31 to 60 Days</th>
                            <th scope="col" className='text-nowrap'>61 to 90 Days</th>
                            <th scope="col" className='text-nowrap'>Above 90 Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.map((value, index) => {
                            const currentDate = moment(); // Current date and time
                            const itemsAddedDate = moment(value.added_date);
                            const differenceInDays = currentDate.diff(itemsAddedDate, 'days');

                            return (
                                <tr key={index}>
                                    <td>{value.item_name}</td>
                                    <td>{differenceInDays >= 0 && differenceInDays < 31 ? (value.opening_stock) : ('-')}</td>
                                    <td>{differenceInDays > 30 && differenceInDays < 61 ? (value.opening_stock) : ('-')}</td>
                                    <td>{differenceInDays > 60 && differenceInDays < 91 ? (value.opening_stock) : ('-')}</td>
                                    <td>{differenceInDays > 90 ? (value.opening_stock) : ('-')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InventoryAgingSummaryListTable