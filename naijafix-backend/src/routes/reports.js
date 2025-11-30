const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Report = require('../models/report');

// GET all reports with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, category, state, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (state) filter['location.state'] = state;

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Report.countDocuments(filter);

    res.json({
      success: true,
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GET single report by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid report ID format' 
      });
    }

    const report = await Report.findById(id);
    
    if (!report) {
      return res.status(404).json({ 
        success: false,
        error: 'Report not found' 
      });
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GET reports by user
router.get('/user/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reports = await Report.find({ userid })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Report.countDocuments({ userid });

    res.json({
      success: true,
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// POST create new report
router.post('/', async (req, res) => {
  try {
    const { title, description, category, location, userid, priority = 'medium' } = req.body;
    
    // Enhanced validation
    if (!title || !description || !category || !location || !userid) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required: title, description, category, location, userid' 
      });
    }

    // Validate location structure
    if (!location.area || !location.state) {
      return res.status(400).json({
        success: false,
        error: 'Location must include area and state'
      });
    }

    const report = await Report.create({
      title,
      description,
      category,
      location,
      userid,
      priority,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: report,
      message: 'Report created successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// PUT update report (full update)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid report ID format' 
      });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ 
        success: false,
        error: 'Report not found' 
      });
    }

    res.json({
      success: true,
      data: updatedReport,
      message: 'Report updated successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// PATCH update report status only
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid report ID format' 
      });
    }

    const validStatuses = ['pending', 'in-progress', 'resolved'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Valid status required: pending, in-progress, or resolved'
      });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ 
        success: false,
        error: 'Report not found' 
      });
    }

    res.json({
      success: true,
      data: updatedReport,
      message: `Report status updated to ${status}`
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// DELETE report
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid report ID format' 
      });
    }

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ 
        success: false,
        error: 'Report not found' 
      });
    }

    res.json({
      success: true,
      message: 'Report deleted successfully',
      data: { id: deletedReport._id }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GET statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const pending = await Report.countDocuments({ status: 'pending' });
    const inProgress = await Report.countDocuments({ status: 'in-progress' });
    const resolved = await Report.countDocuments({ status: 'resolved' });
    
    // Category statistics
    const categoryStats = await Report.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // State statistics
    const stateStats = await Report.aggregate([
      {
        $group: {
          _id: '$location.state',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        total,
        pending,
        inProgress,
        resolved,
        byCategory: categoryStats,
        byState: stateStats
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GET reports by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reports = await Report.find({ category })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Report.countDocuments({ category });

    res.json({
      success: true,
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
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