"use strict";
const logContact = (contacts) => {
  if (!Array.isArray(contacts)) {
    console.log("Provide an array of objects data structure");
  } else if (contacts.length === 0) {
    console.log("Your contact is empty");
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
const logContact2 = (contacts) => {
  if (!Array.isArray(contacts)) {
    console.log("Provide an array of objects data structure");
  } else if (contacts.length === 0) {
    console.log("Your contact is empty");
  }
  contacts.forEach((contact) => {
    console.log(
      `${contact.firstName} ${contact.lastName} (${contact.phoneNumber}) ${contact.email} in ${contact.location}`,
    );
  });
};
const listContact = (contacts) => {
  logContact(contacts);
  logContact2(contacts);
};

const contacts = [
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

// console.log(contacts);
listContact(contacts);
