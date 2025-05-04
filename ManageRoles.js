import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/admin/roles');
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        setError('Failed to fetch roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete role');
      }

      setRoles(roles.filter(role => role.id !== id));
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
      <div className="manage-roles">
        <h1>Manage Roles</h1>
        <button onClick={() => window.location.href = '/admin/roles/new'}>
          Add New Role
        </button>
        <table className="roles-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  <ul>
                    {role.permissions.map(permission => (
                      <li key={permission}>{permission}</li>
                    ))}
                  </ul>
                </td>
                <td>{role.userCount}</td>
                <td>
                  <button onClick={() => window.location.href = `/admin/roles/${role.id}`}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(role.id)}>
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

export default ManageRoles; 