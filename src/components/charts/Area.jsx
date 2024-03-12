import React from 'react'
import Chart from 'react-apexcharts';

function Area() {
    const options = {
        chart: {
            type: 'area',
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
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        markers: {
            size: 0
        },
        grid: {
            borderColor: "rgba(0, 0, 0, 0)",
            padding: {
                right: 0,
                left: 0,
                top: -40,
                bottom: 30
            }
        }
    }

    const series = [{
        name: 'series1',
        data: [31, 40, 28, 51, 10, 30, 40, 35]
    }]

    return (
        <div className='w-full'>
            <Chart
                width="100%"
                height="150px"
                type='area'
                options={options}
                series={series}
            />
        </div>
    )
}

export default Area