const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Role, User, Project, Task, Subtask, Status, Comment, Attachment, Permission, TimeTracking, Dependency, Budget, Feedback } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// Roles endpoints
app.post('/roles', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).send("Role created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/roles', async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/roles/:id', async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { role_id: req.params.id },
            { role_name: req.body.role_name },
            { new: true }
        );
        if (!role) return res.status(404).send("Role not found");
        res.send("Role updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/roles/:id', async (req, res) => {
    try {
        const role = await Role.findOneAndDelete({ role_id: req.params.id });
        if (!role) return res.status(404).send("Role not found");
        res.send("Role deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Users endpoints
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send("User created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { user_id: req.params.id },
            {
                username: req.body.username,
                password_hash: req.body.password_hash,
                email: req.body.email,
                role_id: req.body.role_id
            },
            { new: true }
        );
        if (!user) return res.status(404).send("User not found");
        res.send("User updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ user_id: req.params.id });
        if (!user) return res.status(404).send("User not found");
        res.send("User deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Projects endpoints
app.post('/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send("Project created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/projects/by-user/:userId', async (req, res) => {
    try {
        const projects = await Project.find({ created_by: parseInt(req.params.userId) });
        if (!projects.length) {
            return res.status(404).json({ message: "No projects found for this user" });
        }
        res.json(projects);
    } catch (err) {
        console.error("Error fetching projects:", err.message);
        res.status(500).send("Server error");
    }
});

app.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { project_id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
                created_by: req.body.created_by
            },
            { new: true }
        );
        if (!project) return res.status(404).send("Project not found");
        res.send("Project updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ project_id: req.params.id });
        if (!project) return res.status(404).send("Project not found");
        res.send("Project deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Tasks endpoints
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send("Task created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { task_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).send("Task not found");
        res.send("Task updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ task_id: req.params.id });
        if (!task) return res.status(404).send("Task not found");
        res.send("Task deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Subtasks endpoints
app.post('/subtasks', async (req, res) => {
    try {
        const subtask = new Subtask(req.body);
        await subtask.save();
        res.status(201).send("Subtask created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/subtasks', async (req, res) => {
    try {
        const subtasks = await Subtask.find();
        res.json(subtasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Comments endpoints
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send("Comment created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// TimeTracking endpoints
app.post('/time-tracking', async (req, res) => {
    try {
        const timeTracking = new TimeTracking(req.body);
        await timeTracking.save();
        res.status(201).send("Time tracking entry created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/time-tracking', async (req, res) => {
    try {
        const timeTracking = await TimeTracking.find();
        res.json(timeTracking);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Budget endpoints
app.post('/budget', async (req, res) => {
    try {
        const budget = new Budget(req.body);
        await budget.save();
        res.status(201).send("Budget entry created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Feedback endpoints
app.post('/feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).send("Feedback created");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
