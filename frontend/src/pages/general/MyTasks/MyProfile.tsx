import { useEffect, useState } from "react";
import { findTasksByAssigneeRequest } from "../../../services/taskService";
import { useAuth } from "../../../contexts/AuthContext";
import { Task } from "../../../components/types";
import TaskBox from "../../../components/projects/TaskBox";
import _ from "lodash";
import { logoutRequest } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config/config";
import styles from './MyProfile.module.scss';

const MyProfile = () => {
  const { auth, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const nav = useNavigate();

  const refreshTasks = () => {
    findTasksByAssigneeRequest(auth.user?.id || '', {})
      .then((tasks) => {
        setTasks(tasks);
      }).catch((error) => {
        console.error(error);
      });
  }

  const logoutAction = () => {
    logoutRequest().then(() => {
      return logout()
    })
    .then(() => nav(config.routes.loginRoute))
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  
  return (
    <div className={styles["my-tasks-page"]}>
      <div className={styles["profile-data"]}>
        Profile:
        <div>{auth.user?.email}</div>
        <div>{auth.user?.role}</div>
        <button onClick={() => logoutAction()}>Logout</button>
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

export default MyProfile