import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import FilterButton from './FilterButton';
import AdjustmentFilterRange from './AdjustmentFilterRange';
import AdjustmentReport from './AdjustmentReport';

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
        toast.success('Filtered Successfully !!!');
    };

    const reset = async (e) => {
        e.preventDefault();
        setStartDate(new Date());
        setEndDate(new Date());
        await getReports();
        toast.success('Resetted Successfully !!!');
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
            <FilterButton />

            <AdjustmentFilterRange
                startDate={startDate}
                endDate={endDate}
                handleSpecificDate={handleSpecificDate}
                reset={reset}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            <AdjustmentReport
                reportData={reportData}
            />
        </>
    )
}

export default InventoryAdjustments