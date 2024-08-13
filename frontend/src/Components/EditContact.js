// src/Components/EditContact.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EditContact = ({ contact, onClose }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [description, setDescription] = useState(contact.description);
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(contact.name);
    setEmail(contact.email);
    setDescription(contact.description);
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'http://localhost:3003/api/contacts/' + contact._id,
      {
        method: 'PUT',
        body: JSON.stringify({ name, email, description }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const resp = await response.json();
    console.log(resp);
    if (resp.success === true) {
      onClose();
    } else {
      console.log('ddddd', resp.message);
      setError(resp.message);
    }
  };

  return (
    <Modal title="Edit Contact" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {error != null && (
          <div className="mb-3">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="tel"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="tel"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          <i className="fas fa-save"></i> Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EditContact;
