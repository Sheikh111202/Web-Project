import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';
import { useParams } from 'react-router-dom';

const EditTimeEntry = () => {
  const { id } = useParams(); // Get the time entry ID from the URL
  const [taskId, setTaskId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimeEntry = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/time-entries/${id}`);
        const data = await response.json();
        setTaskId(data.task_id);
        setStartTime(data.start_time);
        setEndTime(data.end_time);
        setTotalTime(data.total_time);
        setDescription(data.description);
      } catch (err) {
        setError('Failed to fetch time entry');
      }
    };

    fetchTimeEntry();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the object with only changed fields
    const updatedFields = {};

    if (taskId !== '') updatedFields.task_id = taskId;
    if (startTime !== '') updatedFields.start_time = startTime;
    if (endTime !== '') updatedFields.end_time = endTime;
    if (totalTime !== '') updatedFields.total_time = totalTime;
    if (description !== '') updatedFields.description = description;

    if (Object.keys(updatedFields).length === 0) {
      setError('Please fill in at least one field to update.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/time-entries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Time entry updated successfully');
        window.location.href = '/time-tracking'; // Redirect to the time tracking page
      } else {
        setError(data.message || 'Failed to update time entry');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="edit-time-entry">
        <h1>Edit Time Entry</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="taskId">Task ID</label>
            <input
              type="number"
              id="taskId"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="totalTime">Total Time (in minutes)</label>
            <input
              type="number"
              id="totalTime"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Update Time Entry</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditTimeEntry;
