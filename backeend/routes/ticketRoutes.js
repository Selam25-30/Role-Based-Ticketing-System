const express = require('express');
const Ticket = require('../models/ticket'); // Import Ticket model

const router = express.Router(); // Create an Express router

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new ticket
// POST /tickets
router.post('/', async (req, res) => {
    try {
      const ticket = new Ticket(req.body);
      await ticket.save();
      res.status(201).json(ticket);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// GET /tickets/:id
router.get('/:id', async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // PUT /tickets/:id
  router.put('/:id', async (req, res) => {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
      );
      if (!updatedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(updatedTicket);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE /tickets/:id
  router.delete('/:id', async (req, res) => {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
      if (!deletedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json({ message: 'Ticket deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
