import React, { useState } from 'react';
import './TaskBox.scss';
import { PriorityLevel } from '../types';
import { prioritySettings } from '../../config/tasks';
import Icon from 'react-icons-kit';
import Popup from './Popup';

type TaskBoxProps = {
  title: string;
  ticketNumber: string;
  assignee: string;
  project: string;
  priorityLevel: PriorityLevel;
  assigneeList: string[];
  description: string;
}

const TaskBox: React.FC<TaskBoxProps> = ({ title, ticketNumber, assignee, project, priorityLevel, assigneeList, description }) => {
  const [currentAssignee, setCurrentAssignee] = useState<string>(assignee || 'Unassigned');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAssignee(event.target.value);
  };
  
  const projectClass = project.toLowerCase().replace(/\s+/g, '-');

  return (
    <>
    <div className="task-box" onClick={() => setIsPopupOpen(true)}>
      <div className="task-content">

        <div className="task-title">{title}</div>
        <div className={`project-tag ${projectClass}`}>{project}</div>

        <div className="bottom-info">
            <div className="assignee">
            <label htmlFor="assignee-select">Assigned to: </label>
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
            </select>
            </div>

            <div className="ticket-info">
              <div className="priority-level">
              <Icon 
                icon={prioritySettings[priorityLevel].icon} 
                style={{ color: prioritySettings[priorityLevel].color }}
              />
              </div>
              <span className="ticket-number">{ticketNumber}</span>
            </div>
        </div>
      </div>
    </div>

    <Popup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={title}
        ticketNumber={ticketNumber}
        description={description}
        project={project}
        projectClass={projectClass}
        priorityLevel={priorityLevel}        
        assigneeList={assigneeList}
        currentAssignee={currentAssignee}
        onAssigneeChange={handleAssigneeChange} 
        ></Popup>
    </>
  );
};

export default TaskBox;
