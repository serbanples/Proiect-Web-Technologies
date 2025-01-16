import React, { useEffect, useState } from 'react';
import Icon from 'react-icons-kit';
import { x } from 'react-icons-kit/feather/x';
import './Popup.scss';
import { Task, User } from '../types';
import { prioritySettings } from '../../config/tasks';
import { findTaskByIdRequest, getTaskStatusesRequest, updateTaskRequest } from '../../services/taskService';
import { findUsersRequest } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import Dropdown from '../dropdown/Dropdown';
import { TaskStatusEnum } from '../../services/serviceTypes';

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
  const [statuses, setStatuses] = useState<{ value: TaskStatusEnum, label: string }[]>([]);

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

    getTaskStatusesRequest().then((statuses) => {
      setStatuses(statuses);
    })
    .catch((error) => {
      console.error('Error fetching statuses:', error);
    });
  }, [])

  const handleUpdate = (key: string, value: string) => {
    setUpdateBody({ ...updateBody, [key]: value });

    if (task) {
      setTask({ ...task, [key]: value });
    }
  }

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
            <span className={`project-tag`}>{task?.project?.name}</span>
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
          <div className='info-row'>
            <span className="label">Status:</span>
            { canUpdate && task ? (
              <Dropdown
                defaultOption={statuses.find((status) => status.value === task.status) || { label: 'Unknown', value: 'Unknown' }}
                options={statuses.map((status) => ({ label: status.label, value: status.value, disabled: status.value === task?.status }))}
                onChange={(option) => handleUpdate('status', option.value)}
              />
            ) : (
              <span>{statuses.find((status) => status.value === task?.status)?.label || 'Unknown'}</span>
            )}
          </div>
          <div className="info-row">
            <span className="label">Percentage Completed:</span>
            { canUpdate && task && task.status === 'inProgress' ? (
              <Dropdown
                defaultOption={{ label: `${task.percentageCompleted}%` || 'Unknown', value: task.percentageCompleted.toString() || 'Unknown' }}
                options={Array.from({ length: 11 }, (_, i) => ({ label: `${i * 10}%`, value: (i * 10).toString() }))}
                onChange={(option) => handleUpdate('percentageCompleted', option.value)}
              />
            ) : (
              <span>{task?.percentageCompleted + '%'}</span>
            )}
          </div>
          <div className="info-row">
            <span className="label">Assignee:</span>
            { canUpdate && task ? (
              <Dropdown
                defaultOption={{ label: task?.assignedTo?.name || 'Unassigned', value: task?.assignedTo?.id || 'Unassigned' }}
                options={users.map((user) => ({ label: user.name, value: user.id, disabled: user.id === auth.user?.id }))}
                onChange={(option) => handleUpdate('assignedTo', option.value)}
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