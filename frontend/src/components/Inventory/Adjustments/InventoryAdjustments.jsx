import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import FilterButton from './FilterButton';
import AdjustmentFilterRange from './AdjustmentFilterRange';
import AdjustmentReport from './AdjustmentReport';
import AdjustmentReportTable from './AdjustmentReportTable';

const InventoryAdjustments = () => {

    // State variables to manage inventory adjustment report data and date range reports
    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // fetch inventory adjustment reports and set to reportData
    const getReports = async () => {
        try {
            const response = await axios.get('/adjust-reports');
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // filtering specific date range inventory adjustment reports
    const handleSpecificDate = async (e) => {
        e.preventDefault();
        if (startDate > new Date()) {
            toast.error('Invalid Date !!!');
            return;
        } else if (endDate > new Date()) {
            toast.error('Invalid Date !!!');
            return;
        }
        await getDateRangeReports();
        if (reportData.length === 0) {
            toast.error('Nothing to Filter !!!');
            return;
        }
        toast.success('Filtered Successfully !!!');
    };

    // reset filtered adjustments reports
    const reset = async (e) => {
        e.preventDefault();
        setStartDate(new Date());
        setEndDate(new Date());
        await getReports();
        toast.success('Resetted Successfully !!!');
    }

    // fetching specific date range inventory adjustment reports and st to reportData
    const getDateRangeReports = async () => {
        try {
            const start = startDate.toISOString();
            const end = endDate.toISOString();
            const response = await axios.post('/date-range-reports', { start, end });
            if (response && response.data.success) {
                setReportData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);;
        }
    }

    // handle side-efffects while fetching inventory adjustment reports
    useEffect(() => {
        getReports();
    }, [])

    return (
        <>
            {/* filter button component */}
            <FilterButton />

            {/* Adjustment filter range component */}
            <AdjustmentFilterRange
                startDate={startDate}
                endDate={endDate}
                handleSpecificDate={handleSpecificDate}
                reset={reset}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            {/* adjustment report component */}
            <AdjustmentReport

                AdjustmentReportTable={
                    <AdjustmentReportTable
                        reportData={reportData}
                    />
                }

            />
        </>
    )
}

export default InventoryAdjustments