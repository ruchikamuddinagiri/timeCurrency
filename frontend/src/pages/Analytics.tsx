import { useEffect, useState } from "react";
import "../index.css";
import {
  ArcElement,
  CategoryScale,
  Chart,
  ChartData,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import api from "../api/authApi";
import { ApiResponse } from "../api/types";
import { TaskDataType } from "./Tasks";
import { Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "react-bootstrap";

Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip, Legend);

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

const CalendarContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 16px;
`;
const RoundedButton = styled(Button)`

background-color: black;
color: white;
font-size: 16px;
padding: 12px 24px;
transition: all 0.2s ease-in-out;

&:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
`;

Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(CategoryScale);

interface chartDataType {
  category: string;
  value: number;
}

export default function Analytics() {
  const [date, setDate] = useState<Date>(new Date());

  const [showAll, setShowAll] = useState<Boolean>(true);

  const [displayData, setDisplayData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "name",
        data: [],
        backgroundColor: [],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    api.get<ApiResponse>("/tasks").then((response) => {
      const tasksResponse: TaskDataType[] = [];
      // @ts-ignore
      response.data.tasks.map((task) => {
        tasksResponse.push({
          taskId: task._id,
          taskName: task.name,
          description: task.description,
          category: task.category,
          startTime: task.startTime,
          endTime: task.endTime,
          status: task.status,
        });
      });

      const categories: string[] = [];
      const chartData: chartDataType[] = [];

      tasksResponse.forEach((task) => {
        const index = categories.indexOf(task.category);

        const endTime = new Date(task.endTime ?? new Date());
        const startTime = new Date(task.startTime);

        const taskTime = Math.abs(
          (endTime.getTime() - startTime.getTime()) / (1000 * 60)
        );

        console.log(showAll);

        if (!showAll) {
          console.log("expected day", date.toLocaleDateString());

          console.log("recieved day", startTime.toLocaleDateString());
          if (date.toLocaleDateString() === startTime.toLocaleDateString()) {
            if (index === -1) {
              categories.push(task.category);
              chartData.push({
                category: task.category,
                value: taskTime,
              });
            } else {
              chartData[index].value += taskTime;
            }
          }
        } else {
          console.log("showall is set to true");
          if (index === -1) {
            categories.push(task.category);
            chartData.push({
              category: task.category,
              value: taskTime,
            });
          } else {
            chartData[index].value += taskTime;
          }
        }
      });

      setDisplayData({
        labels: chartData.map((data) => data.category),

        datasets: [
          {
            data: chartData.map((data) => data.value),
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
            borderWidth: 1,
            labels: chartData.map((data) => data.category),
          },
        ],
      });
      // @ts-ignore
      console.log(response.data.tasks);
    });
  }, [date, showAll]);

  function handleSelect(date: Date) {
    setDate(date);
    setShowAll(false);
  }

  function onClickReset() {
    setShowAll(true);
  }

  return (
    <>
      <Sidebar />  
      <RowContainer>
      <ChartContainer>
        <PieChart chartData={displayData} />
      </ChartContainer>

      <ChartContainer>
        <LineChart chartData={displayData} />
      </ChartContainer>

      <CalendarContainer>
        <ButtonContainer>
          <RoundedButton
            variant="danger"
            onClick={onClickReset}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Show All Data
          </RoundedButton>  
        </ButtonContainer>
        <Calendar date={date} onChange={handleSelect} />
      </CalendarContainer>
    </RowContainer>
    </>
  );
}
