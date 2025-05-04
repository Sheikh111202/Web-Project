import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageRoles from './pages/admin/ManageRoles';
import ProjectManagement from './pages/admin/ProjectManagement';
import TaskOversight from './pages/admin/TaskOversight';
import BudgetManagement from './pages/admin/BudgetManagement';
import FeedbackOverview from './pages/admin/FeedbackOverview';
import SystemReports from './pages/admin/SystemReports';
import CreateTask from './pages/shared/CreateTask';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import MyTasks from './pages/user/MyTasks';
import TimeTracking from './pages/user/TimeTracking';
import SubmitFeedback from './pages/shared/SubmitFeedback';
import ProjectOverview from './pages/user/ProjectOverview';
import ProfileSettings from './pages/user/ProfileSettings';

// Shared Pages
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import Unauthorized from './pages/shared/Unauthorized';
import NotFound from './pages/shared/NotFound';
import LandingPage from './pages/shared/LandingPage';
import AddTimeEntry from './pages/user/AddTimeEntry';
import EditTimeEntry from './pages/user/EditTimeEntry';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route - show landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="Admin">
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/roles" element={
            <ProtectedRoute requiredRole="Admin">
              <ManageRoles />
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute requiredRole="Admin">
              <ProjectManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/tasks" element={
            <ProtectedRoute requiredRole="Admin">
              <TaskOversight />
            </ProtectedRoute>
          } />
          <Route path="/admin/tasks/new" element={
            <ProtectedRoute requiredRole="Admin">
              <CreateTask />
            </ProtectedRoute>
          } />
          <Route path="/admin/budget" element={
            <ProtectedRoute requiredRole="Admin">
              <BudgetManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/feedback" element={
            <ProtectedRoute requiredRole="Admin">
              <FeedbackOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute requiredRole="Admin">
              <SystemReports />
            </ProtectedRoute>
          } />

          {/* Shared Task Creation Route */}
          <Route path="/tasks/new" element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } />

          {/* User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } />
          <Route path="/time-tracking" element={
            <ProtectedRoute>
              <TimeTracking />
            </ProtectedRoute>
          } />

<Route path="/time-tracking/new" element={
          <ProtectedRoute>
            <AddTimeEntry />
          </ProtectedRoute>
        } />
        
        <Route path="/time-tracking/:id/edit" element={
          <ProtectedRoute>
            <EditTimeEntry />
          </ProtectedRoute>
        } />
          <Route path="/feedback" element={
            <ProtectedRoute>
              <SubmitFeedback />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectOverview />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />

          {/* Shared Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
