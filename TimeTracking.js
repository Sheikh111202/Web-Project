import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const TimeTracking = () => {
  
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));  // Parse the JSON string
  const id = user ? user.id : null;  // Assuming 'userId' is stored in localStorage

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/time-entries/${id}`);
        const data = await response.json();
        setTimeEntries(data);  // Set the fetched data to state
      } catch (err) {
        setError('Failed to fetch time entries');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTimeEntries();
    }
  }, [id]);

  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this time entry?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/time-entries/${entryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete time entry');
      }

      setTimeEntries(timeEntries.filter(entry => entry.id !== entryId)); // Remove the deleted entry from the state
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNewEntry = () => {
    // Navigate to the add new time entry form using window.location.href
    window.location.href = '/time-tracking/new';
  };

  const handleEditEntry = (entryId) => {
    // Navigate to the edit form for the selected time entry using window.location.href
    window.location.href = `/time-tracking/${entryId}/edit`;
  };

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="time-tracking">
        <h1>Time Tracking</h1>
        <button onClick={handleAddNewEntry}>
          Add New Time Entry
        </button>
        <table className="time-entries-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.task_name}</td> {/* Task Name */}
                <td>{entry.project_name}</td> {/* Project Name */}
                <td>{new Date(entry.date).toLocaleDateString()}</td> {/* Date */}
                <td>{entry.hours}</td> {/* Hours worked */}
                <td>{entry.task_description}</td> {/* Task Description */}
                <td>
                  <button onClick={() => handleEditEntry(entry.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default TimeTracking;
