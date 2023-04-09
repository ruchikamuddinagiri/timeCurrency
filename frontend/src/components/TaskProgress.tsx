import { TaskDataType } from "../pages/Tasks";
import Card from "./Card";
import { ApiResponse } from "../api/types";
import { api } from "../api/authApi";
import { useEffect } from "react";

const handleEditTask = async (task: TaskDataType, setUpdateTaskList: any) => {
    // console.log('updating task with id : ', task.taskId);

    // const response = await api.patch<ApiResponse>(`/tasks/${task.taskId}`, {
    //     status: "Completed",
    //     endTime: Date.now(),
    // });
    // console.log('updated with id,', response);
    // setUpdateTaskList(true);

    setTimeout(() => {
      const response = api
        .patch<ApiResponse>(`/tasks/${task.taskId}`, {
          status: "Completed",
          endTime: Date.now(),
        })
        .then((response) => {
          console.log("updated with id,", response);
          setUpdateTaskList(true);
        })
        .catch((error) => {
          console.log("Error with update,", error);
        });
    }, 1000);
    
};

const handleDeleteTask = (taskId: string, setUpdateTaskList: any) => {
  api.delete<ApiResponse>(`/tasks/${taskId}`).then((response) => {
    console.log(`Deleted with id ${taskId}`);
    setUpdateTaskList(true);
  });
};

export interface TaskProgressProps {
  tasks: TaskDataType[];
  setTasksList: any;

  updateTasksList: boolean;
  setUpdateTaskList: any;
}

const TaskProgress = (props: TaskProgressProps) => {
  useEffect(() => {
    if (props.updateTasksList) {
      api.get<ApiResponse>("/tasks").then((response) => {
        // console.log(response);

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
        // @ts-ignore
        console.log(response.data.tasks);

        console.log("retrieved data: ", tasksResponse);
        props.setTasksList(tasksResponse);
        props.setUpdateTaskList(false);

        // response.data..map(task => {})
      });
    }
  }, [props.updateTasksList]);

  return (
    <>
      {console.log(`Tasks to card :`, Array.from(props.tasks))}

      {Array.from(props.tasks).map((task) => (
        <Card
          title={task.taskName}
          description={task.description}
          status={task.status}
          category={task.category}
          startTime={new Date(task.startTime).toLocaleString()}
          endTime={task.endTime ? new Date(task.endTime).toLocaleString() : undefined}
          onEditClick={() => handleEditTask(task, props.setUpdateTaskList)}
          onDeleteClick={() =>
            handleDeleteTask(task.taskId, props.setUpdateTaskList)
          }
        />
      ))}
    </>
  );
};

export default TaskProgress;
