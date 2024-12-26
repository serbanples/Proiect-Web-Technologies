import React from 'react';
import './Home.scss';
import TaskBox from '../../components/projects/TaskBox';
import { PriorityLevel } from '../../components/types';

const Home: React.FC = () => {
  const tasks = [
    {
      taskTitle: 'Design Homepage',
      projectTitle: 'Website Redesign',
      priorityLevel: PriorityLevel.low,
      assignee: 'Dinescu Denisa',
      ticketNumber: "aaa-123"
    },
    {
      taskTitle: 'Develop API',
      projectTitle: 'Mobile App Development',
      priorityLevel: PriorityLevel.critical,
      assignee: 'Ples Serban',
      ticketNumber: "bbb-456"
    },
    // Add more tasks as needed
  ];
  return (
    <div className="project-list">
    {tasks.map((task) => (
      <TaskBox 
        title={task.taskTitle}
        project={task.projectTitle}
        priorityLevel={task.priorityLevel}
        assignee={task.assignee}
        ticketNumber={task.ticketNumber}
      />
    ))}
  </div>
  );
};

export default Home;
