import React, { useState } from 'react';
import Layout from '../../components/shared/Layout';

const AddTimeEntry = () => {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const [timeEntryId, setTimeEntryId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startTime') {
      setStartTime(value);
    } else if (name === 'endTime') {
      setEndTime(value);
      if (startTime) {
        const start = new Date(startTime);
        const end = new Date(value);
        const timeDiff = (end - start) / (1000 * 60); // Convert to minutes
        setTotalTime(timeDiff);
      }
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!timeEntryId || !taskId || !startTime || !endTime || !totalTime) {
      setError('Please fill in all fields.');
      return;
    }

    const formattedStartTime = formatDateTime(startTime);
    const formattedEndTime = formatDateTime(endTime);

    try {
      const response = await fetch('http://localhost:3000/api/user/time-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time_entry_id: timeEntryId, // Manually assigned time_entry_id
          task_id: taskId,
          user_id: userId,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          total_time: totalTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Time entry added successfully');
        window.location.href = '/time-tracking'; // Redirect to the time tracking page
      } else {
        setError(data.message || 'Failed to add time entry');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="add-time-entry">
        <h1>Add Time Entry</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="timeEntryId">Time Entry ID</label>
            <input
              type="number"
              id="timeEntryId"
              value={timeEntryId}
              onChange={(e) => setTimeEntryId(e.target.value)}
            />
          </div>
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
              name="startTime"
              value={startTime}
              onChange={handleTimeChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={handleTimeChange}
            />
          </div>
          <div>
            <label htmlFor="totalTime">Total Time (in minutes)</label>
            <input
              type="number"
              id="totalTime"
              value={totalTime}
              disabled
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
          <button type="submit">Add Time Entry</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddTimeEntry;
