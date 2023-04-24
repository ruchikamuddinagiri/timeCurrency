import { Line } from "react-chartjs-2";

interface LineChartProps {
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

const LineChart = ({ chartData }: LineChartProps) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Most Time Spent In Categories",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
