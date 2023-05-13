import React from 'react'

const AdjustmentReport = ({ AdjustmentReportTable }) => {

    return (
        <>
            {/* inventory adjustments reports */}
            <div className="col-12">
                <div className="card card-primary card-outline">
                    {/* adjustment report table component */}
                    {AdjustmentReportTable}
                </div>
            </div>
            {/* inventory adjustments reports */}
        </>
    )
}

export default AdjustmentReport