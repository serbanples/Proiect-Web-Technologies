import React, { useEffect, useState } from 'react';
import './Home.scss';
import TaskBox from '../../../components/projects/TaskBox';
// import { assigneeList } from '../../../config/tasks';
import { browseTasksRequest, getTaskStatusesRequest } from '../../../services/taskService';
import { Task } from '../../../components/types';
import { TaskStatusEnum } from '../../../services/serviceTypes';
import { useAuth } from '../../../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {  
  const [statuses, setStatuses] = useState<{ value: TaskStatusEnum, label: string }[]>([]);
  const [taskGroups, setTaskGroups] = useState<Record<string, Task[]>>({});
  const [searchParams, _] = useSearchParams();

  const { auth } = useAuth();

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
    const projectid = searchParams.get('project');
    browseTasksRequest({ project: projectid })
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
              canUpdate={auth.user?.role === 'master' || auth.user?.role === 'admin' ? true : false }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
