import React, { useState } from 'react';
import './TaskBox.scss';
import { PriorityLevel } from '../types';
import { chevronUp, chevronsUp, chevronDown } from 'react-icons-kit/feather';
import {minus} from 'react-icons-kit/typicons/minus';
import Icon from 'react-icons-kit';

type TaskBoxProps = {
  title: string;
  ticketNumber: string;
  assignee: string;
  project: string;
  priorityLevel: PriorityLevel;
  assigneeList: string[];
}

const prioritySettings = {
  [PriorityLevel.low]: { icon: chevronDown, color: '#28a745' }, // Green for Low
  [PriorityLevel.medium]: { icon: minus, color: '#ffc107' }, // Yellow for Medium
  [PriorityLevel.high]: { icon: chevronUp,  color: '#e67e22' }, // Orange for High
  [PriorityLevel.critical]: { icon: chevronsUp, color:'#d9534f' } // Red for Critical
};

const TaskBox: React.FC<TaskBoxProps> = ({ title, ticketNumber, assignee, project, priorityLevel, assigneeList }) => {
  const [currentAssignee, setCurrentAssignee] = useState<string>(assignee || 'Unassigned');

  const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAssignee(event.target.value);
  };
  
  const projectClass = project.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="task-box">
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
  );
};

export default TaskBox;
