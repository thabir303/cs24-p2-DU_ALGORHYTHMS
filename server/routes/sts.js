const express = require('express');
const router = express.Router();
const STS = require('../models/sts');
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token || '';
  try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      if (decoded.roleId !== 1) {
          return res.status(403).json({ message: "Access denied. Not an admin." });
      }
      req.user = decoded;
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Route to create a new STS
router.post('/', async (req, res) => {
  try {
    // Extracting data from the request body
    const { wardNumber, capacity, locationId, longitude, latitude } = req.body;

    // Creating a new STS instance
    const newSTS = new STS({
      wardNumber,
      capacity,
      locationId,
      longitude,
      latitude
    });

    // Saving the new STS instance to the database
    const savedSTS = await newSTS.save();

    // Responding with the saved STS data
    res.status(201).json(savedSTS);
  } catch (error) {
    // Handling errors
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    // Fetching all STS instances from the database
    const stsInstances = await STS.find();

    // Responding with the fetched STS instances
    res.status(200).json(stsInstances);
  } catch (error) {
    // Handling errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;