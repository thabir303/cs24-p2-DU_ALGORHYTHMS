const express = require('express');
const router = express.Router();
const cors = require('cors'); // Import the cors middleware

const Bill = require('../models/bill'); // Adjust the path as necessary

router.use(cors());

// POST method to create a new bill
router.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    const savedBill = await bill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET method to retrieve all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET method to retrieve a specific bill by billId
router.get('/:billId', async (req, res) => {
  try {
    const { billId } = req.params;
    const bill = await Bill.findOne({ billId: billId });
    if (bill) {
      res.json(bill);
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;