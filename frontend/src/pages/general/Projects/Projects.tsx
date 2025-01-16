import React, { useEffect, useState } from 'react'
import { browseProjectsRequest } from '../../../services/projectService';
import './Projects.scss'

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any>(undefined);

  useEffect(() => {
    browseProjectsRequest()
      .then((projects) => {
        console.log(projects)
        setProjects(projects);
      })
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
              <h2>{project.name}</h2>
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
              <p className="mt-2">{project.description}</p>
              <div className="project">

              </div>
              <a href={`/dashboard/all-tasks?project=${project.id}`}>See tasks</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects