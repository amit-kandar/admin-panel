import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { source_data } from '../../data/SourceData';

function PieChart() {
    return (
        <Doughnut
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

export default PieChart