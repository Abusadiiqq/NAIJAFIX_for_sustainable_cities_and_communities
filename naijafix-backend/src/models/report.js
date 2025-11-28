const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Roads', 'Electricity', 'Water', 'Sanitation', 'Security', 'Other']
  },
  location: {
    area: {
      type: String,
      required: [true, 'Area is required']
    },
    lga: {
      type: String,
      required: [true, 'LGA is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    }
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in-progress', 'resolved']
  },
  userid: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);