import React, { useEffect, useState } from 'react'
import { browseTeamRequest } from '../../../services/teamService';
import './Teams.scss'

const Teams: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [teams, setTeams] = useState<any>(undefined);

  useEffect(() => {
    browseTeamRequest()
      .then((teams) => {
        console.log(teams)
        setTeams(teams);
      })
  }, [])

  return (
    <div className="page">
      <div className="grid">
        {teams?.map((teams: any) => (
          <div 
            key={teams.id}
            className={`
              grid__container
              ${expandedId === teams.id ? 'grid__container--expanded' : ''}
            `}
            onClick={() => setExpandedId(expandedId === teams.id ? null : teams.id)}
          >
            <div className="grid__header">
              <h2>{teams?.name}</h2>
              {expandedId === teams?.description && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(null);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              )}
            </div>
            
            <div className="grid__content">
              <p className="mt-2">{teams?.members?.name}</p>
              <p className="mt-2">{teams?.members?.email}</p>
              <div className="project">

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams