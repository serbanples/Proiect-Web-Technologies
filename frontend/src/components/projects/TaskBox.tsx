import React from 'react';
import './TaskBox.scss';
import { PriorityLevel } from '../types';
import { chevronUp, chevronsUp, chevronDown } from 'react-icons-kit/feather';
import { equals } from 'react-icons-kit/ionicons';
import Icon from 'react-icons-kit';

type TaskBoxProps = {
  title: string;
  ticketNumber: string;
  assignee: string;
  project: string;
  priorityLevel: PriorityLevel
}

const prioritySettings = {
  [PriorityLevel.low]: { icon: chevronDown, color: '#28a745' }, // Green for Low
  [PriorityLevel.medium]: { icon: equals, color: '#ffc107' }, // Yellow for Medium
  [PriorityLevel.high]: { icon: chevronUp,  color: '#e67e22' }, // Orange for High
  [PriorityLevel.critical]: { icon: chevronsUp, color:'#d9534f' } // Red for Critical
};

const TaskBox: React.FC<TaskBoxProps> = ({ title, ticketNumber, assignee, project, priorityLevel }) => {
  const projectClass = project.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="project-box">
      <div className="project-content">

        <div className="project-title">{title}</div>
        <div className={`project-tag ${projectClass}`}>{project}</div>
          <div className="bottom-info">
            <div className="assignee">Assigned to: {assignee}</div>
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
