import React from "react";
import { Card, Button } from "react-bootstrap";
import "../index.css";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  category: string;
  startTime: string;
  endTime?: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = (props:TaskCardProps) => {
  return (
    <Card className="task-card">
      <Card.Body>
        <Card.Title>Task Name: {props.title}</Card.Title>
        <Card.Text>Description: {props.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Status: {props.status}</Card.Subtitle>
        <Card.Text>Start time: {props.startTime}</Card.Text>
        { props.endTime ? <Card.Text>End time: {props.endTime}</Card.Text> : null }

          <div className="button-container">
          <Button variant="danger" onClick={props.onDeleteClick}>
            Delete
          </Button>
        </div>
        <div className="button-container">
          <Button variant="primary" onClick={props.onEditClick}>
            Punch Out
          </Button>{" "}
          </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
