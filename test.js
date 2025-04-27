function runTests() {
    let testPassed = 0;
    let testFailed = 0;
    
    function assert(condition, message) {
        if (condition) {
            testPassed++;
            console.log(`✓ PASS: ${message}`);
        } else {
            testFailed++;
            console.error(`✗ FAIL: ${message}`);
        }
    }
    
    console.log("Running Address Book Tests...");

    const testContact = new Contact("John Doe", "john@test.com", "1234567890", "123 Main St");
    assert(testContact.name === "John Doe", "Contact should store name");
    assert(testContact.email === "john@test.com", "Contact should store email");
    assert(testContact.phone === "1234567890", "Contact should store phone");
    assert(testContact.address === "123 Main St", "Contact should store address");
    assert(testContact.isFavorite === false, "Contact should initialize as not favorite");
    
    const testBook = new AddressBook();
    const initialCount = testBook.contacts.length;
    testBook.addContact(testContact);
    assert(testBook.contacts.length === initialCount + 1, "AddressBook should add contact");
    assert(testBook.contacts[0] === testContact, "AddressBook should store the contact");
    
    const initialFavoriteStatus = testContact.isFavorite;
    testBook.toggleFavorite(0);
    assert(testContact.isFavorite !== initialFavoriteStatus, "AddressBook should toggle favorite status");
    
    const deletedContact = testBook.deleteContact(0);
    assert(deletedContact === testContact, "AddressBook should return deleted contact");
    assert(testBook.contacts.length === initialCount, "AddressBook should remove contact");
    
    testBook.addContact(new Contact("Alice", "alice@test.com", "555-1234", "456 Oak St"));
    testBook.addContact(new Contact("Bob", "bob@test.com", "555-5678", "789 Pine St"));
    const searchResults = testBook.searchContacts("alice");
    assert(searchResults.length === 1, "AddressBook should find matching contacts");
    assert(searchResults[0].name === "Alice", "AddressBook should return correct contact");
    
    console.log(`\nTest Results: ${testPassed} passed, ${testFailed} failed`);
    if (testFailed === 0) {
        console.log("✅ All tests passed successfully!");
    } else {
        console.log("❌ Some tests failed");
    }
}

document.addEventListener('DOMContentLoaded', runTests);