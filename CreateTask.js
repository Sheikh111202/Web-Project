import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/shared/Layout';
import './CreateTask.css';

const CreateTask = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    estimatedHours: ''
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch projects
        const projectsRes = await fetch('/api/projects');
        if (!projectsRes.ok) {
          throw new Error(`Failed to fetch projects: ${projectsRes.status}`);
        }
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        // Only fetch users if admin
        if (isAdmin()) {
          const usersRes = await fetch('/api/admin/users');
          if (!usersRes.ok) {
            throw new Error(`Failed to fetch users: ${usersRes.status}`);
          }
          const usersData = await usersRes.json();
          setUsers(usersData);
        } else {
          // For regular users, only show themselves in the assignee dropdown
          setUsers([user]);
        }
      } catch (err) {
        console.error('Data fetch error:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, isAdmin]);

  const handleChange = (e) => {
    try {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    } catch (err) {
      console.error('Form change error:', err);
      setError('Error updating form data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdBy: user.id,
          // If user is not admin, auto-assign to themselves
          assignedTo: isAdmin() ? formData.assignedTo : user.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create task');
      }

      setSuccess('Task created successfully');
      setFormData({
        name: '',
        description: '',
        projectId: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
        estimatedHours: ''
      });
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    }
  };

  const handleReturnToHome = () => {
    try {
      console.log('Attempting navigation to dashboard');
      navigate(isAdmin() ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Failed to navigate to dashboard');
    }
  };

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div className="error-message">
          {error}
          <button onClick={handleReturnToHome} className="return-button">
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="create-task">
        <div className="header-actions">
          <h1>Create New Task</h1>
          <button 
            onClick={handleReturnToHome}
            className="return-button"
          >
            Return to Dashboard
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectId">Project</label>
            <select
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {isAdmin() && (
            <div className="form-group">
              <label htmlFor="assignedTo">Assign To</label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimatedHours">Estimated Hours</label>
            <input
              type="number"
              id="estimatedHours"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              min="0"
              step="0.5"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">Create Task</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTask; 