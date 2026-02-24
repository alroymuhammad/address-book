"use strict";

export const API_URL =
  "https://6995d3a3b081bc23e9c492b5.mockapi.io/api/contacts";

export const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "jobTitle",
  "email",
  "phoneNumber",
  "location",
];

export const saveContacts = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const loadContacts = () => {
  const stored = localStorage.getItem("contacts");
  return stored ? JSON.parse(stored) : [];
};

export const fetchContactsFromAPI = async () => {
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

export const logContacts = (contacts) => {
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

export const isValidContact = (contact) => {
  return REQUIRED_FIELDS.every(
    (field) => Object.keys(contact).includes(field) && contact[field] !== "",
  );
};

export const getNextId = (contacts) => {
  if (contacts.length === 0) return 1;
  return Math.max(...contacts.map((contact) => contact.id)) + 1;
};

export const addContact = (contacts, newContact) => {
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

export const updateContact = (contacts, updatedContact) => {
  return contacts.map((contact) => {
    if (contact.id === updatedContact.id) {
      return { ...contact, ...updatedContact };
    } else {
      return contact;
    }
  });
};

export const deleteContact = (contacts, id) => {
  return contacts.filter((contact) => contact.id !== id);
};

export const searchContacts = (contacts, query) => {
  return contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase()),
  );
};
