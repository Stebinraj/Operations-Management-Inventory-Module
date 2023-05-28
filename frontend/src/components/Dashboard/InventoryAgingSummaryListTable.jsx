import moment from 'moment';
import numeral from 'numeral';
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
                            <th scope="col" className='text-nowrap'>91 to 120 Days</th>
                            <th scope="col" className='text-nowrap'>121 to 150 Days</th>
                            <th scope="col" className='text-nowrap'>Above 150 Days</th>
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
                                    <td>{differenceInDays >= 0 && differenceInDays < 31 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
                                    <td>{differenceInDays > 30 && differenceInDays < 61 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
                                    <td>{differenceInDays > 60 && differenceInDays < 91 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
                                    <td>{differenceInDays > 90 && differenceInDays < 121 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
                                    <td>{differenceInDays > 120 && differenceInDays < 151 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
                                    <td>{differenceInDays > 150 ? (numeral(value.opening_stock).format('0,0')) : ('-')}</td>
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