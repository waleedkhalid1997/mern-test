// src/Components/ContactList.js
import React from 'react';

const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Contact List</h2>
      <ul className="list-group">
        {contacts.map((contact, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <b>Name: </b>
              <strong>{contact.name}</strong>
              <div className="text-muted">
                <b>Email: </b>
                {contact.email}
              </div>
              <div className="text-muted">
                <b>Description: </b>
                {contact.description}
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(contact)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(contact._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
