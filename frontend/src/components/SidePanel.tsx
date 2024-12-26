import React from 'react';
import './SidePanel.scss';

interface SidePanelProps {
  isOpen: boolean;
  closePanel: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen }) => {
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-header">
        {/* You can use the same burger icon or a close icon */}
        
      </div>
      <div className="panel-content">
        <p>Panel Content</p>
      </div>
    </div>
  );
};

export default SidePanel;
