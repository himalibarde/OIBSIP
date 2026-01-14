## TODO Web App - Task Manager

A fully functional and interactive TODO web application that helps users manage their daily tasks efficiently with a clean and modern interface.

## 📋 Project Overview

The TODO app allows users to add, edit, delete, and organize their tasks with features like marking tasks as complete, filtering by status, and persistent storage using localStorage.

## 🎯 Objective

To develop a comprehensive task management web application that:
- Allows users to add and manage daily tasks
- Enables marking tasks as complete or incomplete
- Provides separate views for All, Pending, and Completed tasks
- Supports editing and deleting tasks
- Displays timestamps for task creation and completion
- Persists data using browser's localStorage

## ✨ Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with a simple input field
- ✅ **Mark Complete**: Check/uncheck tasks to mark them as completed
- ✅ **Edit Tasks**: Modify existing task text through a modal interface
- ✅ **Delete Tasks**: Remove individual tasks with confirmation
- ✅ **Clear Completed**: Bulk delete all completed tasks at once

### Task Organization
- 📝 **All Tasks**: View complete list of all tasks
- ⏳ **Pending Tasks**: Filter to show only incomplete tasks
- ✓ **Completed Tasks**: View all finished tasks separately
- 🔢 **Task Counters**: Real-time count of tasks in each category

### Additional Features
- 🕒 **Timestamps**: 
  - Display date and time when task was added
  - Show completion time for finished tasks
- 💾 **LocalStorage**: Tasks persist even after browser refresh
- 🎨 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Smooth Animations**: Enhanced user experience with CSS animations
- 🔔 **Notifications**: Success/error alerts for user actions
- 🎯 **Empty States**: Friendly messages when no tasks exist

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: 
  - Flexbox for layouts
  - CSS Grid for task cards
  - CSS animations and transitions
  - Custom modal styling
  - Responsive media queries
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event handling
  - LocalStorage API
  - Array methods (filter, map, find)
  - Template literals
  - Arrow functions

## 📁 Project Structure
```
Task-3-TODO-App/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # JavaScript functionality and logic
└── README.md           # Project documentation
```

## 💡 How to Use

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" button or press Enter
3. Task appears in the list with current timestamp

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the yellow edit icon to modify task text
- **Delete**: Click the red delete icon to remove task

### Filtering Tasks
- Click **All Tasks** to view everything
- Click **Pending** to see incomplete tasks only
- Click **Completed** to view finished tasks

### Clearing Tasks
- Use "Clear All Completed Tasks" button to remove all finished tasks at once



**Happy Task Managing! 📝✅**