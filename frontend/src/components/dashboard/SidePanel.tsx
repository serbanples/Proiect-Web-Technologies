import React from 'react';
import './SidePanel.scss';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';
import {tasks} from 'react-icons-kit/fa/tasks';
import {home} from 'react-icons-kit/feather/home';
import Icon from 'react-icons-kit';

interface SidePanelProps {
  isOpen: boolean;
  togglePanel: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, togglePanel }) => {
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="menu-bar">
        {/* Burger Icon to toggle the side panel */}
        <div className="burger" onClick={togglePanel}>
          <input type="checkbox" id="burger-toggle" checked={isOpen} readOnly />
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Panel content */}
      <div className="side-icons">
        <Link to={config.routes.myTasksRoute}>
          <Icon icon={tasks} size={24} />
          { isOpen && <span>My Tasks</span> }
        </Link>
        <Link to={config.routes.homeRoute}>
          <Icon icon={home} size={24} />
          { isOpen && <span>Home</span> }  
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
