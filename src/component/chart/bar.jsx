import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Bars = (props) => {
     const data = {
        labels:props?.data?.map(el => el.namaSparepart),
        datasets: [
          {
            label: 'Jumlah',
            data: props?.data?.map(el => el.jumlah),
            backgroundColor: [ "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"],
          }
        ],
      };
      return <Bar data={data} />
}

export default Bars;