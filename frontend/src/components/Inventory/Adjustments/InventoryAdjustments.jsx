import axios from 'axios';
import moment from 'moment/moment';
import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const InventoryAdjustments = () => {

    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const getReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/adjust-reports');
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSpecificDate = async (e) => {
        e.preventDefault();
        await getDateRangeReports();
    };

    const reset = async (e) => {
        e.preventDefault();
        setStartDate(new Date());
        setEndDate(new Date());
        await getReports();
    }

    const getDateRangeReports = async () => {
        try {
            const start = startDate.toISOString();
            const end = endDate.toISOString();
            const response = await axios.post('http://localhost:5000/date-range-reports', { start, end });
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);;
        }
    }

    useEffect(() => {
        getReports();
    }, [])

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                <Link className="nav-link text-dark d-flex p-0" data-bs-toggle="collapse" data-bs-target="#filterInventoryReports">
                    <i className="nav-icon bi bi-filter-circle me-1" style={{ fontSize: '21px', color: 'blue' }}></i>
                    <p className='sidebar-links m-auto h6' style={{ color: 'grey' }}>
                        Filter
                    </p>
                </Link>
            </div>

            <div className="col-12 collapse" id='filterInventoryReports'>
                <div className="card card-primary card-outline">
                    <div className="card-body">
                        <div className="d-md-flex">
                            <form className='row w-100'>
                                <div className="mb-3 form-group col-md-4">
                                    <span className="card-text">Start Date</span>
                                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => { setStartDate(date) }} shouldCloseOnSelect={true} />
                                </div>
                                <div className="mb-3 form-group col-md-4">
                                    <span className="card-text">End Date</span>
                                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => { setEndDate(date) }} shouldCloseOnSelect={true} />
                                </div>
                                <div className="form-group col-md-2 mt-auto">
                                    <button className='btn btn-primary w-100' onClick={handleSpecificDate}>Filter</button>
                                </div>
                            </form>
                            <div className="form-group col-md-2 mt-auto row d-md-flex">
                                <button className='btn btn-primary w-100' onClick={reset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered">
                            <thead className='text-bg-primary'>
                                <tr>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Mode of Adjustment</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Reference Number</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.item_name}</td>
                                            <td>{value.mode_of_adjustment}</td>
                                            <td>{value.quantity === "" ? ("-") : (value.quantity)}</td>
                                            <td>{value.value === "" ? ("-") : (value.value)}</td>
                                            <td>{value.reference_number}</td>
                                            <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                            <td>{value.reason}</td>
                                            <td>{value.description}</td>
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

export default InventoryAdjustments