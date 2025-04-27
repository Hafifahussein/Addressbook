function Contact(name, email, phone, address) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.isFavorite = false;
    this.createdAt = new Date();
}

function AddressBook() {
    this.contacts = [];
}

AddressBook.prototype = {
    addContact: function(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Can only add Contact objects");
        }
        this.contacts.push(contact);
        return this.contacts.length;
    },
    
    deleteContact: function(index) {
        if (index < 0 || index >= this.contacts.length) {
            throw new Error("Invalid index");
        }
        return this.contacts.splice(index, 1)[0];
    },
    
    toggleFavorite: function(index) {
        if (index < 0 || index >= this.contacts.length) {
            throw new Error("Invalid index");
        }
        this.contacts[index].isFavorite = !this.contacts[index].isFavorite;
        return this.contacts[index].isFavorite;
    },
    
    searchContacts: function(term) {
        const lowerTerm = term.toLowerCase();
        return this.contacts.filter(contact => 
            contact.name.toLowerCase().includes(lowerTerm) ||
            contact.email.toLowerCase().includes(lowerTerm) ||
            contact.phone.toLowerCase().includes(lowerTerm) ||
            contact.address.toLowerCase().includes(lowerTerm)
        );
    },
    
    getFavorites: function() {
        return this.contacts.filter(contact => contact.isFavorite);
    },
    
    saveToLocalStorage: function() {
        localStorage.setItem('addressBook', JSON.stringify(this.contacts));
    },
    
    loadFromLocalStorage: function() {
        const stored = localStorage.getItem('addressBook');
        if (stored) {
            const parsed = JSON.parse(stored);
            this.contacts = parsed.map(contactData => {
                const contact = new Contact(
                    contactData.name,
                    contactData.email,
                    contactData.phone,
                    contactData.address
                );
                contact.isFavorite = contactData.isFavorite;
                contact.createdAt = new Date(contactData.createdAt);
                return contact;
            });
        }
    }
};

const UI = {
    addressBook: new AddressBook(),
    
    init: function() {
        this.addressBook.loadFromLocalStorage();
        this.renderContacts();
        
        document.getElementById('contact-form').addEventListener('submit', (e) => this.handleAddContact(e));
        document.getElementById('search').addEventListener('input', (e) => this.handleSearch(e));
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
                    <button class="favorite-btn" data-index="${index}">
                        ${contact.isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                    </button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });
        
        this.addEventListeners();
    },
    
    addEventListeners: function() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                this.addressBook.toggleFavorite(index);
                this.addressBook.saveToLocalStorage();
                this.renderContacts();
            });
        });
        
        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                this.addressBook.deleteContact(index);
                this.addressBook.saveToLocalStorage();
                this.renderContacts();
            });
        });
    },
    
    handleAddContact: function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        const newContact = new Contact(name, email, phone, address);
        this.addressBook.addContact(newContact);
        this.addressBook.saveToLocalStorage();
        
        this.renderContacts();
        e.target.reset();
    },
    
    handleSearch: function(e) {
        const term = e.target.value.trim();
        if (term === '') {
            this.renderContacts();
        } else {
            const results = this.addressBook.searchContacts(term);
            this.renderContacts(results);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('tasklist');

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };

    li.onclick = function(event) {
        if (event.target !== deleteBtn) { 
            li.classList.toggle('completed');
        }
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
}
