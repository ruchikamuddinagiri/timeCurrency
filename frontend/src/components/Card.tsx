import React from "react";
import { Card, Button } from "react-bootstrap";
import "../index.css";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Card className="task-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{status}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="button-container">
          <Button variant="primary" onClick={onEditClick}>
            Edit
          </Button>{" "}
          </div>
          <div className="button-container">
          <Button variant="danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
