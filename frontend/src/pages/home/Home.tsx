import React from 'react';
import './Home.scss';
import TaskBox from '../../components/projects/TaskBox';
import { assigneeList, tasks } from '../../config/tasks';

const Home: React.FC = () => {
  const taskGroups = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);
  
  const statuses = ['To Do', 'In Progress', 'Dev QA', 'Done'];

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <div key={status} className="task-column">
          <div className="column-title">{status}</div>
          {taskGroups[status]?.map((task) => (
            <TaskBox
              key={task.ticketNumber}
              title={task.taskTitle}
              project={task.projectTitle}
              priorityLevel={task.priorityLevel}
              assignee={task.assignee}
              ticketNumber={task.ticketNumber}
              assigneeList={assigneeList}
              description={task.description}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
