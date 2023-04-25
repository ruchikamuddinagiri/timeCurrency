import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../index.css";
import api from "../api/authApi";
import { ApiResponse } from "../api/types";
import { TaskDataType, registerTasksSchema } from "../pages/Tasks";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { object as zObject, string as zString, TypeOf, z, ZodDate } from "zod";

interface TaskCardProps {
  task: TaskDataType;
  onClickPunchOut: () => void;
  onDeleteClick: () => void;
  setUpdateTaskList: any;
}

export const editTaskSchema = zObject({
  taskName: zString().min(1, "Task Name is required"),
  description: zString()
    .min(1, "Description is required")
    .min(10, "Description must be more than 10 characters")
    .max(100, "Password must be less than 100 characters"),
  status: zString(),
  startTime: zString(),
  endTime: zString(),
});

type EditTaskSchema = TypeOf<typeof editTaskSchema>;

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
  const [showEdit, setShowEdit] = useState<boolean>();
  const [task, setTask] = useState<TaskDataType>(props.task);

  const methods = useForm<EditTaskSchema>({
    resolver: zodResolver(registerTasksSchema),
    defaultValues: {
      taskName: task.taskName,
      status: task.status,
      description: task.description,
      startTime: new Date(task.startTime).toLocaleString(),
      endTime: task.endTime ? new Date(task.endTime).toLocaleString() : "",
    },
  });

  useEffect(() => {
    const sub = methods.watch((data) => {
      console.log(data);
      setTask({
        ...task,
        taskName: data.taskName ?? task.taskName,
        description: data.description ?? task.description,
        status: data.status ?? task.status,
        startTime: data.startTime ? new Date(data.startTime) : task.startTime,
        endTime: data.endTime ? new Date(data.endTime) : task.startTime,
      });
    });

    return () => {
      sub.unsubscribe();
    };
  }, [methods.watch]);

  const onClickSave = () => {
    setShowEdit(false);
    methods.reset({
      taskName: task.taskName,
      status: task.status,
      description: task.description,
      startTime: new Date(task.startTime).toLocaleString(),
      endTime: task.endTime ? new Date(task.endTime).toLocaleString() : "",
    });

    api
      .patch<ApiResponse>(`/tasks/${task.taskId}`, {
        name: task.taskName,
        description: task.description,
        status: task.status,
        endTime: task.endTime,
        startTime: task.startTime,
      })
      .then((response) => {
        console.log("updated with id,", response);
        props.setUpdateTaskList(true);
      })
      .catch((error) => {
        console.log("Error with update,", error);
      });
  };

  const onClickEdit = () => {
    setShowEdit(true);
  };

  return (
    <Card className="task-card">
      <Card.Body>
        {showEdit ? (
          <>
            <FormProvider {...methods}>
              <form className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2xl p-8 space-y-5">
                <FormInput
                  labelText="Task Name"
                  inputName="taskName"
                  inputType="text"
                  methods={methods}
                />
                <FormInput
                  labelText="Description"
                  inputName="description"
                  inputType="text"
                  methods={methods}
                />
                <div className="my-3">
                  <label
                    htmlFor="Status"
                    className="block text-gray-600 mb-1 font-medium"
                  >
                    Status{" "}
                  </label>

                  <select
                    {...methods.register("status")}
                    className="block w-full py-2 px-4 rounded-md bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
                <FormInput
                  labelText="StartTime"
                  inputName="startTime"
                  inputType="text"
                  inputPlaceholder={new Date(task.startTime).toLocaleString()}
                  methods={methods}
                />

                <FormInput
                  labelText="End Time"
                  inputName="endTime"
                  inputType="text"
                  inputPlaceholder={
                    task.endTime ? new Date(task.endTime).toLocaleString() : ""
                  }
                  methods={methods}
                />
              </form>
            </FormProvider>
          </>
        ) : (
          <>
            <Card.Title>Task Name: {props.task.taskName}</Card.Title>
            <Card.Text>Description: {props.task.description}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Status: {props.task.status}
            </Card.Subtitle>
            <Card.Text>
              Start time: {new Date(props.task.startTime).toLocaleString()}
            </Card.Text>
            {props.task.endTime ? (
              <Card.Text>
                End time: {new Date(props.task.endTime).toLocaleString()}
              </Card.Text>
            ) : null}
          </>
        )}
        <div className="button-container d-flex justify-content-between">
          {showEdit ? (
            <Button variant="danger" onClick={onClickSave}>
              Save
            </Button>
          ) : (
            <>
              <Button variant="danger" onClick={onClickEdit}>
                Edit
              </Button>
              <Button variant="danger" onClick={props.onDeleteClick}>
                Delete
              </Button>
              {props.task.status != 'Completed' ? (
              <Button variant="primary" onClick={props.onClickPunchOut}>
                Punch Out
              </Button>
              ): " "}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
