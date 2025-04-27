# Addressbook  
#### Add, manage, and organize your contacts, last updated April 27, 2025  
#### By **Hafifa Hussein**

## Description  
Addressbook is a simple, user-friendly web application that allows users to manage their contacts. With this app, users can add new contacts including name, email, phone, and address, and easily mark their contacts as favorites. The app provides a search functionality to quickly find any contact, and users can delete contacts when no longer needed. The app utilizes localStorage to persist data, ensuring that the contact information remains even after closing the browser. Addressbook is designed for anyone who needs to keep track of their contacts and access them quickly and easily.
Features
- Add new contacts with name, email, phone, and address
- Mark contacts as favorites
- Search through contacts
- Delete contacts
- Persistent storage using localStorage

## Setup/Installation Requirements  
1. Clone the repository:  
   `git clone https://github.com/Hafifahussein/Addressbook.git`
2. Navigate to the project directory:  
   `cd Addressbook`
3. Open the `index.html` file in your browser to start using the application.

No server or additional dependencies are required for basic functionality, as data is stored locally in the browser using `localStorage`.

## Known Bugs  
* No known bugs at this time.

## Technologies Used  
* JavaScript  
* HTML  
* CSS  
## Business Logic Tests

### Contact Constructor Tests
1. **Creates contact with correct properties**
   - Input: `new Contact("John", "john@test.com", "1234567890", "123 Main St")`
   - Expected: Object with name, email, phone, address properties
   - Test: `console.assert(contact.name === "John" && contact.email === "john@test.com")`

2. **Initializes with isFavorite as false**
   - Expected: `contact.isFavorite === false`

### AddressBook Tests
1. **Adds contact to address book**
   - Input: `addressBook.addContact(contact)`
   - Expected: `addressBook.contacts.length === 1`
   - Test: `console.assert(addressBook.contacts.length === 1)`

2. **Toggles favorite status**
   - Input: `addressBook.toggleFavorite(0)`
   - Expected: `contact.isFavorite === true` (toggles from initial false)
   - Test: `console.assert(addressBook.contacts[0].isFavorite === true)`

3. **Deletes contact**
   - Input: `addressBook.deleteContact(0)`
   - Expected: `addressBook.contacts.length === 0`
   - Test: `console.assert(addressBook.contacts.length === 0)`

4. **Searches contacts**
   - Setup: Add multiple contacts
   - Input: `addressBook.searchContacts("john")`
   - Expected: Array containing only matching contacts
   - Test: `console.assert(results.length === 1 && results[0].name === "John")`

## Peer Code Review Checklist
- [x] JavaScript objects drive application logic
- [x] Constructors and prototypes used successfully
- [x] Pseudo-coded tests present in README
- [x] Application works as expected

## Support and Contact Details  
If you have any issues, questions, or suggestions, feel free to contact me at https://github.com/Hafifahussein/Addressbook.git or open an issue on the GitHub repository.

## License  
*MIT License*  
Copyright (c) 2025 **Hafifa Hussein**

---
