import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ categories }) => {
    const data = {
        labels: categories?.map(item => item.category),
        datasets: [
            {
                data: categories?.map(item => item.revenue),
                backgroundColor: [
                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };


    return (
        <Pie data={data} options={options} />
    )



}

export default PieChart;