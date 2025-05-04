const mongoose = require('mongoose');

// Role Schema
const roleSchema = new mongoose.Schema({
    role_id: { type: Number, required: true, unique: true },
    role_name: { type: String, required: true, unique: true }
});

// User Schema
const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

// Project Schema
const projectSchema = new mongoose.Schema({
    project_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    created_by: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

// Task Schema
const taskSchema = new mongoose.Schema({
    task_id: { type: Number, required: true, unique: true },
    project_id: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    assigned_to: Number,
    status: { type: String, default: 'To Do' },
    priority: { type: String, default: 'Medium' },
    created_at: { type: Date, default: Date.now }
});

// Subtask Schema
const subtaskSchema = new mongoose.Schema({
    subtask_id: { type: Number, required: true, unique: true },
    task_id: { type: Number, required: true },
    title: { type: String, required: true },
    status: { type: String, default: 'To Do' }
});

// Status Schema
const statusSchema = new mongoose.Schema({
    status_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    progress: { type: String, default: '00%' },
    project_id: { type: Number, required: true }
});

// Comment Schema
const commentSchema = new mongoose.Schema({
    comment_id: { type: Number, required: true, unique: true },
    task_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Attachment Schema
const attachmentSchema = new mongoose.Schema({
    attachment_id: { type: Number, required: true, unique: true },
    attachment_name: String,
    task_id: { type: Number, required: true },
    attachment_type: String,
    file_path: { type: String, required: true },
    uploaded_at: { type: Date, default: Date.now }
});

// Permission Schema
const permissionSchema = new mongoose.Schema({
    permission_id: { type: Number, required: true, unique: true },
    role_id: { type: Number, required: true },
    task_id: { type: Number, required: true },
    can_edit: { type: Number, default: 0 },
    can_delete: { type: Number, default: 0 },
    can_assign: { type: Number, default: 0 }
});

// TimeTracking Schema
const timeTrackingSchema = new mongoose.Schema({
    time_entry_id: { type: Number, required: true, unique: true },
    task_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    start_time: { type: String, required: true },
    end_time: String,
    total_time: Number
});

// Dependency Schema
const dependencySchema = new mongoose.Schema({
    dependency_id: { type: Number, required: true, unique: true },
    task_id: { type: Number, required: true },
    depends_on_task_id: { type: Number, required: true }
});

// Budget Schema
const budgetSchema = new mongoose.Schema({
    budget_id: { type: Number, required: true, unique: true },
    project_id: { type: Number, required: true },
    allocated_budget: { type: Number, required: true },
    spent_budget: { type: Number, default: 0 },
    remaining_budget: Number
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    feedback_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    task_id: Number,
    project_id: Number,
    feedback_text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    created_at: { type: String, required: true }
});

// Create and export models
module.exports = {
    Role: mongoose.model('Role', roleSchema),
    User: mongoose.model('User', userSchema),
    Project: mongoose.model('Project', projectSchema),
    Task: mongoose.model('Task', taskSchema),
    Subtask: mongoose.model('Subtask', subtaskSchema),
    Status: mongoose.model('Status', statusSchema),
    Comment: mongoose.model('Comment', commentSchema),
    Attachment: mongoose.model('Attachment', attachmentSchema),
    Permission: mongoose.model('Permission', permissionSchema),
    TimeTracking: mongoose.model('TimeTracking', timeTrackingSchema),
    Dependency: mongoose.model('Dependency', dependencySchema),
    Budget: mongoose.model('Budget', budgetSchema),
    Feedback: mongoose.model('Feedback', feedbackSchema)
}; 