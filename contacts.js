const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const contact = contacts.find(item => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const removedContact = contacts.findIndex(
      contact => contact.id === contactId
    );
    if (removedContact === -1) return null;

    const newListContacts = contacts.filter(
      contact => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2));

    return contacts[removedContact];
  } catch (error) {
    console.log(error);
  }
}

async function addContact(contact) {
  try {
    const contacts = await listContacts();

    const newContact = { id: uuidv4(), ...contact };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
