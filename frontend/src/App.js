// src/App.js
import React, { useEffect, useState } from 'react';
import ContactList from './Components/ContactList';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:3003/api/contacts', {
      method: 'GET',
    });
    const resp = await response.json();
    console.log(resp);
    if (resp.success) {
      setContacts(resp.data);
    } else {
      setError(resp.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const response = await fetch('http://localhost:3003/api/contacts/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const resp = await response.json();
    console.log(resp);
    if (resp.success === true) {
      await fetchContacts();
    } else {
      console.log('ddddd', resp.message);
      setError(resp.message);
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Contacts Manager</h1>
      {error != null && (
        <div className="mb-3">
          <div className="alert alert-danger">{{ error }}</div>
        </div>
      )}
      <button
        className="float-right btn btn-primary my-3"
        onClick={() => setShowAddModal(true)}
      >
        Add Contact
      </button>
      <ContactList
        contacts={contacts}
        onDelete={deleteContact}
        onEdit={handleEdit}
      />
      {showAddModal && (
        <AddContact
          onClose={() => {
            setShowAddModal(false);
            fetchContacts();
          }}
        />
      )}
      {showEditModal && (
        <EditContact
          contact={editContact}
          onClose={() => {
            setShowEditModal(false);
            fetchContacts();
          }}
        />
      )}
    </div>
  );
};

export default App;
