import React from 'react';
import Icon from 'react-icons-kit';
import { x } from 'react-icons-kit/feather/x';
import './Popup.scss';
import { PriorityLevel } from '../types';
import { prioritySettings } from '../../config/tasks';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  ticketNumber: string;
  description: string;
  project: string;
  projectClass: string;
  priorityLevel: PriorityLevel; 
  assigneeList: string[];
  currentAssignee: string;
  onAssigneeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  ticketNumber,
  description,
  project,
  priorityLevel,
  assigneeList,
  currentAssignee,
  onAssigneeChange,
}) => {
  if (!isOpen) return null;
  const projectClass = project.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          <Icon icon={x} />
        </button>
        <div className="popup-header">{title}</div>
        <div className="popup-content">
          <div className="info-row">
            <span className="label">Ticket:</span>
            <span>{ticketNumber}</span>
          </div>
          <div className="info-row">
            <span className="label">Description:</span>
            <span>{description}</span>
          </div>
          <div className="info-row">
            <span className="label">Project:</span>
            <span className={`project-tag ${projectClass}`}>{project}</span>
          </div>
          <div className="info-row">
            <span className="label">Priority:</span>
            <span className="priority">
              <Icon
                icon={prioritySettings[priorityLevel].icon}
                style={{ color: prioritySettings[priorityLevel].color }}
              />
              {priorityLevel}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Assignee:</span>
            <select
              value={currentAssignee}
              onChange={onAssigneeChange}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="Unassigned">Unassigned</option>
              {assigneeList.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;