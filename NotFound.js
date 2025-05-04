import React from 'react';
import Layout from '../../components/shared/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button onClick={() => window.location.href = '/'}>
          Return to Home
        </button>
      </div>
    </Layout>
  );
};

export default NotFound; 