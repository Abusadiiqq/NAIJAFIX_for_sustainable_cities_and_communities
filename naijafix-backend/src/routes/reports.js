const express = require('express');
const router = express.Router();
const Report = require('../models/report');

// GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET reports by user
router.get('/user/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const reports = await Report.find({ userid }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new report
router.post('/', async (req, res) => {
  try {
    const { title, description, category, location, userid } = req.body;
    
    // Basic validation
    if (!title || !description || !category || !location || !userid) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const report = await Report.create({
      title,
      description,
      category,
      location,
      userid,
      status: 'pending'
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update report status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE report
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this after your existing routes, before module.exports

// GET statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const pending = await Report.countDocuments({ status: 'pending' });
    const inProgress = await Report.countDocuments({ status: 'in-progress' });
    const resolved = await Report.countDocuments({ status: 'resolved' });
    
    res.json({
      success: true,
      data: {
        total,
        pending,
        inProgress,
        resolved
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;