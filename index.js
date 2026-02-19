"use strict";

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

const addContact = (contacts, updatedContact) => {
  return [...contacts, updatedContact];
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
  id: 3,
  firstName: "Barry",
  lastName: "Allen",
  jobTitle: "The flash",
  email: "barry.allen@theflash.com",
  phoneNumber: "+1278128319",
  location: "Central City",
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
