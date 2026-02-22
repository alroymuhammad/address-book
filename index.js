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

<<<<<<< HEAD
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
=======
const isValidContact = (contact) => {
  return REQUIRED_FIELDS.every(
    (field) => Object.keys(contact).includes(field) && contact[field] !== "",
  );
};

const getNextId = (contacts) => {
  if (contacts.length === 0) return 1;
  return Math.max(...contacts.map((contact) => contact.id)) + 1;
};

const addContact = (contacts, newContact) => {
  if (!isValidContact(newContact)) {
    console.log("Invalid contact — missing required fields:", REQUIRED_FIELDS);
    return contacts;
  }
  return [
    ...contacts,
    {
      ...newContact,
      id: getNextId(contacts),
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];
};

const updateContact = (contacts, updatedContact) => {
  return contacts.map((contact) => {
    if (contact.id === updatedContact.id) {
      return { ...contact, ...updatedContact };
    } else {
      return contact;
    }
  });
};

const deleteContact = (contacts, id) => {
  return contacts.filter((contact) => contact.id !== id);
};

const searchContacts = (contacts, query) => {
  return contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase()),
  );
};
const render = (contact) => {
  const element = document.createElement("p");
  element.innerHTML = `${contact.firstName} ${contact.lastName}`;
  const divContainer = document.getElementById("container");
  divContainer.appendChild(element);
}
let contacts = loadContacts();
contacts = addContact(contacts, {
  firstName: "Barry",
  lastName: "Allen",
  jobTitle: "The Flash",
  email: "barry.allen@theflash.com",
  phoneNumber: "+1278128319",
  location: "Central City",
});
saveContacts(contacts);

contacts = addContact(contacts, {
  firstName: "Bruce",
  lastName: "Wayne",
  jobTitle: "The Batman",
  email: "bruce.wayne@enterprise.com",
  phoneNumber: "+1278128319",
  location: "Gotham City",
});
saveContacts(contacts);
logContacts(contacts);

contacts = updateContact(contacts, {
  id: 2,
  phoneNumber: "+34-999-888-777",
});
saveContacts(contacts);
logContacts(contacts);

contacts = deleteContact(contacts, 1);
saveContacts(contacts);

const searchResult = searchContacts(contacts, "jud");
logContacts(searchResult);
contacts = addContact(contacts, {
  firstName: "Invalid",
  lastName: "",
});

contacts = addContact(contacts, {
  firstName: "Diana",
  lastName: "Prince",
  jobTitle: "Wonder Woman",
  email: "diana.prince@themyscira.com",
  phoneNumber: "+1278128321",
  location: "Themyscira",
});
saveContacts(contacts);

console.log(contacts);
fetchContactsFromAPI();

contacts.forEach((contact) => render(contact));
>>>>>>> 62a0955 (feat: dom experimentation)
