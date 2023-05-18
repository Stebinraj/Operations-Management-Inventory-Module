import moment from 'moment';
import React from 'react'

const AdjustmentReportTable = ({ reportData }) => {

    // inventory adjustments table headings
    const table = [
        { headings: 'Item Group' },
        { headings: 'Item Name' },
        { headings: 'Brand' },
        { headings: 'Manufacturer' },
        { headings: 'Mode of Adjustment' },
        { headings: 'Quantity' },
        { headings: 'Value' },
        { headings: 'Reference Number' },
        { headings: 'Date' },
        { headings: 'Reason' },
        { headings: 'Description' },
        { headings: 'Image' },
    ];

    return (
        <>
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
                        {reportData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{value.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.item_id.brand}</td>
                                    <td className='text-nowrap'>{value.item_id.manufacturer}</td>
                                    <td className='text-nowrap'>{value.mode_of_adjustment}</td>
                                    <td className='text-nowrap'>{value.quantity === "" ? ("-") : (value.quantity)}</td>
                                    <td className='text-nowrap'>{value.value === "" ? ("-") : (value.value)}</td>
                                    <td className='text-nowrap'>{`IA - ${value.reference_number}`}</td>
                                    <td className='text-nowrap'>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{value.reason}</td>
                                    <td className='text-nowrap'>{value.description}</td>
                                    <td className='text-nowrap'>{value.item_id.image_of_item}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdjustmentReportTable