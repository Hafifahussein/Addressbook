function Task(description) {
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
    this.id = Date.now().toString();
}

function ToDoList() {
    this.tasks = [];
}

ToDoList.prototype = {
    addTask: function(task) {
        if (!(task instanceof Task)) {
            throw new Error("Can only add Task objects");
        }
        this.tasks.push(task);
        this.saveToLocalStorage();
        return this.tasks.length;
    },
    
    deleteTask: function(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            throw new Error("Task not found");
        }
        const deleted = this.tasks.splice(index, 1)[0];
        this.saveToLocalStorage();
        return deleted;
    },
    
    toggleTaskCompletion: function(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new Error("Task not found");
        }
        task.completed = !task.completed;
        this.saveToLocalStorage();
        return task.completed;
    },
    
    clearCompleted: function() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveToLocalStorage();
        return this.tasks.length;
    },
    
    saveToLocalStorage: function() {
        localStorage.setItem('toDoList', JSON.stringify(this.tasks));
    },
    
    loadFromLocalStorage: function() {
        const stored = localStorage.getItem('toDoList');
        if (stored) {
            const parsed = JSON.parse(stored);
            this.tasks = parsed.map(taskData => {
                const task = new Task(taskData.description);
                task.completed = taskData.completed;
                task.createdAt = new Date(taskData.createdAt);
                task.id = taskData.id;
                return task;
            });
        }
    }
};