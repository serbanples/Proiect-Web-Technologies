import React, { useEffect, useState } from 'react';
import Icon from 'react-icons-kit';
import { x } from 'react-icons-kit/feather/x';
import './Popup.scss';
import { Task, User } from '../types';
import { prioritySettings } from '../../config/tasks';
import { findTaskByIdRequest, updateTaskRequest } from '../../services/taskService';
import { findUsersRequest } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import Dropdown from '../dropdown/Dropdown';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  // title: string;
  // ticketNumber: string;
  // description: string;
  // project: string;
  // projectClass: string;
  // priorityLevel: PriorityLevel; 
  // assigneeList: string[];
  // currentAssignee: string;
  id: string;
  // onAssigneeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  canUpdate?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  canUpdate,
  // title,
  // ticketNumber,
  // description,
  // project,
  // priorityLevel,
  // assigneeList,
  // currentAssignee,
  id,
  // onAssigneeChange,
}) => {
  if (!isOpen) return null;
  // const projectClass = project.toLowerCase().replace(/\s+/g, '-');
  const [task, setTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [updateBody, setUpdateBody] = useState({})

  const { auth } = useAuth();

  useEffect(() => {
    findTaskByIdRequest(id).then((task) => {
      console.log('task', task);
      setTask(task);
    })
    .catch((error) => {
      console.error('Error fetching task:', error);
    });

    findUsersRequest()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [])

  // const onAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log('assignee', event.target.value);
  //   setUpdateBody({ assignedTo: event.target.value });
  // } 

  const confirmUpdate = () => {
    updateTaskRequest(id, updateBody)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          <Icon icon={x} />
        </button>
        <div className="popup-header">{task?.name}</div>
        <div className="popup-content">
          <div className="info-row">
            <span className="label">Ticket:</span>
            <span>{task?.displayId}</span>
          </div>
          <div className="info-row">
            <span className="label">Description:</span>
            <span>{task?.description}</span>
          </div>
          <div className="info-row">
            <span className="label">Project:</span>
            <span className={`project-tag`}>{task?.project.name}</span>
          </div>
          <div className="info-row">
            <span className="label">Priority:</span>
            <span className="priority">
              <Icon
                icon={prioritySettings[task?.priority || 'low'].icon}
                style={{ color: prioritySettings[task?.priority || 'low'].color }}
              />
              {task ? task?.priority.charAt(0).toUpperCase() + task?.priority.slice(1) : 'Low'}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Assignee:</span>
            { canUpdate ? (
              // <>
              // <select
              //   value={task?.assignedTo.name}
              //   onChange={onAssigneeChange}
              //   onClick={(e) => e.stopPropagation()}
              // >
              // <option value="Unassigned">Unassigned</option>
              //   {users.map((user) => (
              //     <option key={user.id} value={user.id} disabled={user.id === auth.user?.id}>
              //       {user.name}
              //     </option>
              //   ))}
              // </select>
              // </>
              <Dropdown
                defaultOption={{ label: task?.assignedTo.name || 'Unassigned', value: task?.assignedTo.id || 'Unassigned' }}
                options={users.map((user) => ({ label: user.name, value: user.id, disabled: user.id === auth.user?.id }))}
                onChange={(option) => setUpdateBody({ assignedTo: option.value })}
              />
            ) : (
              <span>{task?.assignedTo.name}</span>
            )}
          </div>
          <div className="btn-container">
            <button 
              className="confirm-btn"
              onClick={confirmUpdate}
            > 
              Confirm 
            </button>
            <button 
              className="cancel-btn"
              onClick={onClose}
            > 
              Cancel 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;