"use strict";
const logContact = (contacts) => {
  if (!Array.isArray(contacts)) {
    console.log("Provide an array of objects data structure");
    return;
  } else if (contacts.length === 0) {
    console.log("Your contact is empty");
    return;
  }
  contacts.forEach((contact) => {
    console.log(
      contact.firstName +
      " " +
      contact.lastName +
      ", " +
      contact.phoneNumber +
      ", " +
      contact.email,
    );
  });
};

const listContact = (contacts) => {
  logContact(contacts);
};
const addContact = (contacts, updatedContact) => {
  return [...contacts, updatedContact];
};

const updateContact = (contacts, updatedContact) => {
  return contacts.map((contact) => {
    if (contact.id === updatedContact.id) {
      return {
        ...contact,
        ...updatedContact
      };
    } else {
      return contact;
    }
  });
}

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
console.log(contacts);
listContact(contacts);
contacts = addContact(contacts, {
  id: 3,
  firstName: "Barry",
  lastName: "Allen",
  jobTitle: "The flash",
  email: "barry.allen@theflash.com",
  phoneNumber: "+1278128319",
  location: "Gotham",
});
console.log(contacts);
listContact(contacts);
contacts = updateContact(contacts, {
  id: 2,
  phoneNumber: "+34-999-888-777"
});
listContact(contacts);