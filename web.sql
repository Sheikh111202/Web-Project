
CREATE DATABASE DB_PHASE2;
USE DB_PHASE2;


CREATE TABLE Roles (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT NOT NULL FOREIGN KEY REFERENCES Roles(role_id),
    created_at DATETIME
);
--ascas
CREATE TABLE Projects (
    project_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT NOT NULL FOREIGN KEY REFERENCES Users(user_id),
    created_at DATETIME
);

CREATE TABLE Tasks (
    task_id INT PRIMARY KEY,
    project_id INT NOT NULL FOREIGN KEY REFERENCES Projects(project_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INT FOREIGN KEY REFERENCES Users(user_id),
    status VARCHAR(20) NOT NULL DEFAULT 'To Do',
    priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
    created_at DATETIME
);

CREATE TABLE Subtasks (
    subtask_id INT PRIMARY KEY,
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'To Do'
);

CREATE TABLE Statuses (
    status_id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    progress VARCHAR(3) NOT NULL DEFAULT '00%',
    project_id INT NOT NULL FOREIGN KEY REFERENCES Projects(project_id)
);

CREATE TABLE Comments (
    comment_id INT PRIMARY KEY,
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    user_id INT NOT NULL FOREIGN KEY REFERENCES Users(user_id),
    comment TEXT NOT NULL,
    created_at DATETIME
);

CREATE TABLE Attachments (
    attachment_id INT PRIMARY KEY,
    attachment_name VARCHAR(100),
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    attachment_type VARCHAR(50),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at DATETIME
);

CREATE TABLE Permissions (
    permission_id INT PRIMARY KEY,
    role_id INT NOT NULL FOREIGN KEY REFERENCES Roles(role_id),
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    can_edit INT DEFAULT 0,
    can_delete INT DEFAULT 0,
    can_assign INT DEFAULT 0
);

CREATE TABLE TimeTracking (
    time_entry_id INT PRIMARY KEY,
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    user_id INT NOT NULL FOREIGN KEY REFERENCES Users(user_id),
    start_time VARCHAR(50) NOT NULL,
    end_time VARCHAR(50),
    total_time INT
);

CREATE TABLE Dependencies (
    dependency_id INT PRIMARY KEY,
    task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id),
    depends_on_task_id INT NOT NULL FOREIGN KEY REFERENCES Tasks(task_id)
);

CREATE TABLE Budget (
    budget_id INT PRIMARY KEY,
    project_id INT NOT NULL FOREIGN KEY REFERENCES Projects(project_id),
    allocated_budget DECIMAL(10, 2) NOT NULL,
    spent_budget DECIMAL(10, 2) DEFAULT 0,
    remaining_budget DECIMAL(10, 2)
);

CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES Users(user_id),
    task_id INT FOREIGN KEY REFERENCES Tasks(task_id),
    project_id INT FOREIGN KEY REFERENCES Projects(project_id),
    feedback_text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at VARCHAR(50)
);

--							data in tables

-- Insert into Roles Table
INSERT INTO Roles (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'Project Manager'),
(3, 'Developer'),
(4, 'Tester'),
(5, 'Client');

-- Insert into Users Table with updated Pakistani-style emails
INSERT INTO Users (user_id, username, password_hash, email, role_id, created_at) VALUES
(1, 'usman_javed', 'password_1', 'usman.javed@gmail.com', 1, '2023-10-01 10:00:00'),
(2, 'hayyan_haider', 'password_2', 'hayyan.haider@gmail.com', 2, '2023-10-02 11:00:00'),
(3, 'sohaib_murtaza', 'password_3', 'sohaib.murtaza@gmail.com', 3, '2023-10-03 12:00:00'),
(4, 'rizwan_arshad', 'password_4', 'rizwan.arshad@gmail.com', 4, '2023-10-04 13:00:00'),
(5, 'muzammil_shahid', 'password_5', 'muzammil.shahid@gmail.com', 5, '2023-10-05 14:00:00');

-- Insert into Projects Table
INSERT INTO Projects (project_id, name, description, created_by, created_at) VALUES
(1, 'A', 'developing a new website.', 2, '2023-10-01 10:00:00'),
(2, 'B', 'building a mobile app.', 2, '2023-10-02 11:00:00'),
(3, 'C', 'data analysis.', 1, '2023-10-03 12:00:00'),
(4, 'D', 'cloud migration.', 3, '2023-10-04 13:00:00'),
(5, 'E', 'AI research.', 4, '2023-10-05 14:00:00');

-- Insert into Tasks Table
INSERT INTO Tasks (task_id, project_id, title, description, assigned_to, status, priority, created_at) VALUES
(1, 1, 'Design Homepage', 'Create the design for the homepage.', 3, 'In Progress', 'High', '2023-10-01 10:00:00'),
(2, 1, 'Develop Login Page', 'Implement the login functionality.', 3, 'To Do', 'Medium', '2023-10-02 11:00:00'),
(3, 2, 'Build App UI', 'Design the user interface for the mobile app.', 4, 'Completed', 'High', '2023-10-03 12:00:00'),
(4, 3, 'Analyze Data', 'Perform data analysis on the dataset.', 5, 'In Progress', 'Low', '2023-10-04 13:00:00'),
(5, 4, 'Migrate to Cloud', 'Move the application to the cloud.', 3, 'To Do', 'High', '2023-10-05 14:00:00');

-- Insert into Subtasks Table
INSERT INTO Subtasks (subtask_id, task_id, title, status) VALUES
(1, 1, 'Create Wireframe', 'Completed'),
(2, 1, 'Design Color Scheme', 'In Progress'),
(3, 2, 'Develop Login API', 'To Do'),
(4, 3, 'Design App Icons', 'Completed'),
(5, 4, 'Clean Dataset', 'In Progress');

-- Insert into Statuses Table
INSERT INTO Statuses (status_id, name, progress, project_id) VALUES
(1, 'Design Phase', '30%', 1),
(2, 'Development Phase', '50%', 2),
(3, 'Testing Phase', '20%', 3),
(4, 'Deployment Phase', '10%', 4),
(5, 'Research Phase', '40%', 5);

-- Insert into Comments Table
INSERT INTO Comments (comment_id, task_id, user_id, comment, created_at) VALUES
(1, 1, 2, 'Please finalize the design by tomorrow.', '2023-10-01 10:30:00'),
(2, 1, 3, 'Working on the wireframe.', '2023-10-01 11:00:00'),
(3, 2, 4, 'API development is in progress.', '2023-10-02 12:00:00'),
(4, 3, 5, 'UI design is completed.', '2023-10-03 13:00:00'),
(5, 4, 1, 'Data cleaning is ongoing.', '2023-10-04 14:00:00');

-- Insert into Attachments Table
INSERT INTO Attachments (attachment_id, attachment_name, task_id, attachment_type, file_path, uploaded_at) VALUES
(1, 'homepage_wireframe.pdf', 1, 'PDF', '/attachments/1.pdf', '2023-10-01 10:00:00'),
(2, 'login_api_specs.docx', 2, 'DOCX', '/attachments/2.docx', '2023-10-02 11:00:00'),
(3, 'app_icons.zip', 3, 'ZIP', '/attachments/3.zip', '2023-10-03 12:00:00'),
(4, 'data_analysis.xlsx', 4, 'XLSX', '/attachments/4.xlsx', '2023-10-04 13:00:00'),
(5, 'cloud_migration_plan.pdf', 5, 'PDF', '/attachments/5.pdf', '2023-10-05 14:00:00');

-- Insert into Permissions Table
INSERT INTO Permissions (permission_id, role_id, task_id, can_edit, can_delete, can_assign) VALUES
(1, 1, 1, 1, 1, 1),
(2, 2, 2, 1, 0, 1),
(3, 3, 3, 1, 0, 0),
(4, 4, 4, 0, 0, 0),
(5, 5, 5, 0, 0, 0);

-- Insert into TimeTracking Table
INSERT INTO TimeTracking (time_entry_id, task_id, user_id, start_time, end_time, total_time) VALUES
(1, 1, 3, '2023-10-01 10:00:00', '2023-10-01 12:00:00', 120),
(2, 2, 3, '2023-10-02 11:00:00', '2023-10-02 13:00:00', 120),
(3, 3, 4, '2023-10-03 12:00:00', '2023-10-03 14:00:00', 120),
(4, 4, 5, '2023-10-04 13:00:00', '2023-10-04 15:00:00', 120),
(5, 5, 3, '2023-10-05 14:00:00', '2023-10-05 16:00:00', 120);

-- Insert into Dependencies Table
INSERT INTO Dependencies (dependency_id, task_id, depends_on_task_id) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 5, 4),
(5, 1, 5);

-- Insert into Budget Table
INSERT INTO Budget (budget_id, project_id, allocated_budget, spent_budget, remaining_budget) VALUES
(1, 1, 10000.00, 3000.00, 7000.00),
(2, 2, 15000.00, 5000.00, 10000.00),
(3, 3, 20000.00, 10000.00, 10000.00),
(4, 4, 25000.00, 12000.00, 13000.00),
(5, 5, 30000.00, 15000.00, 15000.00);

-- Insert into Feedback Table
INSERT INTO Feedback (feedback_id, user_id, task_id, project_id, feedback_text, rating, created_at) VALUES
(1, 2, 1, 1, 'Great work on the design!', 5, '2023-10-01 10:00:00'),
(2, 3, 2, 2, 'The API needs improvement.', 3, '2023-10-02 11:00:00'),
(3, 4, 3, 3, 'The UI looks fantastic!', 5, '2023-10-03 12:00:00'),
(4, 5, 4, 4, 'Data analysis is progressing well.', 4, '2023-10-04 13:00:00'),
(5, 1, 5, 5, 'Cloud migration plan is solid.', 5, '2023-10-05 14:00:00');

--							PRINTING TABLES

-- Print Roles Table
SELECT * FROM Roles;

-- Print Users Table
SELECT * FROM Users;

-- Print Projects Table
SELECT * FROM Projects;

-- Print Tasks Table
SELECT * FROM Tasks;

-- Print Subtasks Table
SELECT * FROM Subtasks;

-- Print Statuses Table
SELECT * FROM Statuses;

-- Print Comments Table
SELECT * FROM Comments;

-- Print Attachments Table
SELECT * FROM Attachments;

-- Print Permissions Table
SELECT * FROM Permissions;

-- Print TimeTracking Table
SELECT * FROM TimeTracking;

-- Print Dependencies Table
SELECT * FROM Dependencies;

-- Print Budget Table
SELECT * FROM Budget;

-- Print Feedback Table
SELECT * FROM Feedback;

--							drop tables

-- Drop Roles Table
DROP TABLE IF EXISTS Roles;

-- Drop Users Table
DROP TABLE IF EXISTS Users;

-- Drop Projects Table
DROP TABLE IF EXISTS Projects;

-- Drop Tasks Table
DROP TABLE IF EXISTS Tasks;

-- Drop Subtasks Table
DROP TABLE IF EXISTS Subtasks;

-- Drop Statuses Table
DROP TABLE IF EXISTS Statuses;

-- Drop Comments Table
DROP TABLE IF EXISTS Comments;

-- Drop Attachments Table
DROP TABLE IF EXISTS Attachments;

-- Drop Permissions Table
DROP TABLE IF EXISTS Permissions;

-- Drop TimeTracking Table
DROP TABLE IF EXISTS TimeTracking;

-- Drop Dependencies Table
DROP TABLE IF EXISTS Dependencies;

-- Drop Budget Table
DROP TABLE IF EXISTS Budget;

-- Drop Feedback Table
DROP TABLE IF EXISTS Feedback;

--						QUERIES TO TEST SOME FUNCTIONS 

-- 1. Get All Users with Their Roles
SELECT u.user_id, u.username, u.email, r.role_name
FROM Users u
JOIN Roles r ON u.role_id = r.role_id;

-- 2. Get All Tasks Assigned to a Specific User
SELECT t.task_id, t.name AS title, t.status, p.name AS project_name
FROM Tasks t
JOIN Projects p ON t.project_id = p.project_id
WHERE t.assigned_to = 3; -- Replace 3 with the desired user_id

-- 3. Get All Subtasks for a Specific Task
SELECT s.subtask_id, s.name AS title, s.status
FROM Subtasks s
WHERE s.task_id = 1; -- Replace 1 with the desired task_id

-- 4. Get All Comments for a Specific Task
SELECT c.comment_id, u.username, c.comment_text AS comment, c.created_at
FROM Comments c
JOIN Users u ON c.user_id = u.user_id
WHERE c.task_id = 1; -- Replace 1 with the desired task_id

-- 5. Get the Total Time Spent on a Task
SELECT t.task_id, t.name AS title, SUM(tt.hours_logged) AS total_time_spent
FROM TimeTracking tt
JOIN Tasks t ON tt.task_id = t.task_id
WHERE t.task_id = 1 -- Replace 1 with the desired task_id
GROUP BY t.task_id, t.name;

-- 6. Get the Remaining Budget for All Projects
SELECT p.project_id, p.name, b.amount AS allocated_budget, b.spent, 
       (b.amount - b.spent) AS remaining_budget
FROM Budget b
JOIN Projects p ON b.project_id = p.project_id;

-- 7. Get All Feedback for a Specific Project
SELECT f.feedback_id, u.username, f.feedback_text, f.created_at
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
WHERE f.project_id = 1; -- Replace 1 with the desired project_id

-- 8. Get All Tasks with Their Dependencies
SELECT t.task_id, t.name AS title, d.depends_on_task_id
FROM Tasks t
JOIN Dependencies d ON t.task_id = d.task_id;

-- 9. Get All Attachments for a Specific Task
SELECT a.attachment_id, a.file_path AS attachment_path, a.uploaded_at
FROM Attachments a
WHERE a.task_id = 1; -- Replace 1 with the desired task_id

-- 10. Get All Projects Created by a Specific User
SELECT p.project_id, p.name, p.description, p.created_at
FROM Projects p
WHERE p.created_by = 2; -- Replace 2 with the desired user_id

-- View 1: Active Tasks
-- Drop the view if it exists
IF OBJECT_ID('ActiveTasks', 'V') IS NOT NULL
    DROP VIEW ActiveTasks;

-- Create the view
CREATE VIEW ActiveTasks AS
SELECT task_id, title, status
FROM Tasks
WHERE status != 'Completed';

-- View 2: Project Task Count
-- Drop the view if it exists
IF OBJECT_ID('ProjectTaskCount', 'V') IS NOT NULL
    DROP VIEW ProjectTaskCount;

-- Create the view
CREATE VIEW ProjectTaskCount AS
SELECT p.project_id, p.name, COUNT(t.task_id) AS task_count
FROM Projects p
LEFT JOIN Tasks t ON p.project_id = t.project_id
GROUP BY p.project_id, p.name;

-- View 3: User Task Assignments
-- Drop the view if it exists
IF OBJECT_ID('UserTaskAssignments', 'V') IS NOT NULL
    DROP VIEW UserTaskAssignments;

-- Create the view
CREATE VIEW UserTaskAssignments AS
SELECT u.user_id, u.username, t.task_id, t.title, t.status, p.name AS project_name
FROM Users u
JOIN Tasks t ON u.user_id = t.assigned_to
JOIN Projects p ON t.project_id = p.project_id;

-- View 4: Task Progress with Subtasks
-- Drop the view if it exists
IF OBJECT_ID('TaskProgress', 'V') IS NOT NULL
    DROP VIEW TaskProgress;

-- Create the view
CREATE VIEW TaskProgress AS
SELECT t.task_id, t.title, t.status, 
       COUNT(s.subtask_id) AS total_subtasks,
       SUM(CASE WHEN s.status = 'Completed' THEN 1 ELSE 0 END) AS completed_subtasks
FROM Tasks t
LEFT JOIN Subtasks s ON t.task_id = s.task_id
GROUP BY t.task_id, t.title, t.status;

-- View 5: Project Budget Summary
-- Drop the view if it exists
IF OBJECT_ID('ProjectBudgetSummary', 'V') IS NOT NULL
    DROP VIEW ProjectBudgetSummary;

-- Create the view
CREATE VIEW ProjectBudgetSummary AS
SELECT p.project_id, p.name, 
       b.allocated_budget, b.spent_budget, b.remaining_budget
FROM Projects p
JOIN Budget b ON p.project_id = b.project_id;

--						printing data of views 

-- Test ActiveTasks View
SELECT * FROM ActiveTasks;

-- Test ProjectTaskCount View
SELECT * FROM ProjectTaskCount;

-- Test UserTaskAssignments View
SELECT * FROM UserTaskAssignments;

-- Test TaskProgress View
SELECT * FROM TaskProgress;

-- Test ProjectBudgetSummary View
SELECT * FROM ProjectBudgetSummary;










