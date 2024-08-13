// src/Components/AddContact.js
import React, { useState } from 'react';
import Modal from './Modal';

const AddContact = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3003/api/contacts', {
      method: 'POST',
      body: JSON.stringify({ name, email, description }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const resp = await response.json();
    console.log(resp);
    if (resp.success === true) {
      setName('');
      setEmail('');
      onClose();
    } else {
      console.log('ddddd', resp.message);
      setError(resp.message);
    }
  };

  return (
    <Modal title="Add Contact" onClose={onClose}>
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
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add
        </button>
      </form>
    </Modal>
  );
};

export default AddContact;
