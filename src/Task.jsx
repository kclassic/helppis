import React from "react";
import { useParams } from "react-router-dom";

const Task = ({ tasks }) => {
  let { taskId } = useParams();
  const task = tasks.find(t => String(t.id) === taskId);
  if (!task) return null;
  return (
    <div
      style={{
        backgroundColor: "palevioletred",
        borderRadius: "5px"
      }}
    >
      <h1>
        Get {task.type.type} for {task.owner}
      </h1>
      <h3>Requested task ID: {task.id}</h3>
    </div>
  );
};

export default Task;
