"use strict";

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "jobTitle",
  "email",
  "phoneNumber",
  "location",
];

let contacts = [
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
    console.log(
      "❌ Invalid contact — missing required fields:",
      REQUIRED_FIELDS,
    );
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
      return {
        ...contact,
        ...updatedContact,
      };
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
console.log(contacts);
logContacts(contacts);
contacts = addContact(contacts, {
  id: getNextId(contacts),
  firstName: "Barry",
  lastName: "Allen",
  jobTitle: "The flash",
  email: "barry.allen@theflash.com",
  phoneNumber: "+1278128319",
  location: "Central City",
});
contacts = addContact(contacts, {
  id: getNextId(contacts),
  firstName: "Bruce",
  lastName: "Wayne",
  jobTitle: "The Batman",
  email: "bruce.wayne@enterprise.com",
  phoneNumber: "+1278128319",
  location: "Gotham City",
});

console.log(contacts);
logContacts(contacts);

contacts = updateContact(contacts, {
  id: 2,
  phoneNumber: "+34-999-888-777",
});

logContacts(contacts);

contacts = deleteContact(contacts, 1);
console.log(contacts);
const searchResult = searchContacts(contacts, "jud");
console.log(searchResult);
logContacts(searchResult);
contacts = addContact(contacts, {
  id: getNextId(contacts),
  firstName: "Diana",
  lastName: "Prince",
  jobTitle: "Wonder Woman",
  email: "diana.prince@themyscira.com",
  phoneNumber: "+1278128321",
  location: "Themyscira",
});

console.log(contacts);
