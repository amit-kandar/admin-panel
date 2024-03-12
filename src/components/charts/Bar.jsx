import React from 'react';
import { Bar } from 'react-chartjs-2';
import { source_data } from '../../data/SourceData';

function BarChart() {
    return (
        <Bar
            data={{
                labels: source_data.map(item => item.label),
                datasets: [
                    {
                        label: "Revenue",
                        data: source_data.map(item => item.value),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                        ]
                    }
                ]
            }}
        />
    )
}

export default BarChart