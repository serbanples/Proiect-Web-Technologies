import React from 'react';
import './TaskBoard.scss';
import TaskBox from './TaskBox';
import { Task } from '../types';

type TaskBoardProps = {
  tasks: Task[];
  assigneeList: string[];
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, assigneeList }) => {
  const columns = ['To Do', 'In Progress', 'Dev QA', 'Done'];

  return (
    <div className="task-board">
      {columns.map((column) => (
        <div className="task-column" key={column}>
          <h2 className="column-title">{column}</h2>
          {tasks
            .filter((task) => task.status === column)
            .map((task) => (
              <TaskBox
                title={task.title}
                ticketNumber={task.ticketNumber}
                assignee={task.assignee}
                project={task.project}
                priorityLevel={task.priorityLevel}
                assigneeList={assigneeList}
                description={task.description}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
