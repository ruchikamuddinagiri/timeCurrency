import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../index.css";
import api from "../api/authApi";
import { ApiResponse } from "../api/types";
import { TaskDataType } from "../pages/Tasks";
import { FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

interface TaskCardProps {
  task: TaskDataType;
  onClickPunchOut: () => void;
  onDeleteClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
  const [showEdit, setShowEdit] = useState<boolean>();
  const [task, setTask] = useState<TaskDataType>(props.task);

  const onClickSave = () => {
    setShowEdit(false);

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
          <></>
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
            <Button variant="danger" onClick={onClickEdit}>
              Edit
            </Button>
          )}
          <Button variant="danger" onClick={props.onDeleteClick}>
            Delete
          </Button>
          <Button variant="primary" onClick={props.onClickPunchOut}>
            Punch Out
          </Button>{" "}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
