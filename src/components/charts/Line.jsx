import React from 'react';
import { Line } from 'react-chartjs-2';
import { source_data } from '../../data/SourceData';

function LineChart() {
    return (
        <Line
            data={{
                labels: source_data.map(item => item.label),
                datasets: [
                    {
                        label: "Revenue",
                        data: source_data.map(item => item.value)
                    }
                ]
            }}
        />
    )
}

export default LineChart