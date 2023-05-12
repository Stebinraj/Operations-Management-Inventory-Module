import React from 'react'
import AdjustmentReportTable from './AdjustmentReportTable';

const AdjustmentReport = ({ reportData }) => {

    return (
        <>
            {/* inventory adjustments reports */}
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <AdjustmentReportTable
                        reportData={reportData}
                    />
                </div>
            </div>
            {/* inventory adjustments reports */}
        </>
    )
}

export default AdjustmentReport