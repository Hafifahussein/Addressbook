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
        this.saveToLocalStorage();
        return this.contacts.length;
    },
    
    deleteContact: function(index) {
        if (index < 0 || index >= this.contacts.length) {
            throw new Error("Invalid index");
        }
        const deleted = this.contacts.splice(index, 1)[0];
        this.saveToLocalStorage();
        return deleted;
    },
    
    toggleFavorite: function(index) {
        if (index < 0 || index >= this.contacts.length) {
            throw new Error("Invalid index");
        }
        this.contacts[index].isFavorite = !this.contacts[index].isFavorite;
        this.saveToLocalStorage();
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