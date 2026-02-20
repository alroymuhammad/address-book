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
console.log(fetchContactsFromAPI());
