import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/admin/projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="project-management">
        <h1>Project Management</h1>
        <button onClick={() => window.location.href = '/admin/projects/new'}>
          Create New Project
        </button>
        <div className="project-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>Status: {project.status}</p>
              <p>Budget: ${project.budget}</p>
              <p>Team Size: {project.teamSize}</p>
              <p>Tasks: {project.taskCount}</p>
              <div className="project-actions">
                <button onClick={() => window.location.href = `/admin/projects/${project.id}`}>
                  View Details
                </button>
                <button onClick={() => window.location.href = `/admin/projects/${project.id}/edit`}>
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectManagement; 