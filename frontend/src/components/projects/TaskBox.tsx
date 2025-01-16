import React, { useState } from 'react';
import './TaskBox.scss';
import { Task } from '../types';
import { prioritySettings } from '../../config/tasks';
import Icon from 'react-icons-kit';
import Popup from './Popup';
import _ from 'lodash';

type TaskBoxProps = {
  task: Task;
  // users?: User[];
  canUpdate?: boolean;
  onUpdate?: () => void;
}

const TaskBox: React.FC<TaskBoxProps> = ({ task, canUpdate, onUpdate }) => {
  const currentAssignee = task?.assignedTo?.name || 'Unassigned';
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    
    if(_.isFunction(onUpdate)) {
      onUpdate();
    }
  }

  return (
    <>
    <div className="task-box" onClick={() => setIsPopupOpen(true)}>
      <div className="task-content">

        <div className="task-title">{task.name}</div>
        <div className={`project-tag`} style={{ color: task?.project?.prefferedColor }}>{task?.project?.name}</div>

        <div className="bottom-info">
            <div className="assignee">
            {/* <label htmlFor="assignee-select">Assigned to: </label>
            <select
              id="assignee-select"
              value={currentAssignee}
              onChange={handleAssigneeChange}
              className="assignee-dropdown"
            >
              <option value="Unassigned">Unassigned</option>
              {assigneeList.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select> */}
            Assigned to: {currentAssignee}
            </div>

            <div className="ticket-info">
              <div className="priority-level">
              <Icon 
                icon={prioritySettings[task.priority].icon} 
                style={{ color: prioritySettings[task.priority].color }}
              />
              </div>
              <span className="ticket-number">{task.displayId}</span>
            </div>
        </div>
      </div>
    </div>

    <Popup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        canUpdate={canUpdate}
        // title={title}
        // ticketNumber={ticketNumber}
        // description={description}
        // project={project}
        // projectClass={projectClass}
        // priorityLevel={priorityLevel}        
        // assigneeList={assigneeList}
        id={task.id}
        // currentAssignee={currentAssignee}
        // onAssigneeChange={handleAssigneeChange} 
        ></Popup>
    </>
  );
};

export default TaskBox;
