import React, { useState } from 'react';
import './MenuBar.scss';
import SidePanel from './SidePanel';

const MenuBar: React.FC = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prevState) => !prevState);
  };

  return (
    <div className="menu-bar">
      {/* Burger Icon to toggle the side panel */}
      <div className="burger" onClick={toggleSidePanel}>
        <input type="checkbox" id="burger-toggle" checked={isSidePanelOpen} readOnly />
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Right side of the Menu Bar */}
      <div className="logo-and-logout">
        <img src="logo.png" alt="Logo" className="logo" />
        <button className="logout-btn">Log Out</button>
      </div>

      {/* Side Panel */}
      <SidePanel isOpen={isSidePanelOpen} closePanel={toggleSidePanel} />
    </div>
  );
};

export default MenuBar;
