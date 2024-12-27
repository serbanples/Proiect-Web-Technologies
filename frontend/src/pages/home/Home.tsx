import React from 'react';
import './Home.scss';
import TaskBox from '../../components/projects/TaskBox';
// import { PriorityLevel } from '../../components/types';
import { assigneeList, tasks } from '../../config/tasks';

const Home: React.FC = () => {
  return (
    <div className="project-list">
    {tasks.map((task) => (
      <TaskBox 
        title={task.taskTitle}
        project={task.projectTitle}
        priorityLevel={task.priorityLevel}
        assignee={task.assignee}
        ticketNumber={task.ticketNumber}
        assigneeList={assigneeList}
      />
    ))}
  </div>
  );
};

export default Home;
