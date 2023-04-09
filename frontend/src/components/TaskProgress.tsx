import Card from "./Card";

const handleEditTask = (taskId: string) => {
  console.log(`Edit task with id ${taskId}`);
};

const handleDeleteTask = (taskId: string) => {
  console.log(`Delete task with id ${taskId}`);
};

const TaskProgress = () => {
  return (
    <>
      <Card
        title={"task title"}
        description={"Description"}
        status={"New"}
        onEditClick={() => handleEditTask("Task title")}
        onDeleteClick={() => handleDeleteTask("Task title")}
      />
    </>
  );
};

export default TaskProgress;
