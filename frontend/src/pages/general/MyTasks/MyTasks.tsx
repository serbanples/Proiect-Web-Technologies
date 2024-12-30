import { useEffect, useState } from "react";
import { findTasksByAssigneeRequest } from "../../../services/taskService";
import { useAuth } from "../../../contexts/AuthContext";
import { Task } from "../../../components/types";
import TaskBox from "../../../components/projects/TaskBox";
import './MyTasks.scss';
import SearchBar from "../../../components/searchBar/SearchBar";
import _ from "lodash";

const MyTasks = () => {
  const { auth } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<any>({});

  const refreshTasks = () => {
    findTasksByAssigneeRequest(auth.user?.id || '', filters)
      .then((tasks) => {
        setTasks(tasks);
      }).catch((error) => {
        console.error(error);
      });
  }

  const handleFilterChange = (option: any) => {
    if(option.value === 'any') {
      option.value = undefined;
    }
    setFilters({ ...filters, [option.key]: option.value });
  }

  useEffect(() => {
    refreshTasks();
  }, [filters]);

  
  return (
    <div className="my-tasks-page">
      <div className="my-tasks-search-container">
        <SearchBar id="my-tasks" onFilterChange={handleFilterChange} />
      </div>
      <div className="my-tasks-container">
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskBox task={task} canUpdate={true} onUpdate={refreshTasks} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTasks