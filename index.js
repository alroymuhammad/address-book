import {
  loadContacts,
  saveContacts,
  fetchContactsFromAPI,
  addContact,
  deleteContact,
  searchContacts,
} from "./contact.js";

const formElement = document.getElementById("search");
const listElement = document.getElementById("contacts-list");
const contactFormElement = document.getElementById("contact-form");

let editingContactId = null;

const resetFormState = () => {
  contactFormElement.reset();
  editingContactId = null;
};

const handleDeleteContact = (contact) => () => {
  contacts = deleteContact(contacts, contact.id);
  saveContacts(contacts);
  renderList(contacts);
  if (editingContactId === contact.id) {
    resetFormState();
  }
};

const handleEditContact = (contact) => () => {
  document.getElementById("first-name").value = contact.firstName;
  document.getElementById("last-name").value = contact.lastName;
  document.getElementById("job-title").value = contact.jobTitle;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone-number").value = contact.phoneNumber;
  document.getElementById("location").value = contact.location;
  editingContactId = contact.id;
};

const renderList = (contactsList) => {
  listElement.innerHTML = "";
  if (contactsList.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results.";
    listElement.appendChild(li);
    return;
  }

  const renderContact = (contact) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="bg-white rounded-2xl shadow-md p-4 my-2 max-w-sm">
      <div class="font-semibold text-lg">${contact.firstName} ${contact.lastName}</div>
      <div class="text-sm text-gray-600">${contact.jobTitle}</div>
      <div class="text-sm text-gray-600">${contact.email}</div>
      <div class="text-sm text-gray-600">${contact.phoneNumber}</div>
      <div class="text-sm text-gray-600 mb-3">${contact.location}</div> 
      <button class="edit-btn mx-1 px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">Edit</button>
      <button class="delete-btn mx-1 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50">Delete</button>
    </div>
  `;

    li.querySelector(".edit-btn").addEventListener("click", handleEditContact(contact));
    li.querySelector(".delete-btn").addEventListener("click", handleDeleteContact(contact));

    return li;
  };

  contactsList.forEach((contact) => {
    listElement.appendChild(renderContact(contact));
  });
};

let contacts = loadContacts();
fetchContactsFromAPI();
renderList(contacts);

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.target.search.value;
  const results = searchContacts(contacts, query);
  renderList(results);
});

contactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactFormElement);
  const contactData = Object.fromEntries(formData.entries());

  if (editingContactId !== null) {
    const updatedContact = { ...contactData, id: editingContactId };
    contacts = contacts.map(contact => contact.id === editingContactId ? updatedContact : contact);

  } else {
    contacts = addContact(contacts, contactData);
  }

  saveContacts(contacts);
  renderList(contacts);
  resetFormState();
});