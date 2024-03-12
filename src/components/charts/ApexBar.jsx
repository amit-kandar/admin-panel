import React from 'react';
import Chart from 'react-apexcharts';

function ApexBar() {
    const series = [{
        data: [400, 500, 600, 900, 500, 700, 400]
    }];
    const options = {
        chart: {
            type: 'bar',
            zoom: {
                enabled: false
            },
            stacked: true,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        markers: {
            size: 0
        },
        grid: {
            borderColor: "rgba(0, 0, 0, 0)",
            padding: {
                right: 0,
                left: 0,
                top: 0,
                bottom: 20
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '25%',
                distributed: true,
            }
        },
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    }

    const dayToChange = 'Thu';
    const indexOfBarToChange = options.labels.indexOf(dayToChange);

    const dynamicColors = Array(options.labels.length).fill('#4ade80');  // Initialize with default color
    dynamicColors[indexOfBarToChange] = '#22c55e';

    console.log(dynamicColors);

    options.colors = dynamicColors;
    return (
        <div className='w-full'>
            <Chart
                width="100%"
                height="auto"
                type='bar'
                options={options}
                series={series}
            />
        </div>
    )
}

export default ApexBar