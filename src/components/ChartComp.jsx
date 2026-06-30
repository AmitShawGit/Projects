import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const ChartComp = ({ chartData }) => {

    const data = {
        labels: chartData?.map(item => item.month),
        datasets: [
            {
                label: "Sales",
                data: chartData?.map(item => item.revenue),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1500,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Line data={data} options={options} />;

}

export default ChartComp