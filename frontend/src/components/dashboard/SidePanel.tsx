import React from 'react';
import './SidePanel.scss';

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
        {isOpen && (
          <>
            <span>Icon 1</span>
            <span>Icon 2</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
