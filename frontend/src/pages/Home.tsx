import React from 'react';
import './Home.scss';
// import Dashboard from '../components/dashboard/Dashboard';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Menu bar and side panel components */}
    {/* <Dashboard /> */}
      <div className="content-container">
        <div className="project-table-container">
          <table className="project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project 1</td>
                <td>In Progress</td>
                <td>Type A</td>
              </tr>
              <tr>
                <td>Project 2</td>
                <td>QA</td>
                <td>Type B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
