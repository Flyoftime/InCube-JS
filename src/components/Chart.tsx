'use Client'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, plugins, scales } from 'chart.js';
import { color } from "chart.js/helpers";

ChartJS.register(
    LineElement, CategoryScale , LinearScale, PointElement, Legend
)

function Chart({datas}:any){
    const data = {
        labels: Array.isArray(datas) ? datas.slice(0, 10).map(data => data.id) :[],
        dataset: [
            {
                label:"Suhu Inkubator",
                data: Array.isArray(datas) ? datas.slice(0, 10).map(data => data.Temperature) :[],
            },

            {
                Label: "Kelembaban Inkubator",
                data: Array.isArray(datas) ? datas.slice(0,10).map(data => data.Humidity) :[],
            }
        ]
    };

    const options = {
        plugins: {
            tittle: {
                display:true,
                text: "Line Diagram"
            },
            legend: {
                position: "top",
                labels : {
                    usePointStyle: false,
                    color: "#fffff"

                },

            },
        },
        scales: {
            y:{
                display:false, 
                min: -30,
                max:100
            },
            x:{
                display : false
            }
        }
    };

    return (
        <Line 
            data={data}
            options={options}
            className="h-full"
        />
    )
}

export default Chart