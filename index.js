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

const handleDeleteContact = () => {
  contacts = deleteContact(contacts, contact.id);
  saveContacts(contacts);
  renderList(contacts);
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
      <button class="delete-btn mx-1 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50">Delete</button>
    </div>
  `;
    li.querySelector(".delete-btn").addEventListener(
      "click",
      handleDeleteContact,
    );
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
  const newContact = Object.fromEntries(formData.entries());
  contacts = addContact(contacts, newContact);
  saveContacts(contacts);
  renderList(contacts);
  contactFormElement.reset();
});
