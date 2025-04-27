const App = {
    addressBook: new AddressBook(),
    placesTracker: new PlacesTracker(),
    toDoList: new ToDoList(),
    
    init: function() {
        this.addressBook.loadFromLocalStorage();
        this.placesTracker.loadFromLocalStorage();
        this.toDoList.loadFromLocalStorage();
        
        this.initAddressBook();
        this.initPlacesTracker();
        this.initToDoList();
    },
    
    initAddressBook: function() {
        this.renderContacts();
        
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            
            const newContact = new Contact(name, email, phone, address);
            this.addressBook.addContact(newContact);
            this.renderContacts();
            e.target.reset();
        });
        
        document.getElementById('contact-search').addEventListener('input', (e) => {
            const term = e.target.value.trim();
            if (term === '') {
                this.renderContacts();
            } else {
                const results = this.addressBook.searchContacts(term);
                this.renderContacts(results);
            }
        });
    },
    
    renderContacts: function(contacts = this.addressBook.contacts) {
        const container = document.getElementById('contacts-list');
        container.innerHTML = '';
        
        if (contacts.length === 0) {
            container.innerHTML = '<p>No contacts found</p>';
            return;
        }
        
        contacts.forEach((contact, index) => {
            const card = document.createElement('div');
            card.className = `contact-card ${contact.isFavorite ? 'favorite' : ''}`;
            card.innerHTML = `
                <h3>${contact.name}</h3>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Address:</strong> ${contact.address}</p>
                <p><small>Added: ${contact.createdAt.toLocaleDateString()}</small></p>
                <div class="contact-actions">
                    <button class="favorite-btn" data-id="${index}">
                        ${contact.isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                    </button>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });
        
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-id');
                this.addressBook.toggleFavorite(index);
                this.renderContacts();
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-id');
                this.addressBook.deleteContact(index);
                this.renderContacts();
            });
        });
    },
    
    initPlacesTracker: function() {
        this.renderPlaces();
        
        document.getElementById('place-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const location = document.getElementById('location').value;
            const landmarks = document.getElementById('landmarks').value;
            const timeOfYear = document.getElementById('time-of-year').value;
            const notes = document.getElementById('notes').value;
            
            const newPlace = new Place(location, landmarks, timeOfYear, notes);
            this.placesTracker.addPlace(newPlace);
            this.renderPlaces();
            e.target.reset();
        });
    },
    
    renderPlaces: function(places = this.placesTracker.places) {
        const container = document.getElementById('places-list');
        container.innerHTML = '';
        
        if (places.length === 0) {
            container.innerHTML = '<p>No places added yet</p>';
            return;
        }
        
        places.forEach((place, index) => {
            const card = document.createElement('div');
            card.className = 'place-card';
            card.innerHTML = `
                <h3>${place.location}</h3>
                <p class="place-time">Visited: ${place.timeOfYear}</p>
                ${place.landmarks.length > 0 ? 
                    `<p class="place-landmarks"><strong>Landmarks:</strong> ${place.landmarks.join(', ')}</p>` : ''}
                ${place.notes ? `<p><strong>Notes:</strong> ${place.notes}</p>` : ''}
                <p><small>Added: ${place.visitedAt.toLocaleDateString()}</small></p>
                <button class="delete-btn" data-id="${index}">Delete</button>
            `;
            container.appendChild(card);
        });
        
        document.querySelectorAll('#places-list .delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-id');
                this.placesTracker.deletePlace(index);
                this.renderPlaces();
            });
        });
    },
    
    initToDoList: function() {
        this.renderTasks();
        
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const taskInput = document.getElementById('task-input');
            const newTask = new Task(taskInput.value);
            this.toDoList.addTask(newTask);
            this.renderTasks();
            taskInput.value = '';
        });
    },
    
    renderTasks: function(tasks = this.toDoList.tasks) {
        const container = document.getElementById('tasks-container');
        container.innerHTML = '';
        
        if (tasks.length === 0) {
            container.innerHTML = '<p>No tasks yet. Add one above!</p>';
            return;
        }
        
        tasks.forEach(task => {
            const item = document.createElement('li');
            item.className = `task-item ${task.completed ? 'completed' : ''}`;
            item.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span>${task.description}</span>
                <button class="task-remove" data-id="${task.id}">×</button>
            `;
            container.appendChild(item);
        });
        
        document.querySelectorAll('#tasks-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                this.toDoList.toggleTaskCompletion(id);
                this.renderTasks();
            });
        });
        
        document.querySelectorAll('.task-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.toDoList.deleteTask(id);
                this.renderTasks();
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
