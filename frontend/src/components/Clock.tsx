import React, {useEffect, useState} from 'react'
import api from "../api/authApi";
import { ApiResponse } from "../api/types";
import { TaskDataType } from "../pages/Tasks";

function Clock() {

    const [clockState, setClockState] = useState<any>(null)

    useEffect(()=>{
        
        api.get<ApiResponse>("/tasks").then((response) => {
            const tasksResponse: TaskDataType[] = [];
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

              let totalTime = 0

              tasksResponse.forEach((task) => {
                const endTime = new Date(task.endTime ?? new Date());
                const startTime = new Date(task.startTime);
                const taskTime = Math.abs(
                    (endTime.getTime() - startTime.getTime()) / (1000 * 60)
                  );
                  totalTime += taskTime
                console.log(taskTime)
              })
              let timeLeft = 24 - totalTime/3600
              //console.log(24 - totalTime/3600)
              setClockState(Math.floor(timeLeft)+"/24")
              
        })
        

    }, [])
  return (  
    <div className="clock">{clockState}</div>
  )
}

export default Clock