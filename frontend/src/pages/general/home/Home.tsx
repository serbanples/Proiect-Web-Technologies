import React, { useEffect, useState } from 'react';
import './Home.scss';
import TaskBox from '../../../components/projects/TaskBox';
// import { assigneeList } from '../../../config/tasks';
import { browseTasksRequest, getTaskStatusesRequest } from '../../../services/taskService';
import { Task } from '../../../components/types';
import { TaskStatusEnum } from '../../../services/serviceTypes';

const Home: React.FC = () => {  
  const [statuses, setStatuses] = useState<{ value: TaskStatusEnum, label: string }[]>([]);
  const [taskGroups, setTaskGroups] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    getTaskStatusesRequest()
      .then((response) => {
        setStatuses(response);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  useEffect(() => {
    browseTasksRequest()
      .then((response) => {
        const tasks = response;
        const groupedTasks = tasks.reduce((acc, task) => {
          if (!acc[task.status]) {
            acc[task.status] = [];
          }
          acc[task.status].push(task);
          return acc;
        }, {} as Record<string, typeof tasks>);
        console.log(groupedTasks);
        setTaskGroups(groupedTasks);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <div key={status.value} className="task-column">
          <div className="column-title">{status.label}</div>
          {taskGroups[status.value]?.map((task) => (
            <TaskBox
              task={task}
              // key={task.id}
              // id={task.id}
              // title={task.name}
              // project={task.project.name}
              // priorityLevel={task.priority}
              // assignee={task.assignedTo.name}
              // ticketNumber={task.displayId}
              // assigneeList={assigneeList}
              // description={task.description}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
