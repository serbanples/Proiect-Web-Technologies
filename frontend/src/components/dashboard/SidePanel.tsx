import React from 'react';
import './SidePanel.scss';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';
// import {tasks} from 'react-icons-kit/fa/tasks';
import {grid} from 'react-icons-kit/feather/grid';
import Icon from 'react-icons-kit';
import {user} from 'react-icons-kit/feather/user';
import {checklist} from 'react-icons-kit/oct/checklist';
import {users} from 'react-icons-kit/feather/users';

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
        <Link to={config.routes.allTasksRoute}>
          <Icon icon={checklist} size={24} />
          { isOpen && <span>Tasks</span> }  
        </Link>

        <Link to={config.routes.allTeamsRoute}>
          <Icon icon={users} size={24} />
          { isOpen && <span>Teams</span> }
        </Link>

        <Link to={config.routes.allProjectRoute}>
          <Icon icon={grid} size={24} />
          { isOpen && <span>Projects</span> }
        </Link>

        <Link to={config.routes.myTasksRoute}>
          <Icon icon={user} size={24} />
          { isOpen && <span>My Profile</span> }
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
