// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const allTasksList = document.getElementById('allTasksList');
const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');
const filterBtns = document.querySelectorAll('.filter-btn');
const tasksSections = document.querySelectorAll('.tasks-section');
const clearAllBtn = document.getElementById('clearAllBtn');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');
const saveEdit = document.getElementById('saveEdit');

// Counters
const allCount = document.getElementById('allCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

// Empty states
const allEmpty = document.getElementById('allEmpty');
const pendingEmpty = document.getElementById('pendingEmpty');
const completedEmpty = document.getElementById('completedEmpty');

// Tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

// Initialize app
init();

function init() {
    renderTasks();
    updateCounts();
    attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterTasks(btn.dataset.filter);
        });
    });

    clearAllBtn.addEventListener('click', clearCompleted);
    closeModal.addEventListener('click', closeEditModal);
    cancelEdit.addEventListener('click', closeEditModal);
    saveEdit.addEventListener('click', saveEditedTask);

    // Close modal on outside click
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        showAlert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();
    updateCounts();
    taskInput.value = '';
    taskInput.focus();

    // Show success animation
    showAlert('Task added successfully!', 'success');
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateCounts();
        showAlert('Task deleted!', 'success');
    }
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toLocaleString() : null;
        saveTasks();
        renderTasks();
        updateCounts();
    }
}

// Open edit modal
function openEditModal(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        editingTaskId = id;
        editInput.value = task.text;
        editModal.classList.add('active');
        editInput.focus();
    }
}

// Close edit modal
function closeEditModal() {
    editModal.classList.remove('active');
    editingTaskId = null;
    editInput.value = '';
}

// Save edited task
function saveEditedTask() {
    const newText = editInput.value.trim();
    
    if (newText === '') {
        showAlert('Task cannot be empty!');
        return;
    }

    const task = tasks.find(task => task.id === editingTaskId);
    if (task) {
        task.text = newText;
        saveTasks();
        renderTasks();
        closeEditModal();
        showAlert('Task updated!', 'success');
    }
}

// Clear completed tasks
function clearCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
        showAlert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${completedTasks.length} completed task(s)?`)) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateCounts();
        showAlert('Completed tasks cleared!', 'success');
    }
}

// Render tasks
function renderTasks() {
    // Clear all lists
    allTasksList.innerHTML = '';
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    if (tasks.length === 0) {
        allEmpty.style.display = 'block';
        pendingEmpty.style.display = 'block';
        completedEmpty.style.display = 'block';
        return;
    }

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    // Show/hide empty states
    allEmpty.style.display = 'none';
    pendingEmpty.style.display = pendingTasks.length === 0 ? 'block' : 'none';
    completedEmpty.style.display = completedTasks.length === 0 ? 'block' : 'none';

    // Render all tasks
    tasks.forEach(task => {
        allTasksList.appendChild(createTaskElement(task));
    });

    // Render pending tasks
    pendingTasks.forEach(task => {
        pendingTasksList.appendChild(createTaskElement(task));
    });

    // Render completed tasks
    completedTasks.forEach(task => {
        completedTasksList.appendChild(createTaskElement(task));
    });
}

// Create task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    const timeText = task.completed && task.completedAt
        ? `Completed: ${task.completedAt}`
        : `Added: ${task.createdAt}`;

    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="toggleTask(${task.id})"
        >
        <div class="task-content">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <span class="task-time"><i class="far fa-clock"></i> ${timeText}</span>
        </div>
        <div class="task-actions">
            <button class="btn-action btn-edit" onclick="openEditModal(${task.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    return li;
}

// Filter tasks
function filterTasks(filter) {
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    // Show/hide sections
    tasksSections.forEach(section => section.classList.remove('active'));
    
    if (filter === 'all') {
        document.getElementById('allTasks').classList.add('active');
    } else if (filter === 'pending') {
        document.getElementById('pendingTasks').classList.add('active');
    } else if (filter === 'completed') {
        document.getElementById('completedTasks').classList.add('active');
    }
}

// Update counts
function updateCounts() {
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;

    allCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show alert (simple notification)
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.textContent = message;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#28a745' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;

    document.body.appendChild(alert);

    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);