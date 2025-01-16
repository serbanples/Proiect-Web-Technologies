import React, { useEffect, useState } from 'react'
import { browseProjectsRequest } from '../../../services/projectService';
import './Projects.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any>(undefined);
  const nav = useNavigate();
  const auth = useAuth();

  const refresh = () => {
    browseProjectsRequest()
    .then((projects) => {
      console.log(projects)
      setProjects(projects);
    })
  }

  useEffect(() => {
    console.log(auth)
    refresh();
  }, [])

  return (
    <div className="page">
      <div className="grid">
        {projects?.map((project: any) => (
          <div 
            key={project.id}
            className={`
              grid__container
              ${expandedId === project.id ? 'grid__container--expanded' : ''}
            `}
            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
          >
            <div className="grid__header">
              <h2 style={{ color: project.prefferedColor }}>{project.name}</h2>
              {expandedId === project.title && (
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
              <p className="mt-2">{project?.description}</p>
              <div className="project-details">
                <div>Project started on: {project?.createdAt}</div>
                <div>Project leader: {project?.createdBy?.email}</div>
                <div onClick={() => nav(`/dashboard/all-tasks?project=${project?.id}`)}>See tasks</div>
                <div onClick={() => nav(`/dashboard/teams?team=${project?.team?.id}`)}>Project team: {project?.team?.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects