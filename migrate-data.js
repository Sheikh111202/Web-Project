const mongoose = require('mongoose');
const sql = require('mssql');
const { Role, User, Project, Task, Subtask, Status, Comment, Attachment, Permission, TimeTracking, Dependency, Budget, Feedback } = require('./models');

// SQL Server configuration
const sqlConfig = {
    user: "abc",
    password: "meow",
    server: "localhost\\MSSQLSERVER01",
    database: "DB_PHASE2",
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

async function migrateData() {
    try {
        // Connect to SQL Server
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');

        // Migrate Roles
        const rolesResult = await sql.query`SELECT * FROM Roles`;
        for (const role of rolesResult.recordset) {
            await Role.create(role);
        }
        console.log('Roles migrated');

        // Migrate Users
        const usersResult = await sql.query`SELECT * FROM Users`;
        for (const user of usersResult.recordset) {
            await User.create(user);
        }
        console.log('Users migrated');

        // Migrate Projects
        const projectsResult = await sql.query`SELECT * FROM Projects`;
        for (const project of projectsResult.recordset) {
            await Project.create(project);
        }
        console.log('Projects migrated');

        // Migrate Tasks
        const tasksResult = await sql.query`SELECT * FROM Tasks`;
        for (const task of tasksResult.recordset) {
            await Task.create(task);
        }
        console.log('Tasks migrated');

        // Migrate Subtasks
        const subtasksResult = await sql.query`SELECT * FROM Subtasks`;
        for (const subtask of subtasksResult.recordset) {
            await Subtask.create(subtask);
        }
        console.log('Subtasks migrated');

        // Migrate Statuses
        const statusesResult = await sql.query`SELECT * FROM Statuses`;
        for (const status of statusesResult.recordset) {
            await Status.create(status);
        }
        console.log('Statuses migrated');

        // Migrate Comments
        const commentsResult = await sql.query`SELECT * FROM Comments`;
        for (const comment of commentsResult.recordset) {
            await Comment.create(comment);
        }
        console.log('Comments migrated');

        // Migrate Attachments
        const attachmentsResult = await sql.query`SELECT * FROM Attachments`;
        for (const attachment of attachmentsResult.recordset) {
            await Attachment.create(attachment);
        }
        console.log('Attachments migrated');

        // Migrate Permissions
        const permissionsResult = await sql.query`SELECT * FROM Permissions`;
        for (const permission of permissionsResult.recordset) {
            await Permission.create(permission);
        }
        console.log('Permissions migrated');

        // Migrate TimeTracking
        const timeTrackingResult = await sql.query`SELECT * FROM TimeTracking`;
        for (const timeTracking of timeTrackingResult.recordset) {
            await TimeTracking.create(timeTracking);
        }
        console.log('TimeTracking migrated');

        // Migrate Dependencies
        const dependenciesResult = await sql.query`SELECT * FROM Dependencies`;
        for (const dependency of dependenciesResult.recordset) {
            await Dependency.create(dependency);
        }
        console.log('Dependencies migrated');

        // Migrate Budget
        const budgetResult = await sql.query`SELECT * FROM Budget`;
        for (const budget of budgetResult.recordset) {
            await Budget.create(budget);
        }
        console.log('Budget migrated');

        // Migrate Feedback
        const feedbackResult = await sql.query`SELECT * FROM Feedback`;
        for (const feedback of feedbackResult.recordset) {
            await Feedback.create(feedback);
        }
        console.log('Feedback migrated');

        console.log('Migration completed successfully');
    } catch (err) {
        console.error('Error during migration:', err);
    } finally {
        // Close connections
        await sql.close();
        await mongoose.connection.close();
    }
}

migrateData(); 