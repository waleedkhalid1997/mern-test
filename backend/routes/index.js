var express = require('express');
var router = express.Router();
const ContactModel = require('../models/contact');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET list of contacts. */
router.get('/contacts', async function (req, res, next) {
  let response = await ContactModel.find();
  if (response) {
    res.json({ success: true, data: response });
  } else {
    res.json({ success: false, message: 'Some thing went wrong!' });
  }
});
/* POST add new contact. */
router.post('/contacts', async function (req, res, next) {
  const contact = req.body;
  if (
    typeof contact.name != 'undefined' &&
    contact.name != null &&
    typeof contact.email != 'undefined' &&
    contact.email != null
  ) {
    try {
      let response = await ContactModel.create(contact);
      if (response) {
        res.json({ success: true, message: 'Contact added successfully!' });
      } else {
        res.json({ success: false, message: 'Something went wrong!' });
      }
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  } else {
    res.json({
      success: false,
      message:
        'Please make sure you have entered correct values of name and email!',
    });
  }
});
/* PUT update contact. */
router.put('/contacts/:id', async function (req, res, next) {
  const contact = req.body;
  try {
    let response = await ContactModel.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: { ...contact } }
    );
    if (response) {
      res.json({ success: true, message: 'Contact updated successfully!' });
    } else {
      res.json({ success: false, message: 'Something went wrong!' });
    }
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});
/* DELETE contact. */
router.delete('/contacts/:id', async function (req, res, next) {
  try {
    let response = await ContactModel.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    if (response) {
      res.json({ success: true, message: 'Contact deleted successfully!' });
    } else {
      res.json({ success: false, message: 'Something went wrong!' });
    }
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

module.exports = router;
