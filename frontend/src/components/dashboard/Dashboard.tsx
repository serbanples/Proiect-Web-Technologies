import React, { useState } from 'react';
import './Dashboard.scss';
import SidePanel from './SidePanel';
import { Route, Routes} from 'react-router-dom';
import Home from '../../pages/Home';
import App from '../../App';


const Dashboard: React.FC = () => {
const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prevState) => !prevState);
  };

  return (
    <div className={`dashboard ${isSidePanelOpen ? 'side-panel-open' : ''}`}>
        {/* Side Panel */}
        <SidePanel isOpen={isSidePanelOpen} togglePanel={toggleSidePanel} />
      {/* Main Content (Page content can be injected here) */}
      <div className="main-content">
        {/* <Router> */}
            <Routes>
                <Route path="/home" Component={Home} />
                <Route path="/" Component={App} />
            {/* Add more routes as needed */}
          </Routes>
        {/* </Router> */}
      </div>
    </div>
  );
};

export default Dashboard;
