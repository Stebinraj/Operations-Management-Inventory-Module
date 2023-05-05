import React from 'react'
import DatePicker from 'react-datepicker';

const AdjustmentFilterRange = ({ startDate, endDate, reset, handleSpecificDate, setStartDate, setEndDate }) => {
    return (
        <>
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
        </>
    )
}

export default AdjustmentFilterRange