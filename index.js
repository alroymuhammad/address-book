"use strict";
const API_URL = "https://6995d3a3b081bc23e9c492b5.mockapi.io/api/contacts";

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "jobTitle",
  "email",
  "phoneNumber",
  "location",
];

const defaultContacts = [
  {
    id: 1,
    firstName: "Steve",
    lastName: "Jobs",
    jobTitle: "CEO",
    email: "stevejobs@apple.com",
    phoneNumber: "+1278128318",
    location: "San Francisco",
  },
  {
    id: 2,
    firstName: "Jude",
    lastName: "Bellingham",
    jobTitle: "Midfielder",
    email: "jude.bellingham@realmadrid.com",
    phoneNumber: "+1278128319",
    location: "Madrid",
  },
];

// TODO: modularize the files
const saveContacts = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const loadContacts = () => {
  const stored = localStorage.getItem("contacts");
  return stored ? JSON.parse(stored) : defaultContacts;
};
const fetchContactsFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("✅ Loaded from API:", data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
const logContacts = (contacts) => {
  if (!Array.isArray(contacts)) {
    console.log("Provide an array of objects data structure");
    return;
  } else if (contacts.length === 0) {
    console.log("Your contact is empty");
    return;
  }
  contacts.forEach((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    console.log(
      `${fullName} | ${contact.jobTitle} | ${contact.phoneNumber} | ${contact.email}`,
    );
  });
};

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
const containerElement = document.getElementById("container");
const formElement = document.getElementById("search");
const inputElement = document.getElementById("search-input");
const listElement = document.getElementById("contacts-list");

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
    `;

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
