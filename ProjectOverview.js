import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const ProjectOverview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch the user ID from localStorage
  const user = JSON.parse(localStorage.getItem('user'));  // Parse the JSON string
  const userId = user ? user.id : null;  // Assuming 'userId' is stored in localStorage

  useEffect(() => {
    // Check if userId is available in localStorage
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        // Call the backend API to fetch projects by user ID
        const response = await fetch(`http://localhost:3000/projects/by-user/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]); // Run effect when userId changes

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="project-overview">
        <h1>Project Overview</h1>
        <div className="project-grid">
          {projects.map(project => (
            <div key={project.project_id} className="project-card">
              <h3>{project.name}</h3>
              <p>Status: {project.progress}</p>
              <p>Start Date: {new Date(project.start_time).toLocaleDateString()}</p>
              <p>End Date: {new Date(project.end_time).toLocaleDateString()}</p>
              <p>Team Size: {project.team_size}</p>
              <div className="project-stats">
                <div className="stat">
                  <h4>Tasks</h4>
                  <p>Total: {project.total_tasks}</p>
                  <p>Completed: {project.completed_tasks}</p>
                </div>
                <div className="stat">
                  <h4>Budget</h4>
                  <p>Total: ${project.total_budget}</p>
                  <p>Used: ${project.used_budget}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectOverview;
