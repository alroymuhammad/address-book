"use strict";

import {
  loadContacts,
  saveContacts,
  fetchContactsFromAPI,
  addContact,
  deleteContact,
  searchContacts,
} from "./contact.js";

const formElement = document.getElementById("search");
const inputElement = document.getElementById("search-input");
const listElement = document.getElementById("contacts-list");
const contactFormElement = document.getElementById("contact-form");

const renderList = (contactsList) => {
  listElement.innerHTML = "";

  if (!Array.isArray(contactsList) || contactsList.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results.";
    listElement.appendChild(li);
    return;
  }

  contactsList.forEach((contact) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="font-semibold">${contact.firstName} ${contact.lastName}</div>
    <div class="text-sm">${contact.jobTitle}</div>
    <div class="text-sm">${contact.email}</div>
    <div class="text-sm">${contact.phoneNumber}</div>
    <div class="text-sm">${contact.location}</div>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
    li.querySelector(".delete-btn").addEventListener("click", () => {
      contacts = deleteContact(contacts, contact.id);
      saveContacts(contacts);
      renderList(contacts);
    });

    li.querySelector(".edit-btn").addEventListener("click", () => {
      console.log("Edit:", contact);
    });

    listElement.appendChild(li);
  });
};

let contacts = loadContacts();
fetchContactsFromAPI();
renderList(contacts);

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = inputElement.value;
  const results = searchContacts(contacts, query);
  renderList(results);
});

contactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactFormElement);
  const newContact = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    jobTitle: formData.get("jobTitle"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    location: formData.get("location"),
  };
  contacts = addContact(contacts, newContact);
  saveContacts(contacts);
  renderList(contacts);
  contactFormElement.reset();
});
