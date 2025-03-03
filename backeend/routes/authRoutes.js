const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/ticket');

// CREATE TICKET
router.post('/tickets', auth, async (req, res) => {
  try {
    const ticket = new Ticket({ title: req.body.title, status: 'open', createdBy: req.user.userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL TICKETS
router.get('/tickets', auth, async (req, res) => {
  try {
    const tickets = req.user.role === 'admin' ? await Ticket.find() : await Ticket.find({ createdBy: req.user.userId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TICKET STATUS
router.put('/tickets/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden: Admins only' });
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedTicket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
