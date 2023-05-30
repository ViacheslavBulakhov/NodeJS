const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("db/contacts.json");


 async function listContacts() {
   const contacts = await fs.readFile(contactsPath)
   return JSON.parse(contacts);
  }
  
 async function getContactById(contactId) {
    const contacts = await listContacts();

    const contact = contacts.find(item => item.id === contactId); 
    return contact || null
  }
  
 async function removeContact(contactId) {
    const contacts = await listContacts();
    
    const removedContact = contacts.findIndex((contact) => contact.id === contactId)
    if( removedContact === -1) return null
    

    const newListContacts = contacts.filter(contact => contact.id !== contactId.toString())
    await fs.writeFile(contactsPath,JSON.stringify(newListContacts,null,2))

    return contacts[removedContact]
  }
  
 async function addContact(contact) {
   const contacts = await listContacts();

   const newContact= {id:uuidv4(),...contact}

   contacts.push(newContact)

   await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))

   return newContact
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };