import { Doughnut, Line, Pie } from "react-chartjs-2";

interface PieChartProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const PieChart = ({ chartData }: PieChartProps) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Most Time Spent In Categories",
            },
            legend: {
                display: true,
                
            },
            tooltip: {
              enabled: true,
            },
          },
          
        }}
      />
    </div>
  );
};

export default PieChart;
