import React, { useEffect, useState } from 'react'
import { browseTeamRequest } from '../../../services/teamService';
import './Teams.scss'
import { useSearchParams } from 'react-router-dom';

const Teams: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [teams, setTeams] = useState<any>(undefined);
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const teamid = searchParams.get('team');
    browseTeamRequest(teamid ? { id: teamid } : {})
      .then((teams) => {
        console.log(teams)
        setTeams(teams);
      })
  }, [])

  return (
    <div className="page">
      <div className="grid">
        {teams?.map((team: any) => (
          <div 
            key={team.id}
            className={`
              grid__container
              ${expandedId === team.id ? 'grid__container--expanded' : ''}
            `}
            onClick={() => setExpandedId(expandedId === team.id ? null : team.id)}
          >
            <div className="grid__header">
              <h2>{team?.name}</h2>
              {expandedId === team?.description && (
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
              <p>{team.description}</p>
              <p className="mt-2">
                Team Members: 
                {team.members.map((user: any) => (
                  <div>
                    <span>{user.name}</span>
                    <span>--------------</span>
                    <span>{user.email}</span>
                  </div>
                ))}
              </p>
              <p className="mt-2">{teams?.members?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams