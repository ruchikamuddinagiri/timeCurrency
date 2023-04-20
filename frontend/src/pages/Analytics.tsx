import { useState } from "react";
import "../index.css";
import { ArcElement, CategoryScale, Chart, LineElement, LinearScale, PointElement } from "chart.js";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const ChartContainer = styled.div`
  width: 48%;
`;

const data = [
  { name: "Fitness", value: 20 },
  { name: "Study", value: 15 },
  { name: "Work", value: 30 },
  { name: "Entertainment", value: 25 },
  { name: "Sleep", value: 40 },
  { name: "Travel", value: 5 },
  { name: "Leisure", value: 10 },
  { name: "Others", value: 15 },
];

Chart.register(CategoryScale);

export default function App() {
  const [chartData, setChartData] = useState({
    labels: data.map((data) => data.name),

    datasets: [
      {
        label: "name ",
        data: data.map((data) => data.value),
        backgroundColor: [
          "#FF00FF",
          "#3C8DBC",
          "#F39C12",
          "#8E44AD",
          "#27AE60",
          "#A9A9A9",
          "#E74C3C",
          "#00FFFF",
        ],

        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <Sidebar />
      <div className="app-container">
        <Container>
          <ChartContainer>
            <PieChart chartData={chartData} />
          </ChartContainer>
    
          <ChartContainer>
            <LineChart chartData={chartData} />
          </ChartContainer>
          
        </Container>
      </div>
    </>
  );
}
