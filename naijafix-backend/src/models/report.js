const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Roads', 'Electricity', 'Water', 'Sanitation', 'Security', 'Healthcare', 'Education', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  priority: {
    type: String,
    default: 'medium',
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: '{VALUE} is not a valid priority'
    }
  },
  location: {
    area: {
      type: String,
      required: [true, 'Area is required'],
      trim: true,
      maxlength: [100, 'Area name cannot exceed 100 characters']
    },
    lga: {
      type: String,
      required: [true, 'LGA is required'],
      trim: true,
      maxlength: [100, 'LGA name cannot exceed 100 characters']
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      enum: {
        values: [
          'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
          'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
          'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 
          'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 
          'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
          'Taraba', 'Yobe', 'Zamfara'
        ],
        message: '{VALUE} is not a valid Nigerian state'
      }
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  image: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        // Basic URL validation for image URLs
        return v === '' || /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'in-progress', 'resolved'],
      message: '{VALUE} is not a valid status'
    }
  },
  userid: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true
  },
  assignedTo: {
    type: String,
    default: '',
    trim: true
  },
  resolutionNotes: {
    type: String,
    default: '',
    maxlength: [1000, 'Resolution notes cannot exceed 1000 characters']
  },
  estimatedResolutionDate: {
    type: Date
  },
  votes: {
    type: Number,
    default: 0,
    min: 0
  },
  isUrgent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reportSchema.index({ status: 1 });
reportSchema.index({ category: 1 });
reportSchema.index({ 'location.state': 1 });
reportSchema.index({ 'location.lga': 1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ userid: 1 });
reportSchema.index({ priority: 1 });

// Compound indexes for common queries
reportSchema.index({ category: 1, status: 1 });
reportSchema.index({ 'location.state': 1, status: 1 });
reportSchema.index({ 'location.state': 1, category: 1 });

// Virtual for isNewReport (reports less than 24 hours old)
reportSchema.virtual('isNewReport').get(function() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return this.createdAt > oneDayAgo;
});

// Instance method to mark as resolved
reportSchema.methods.markAsResolved = function(notes = '') {
  this.status = 'resolved';
  this.resolutionNotes = notes;
  return this.save();
};

// Instance method to update status
reportSchema.methods.updateStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  if (notes) {
    this.resolutionNotes = notes;
  }
  return this.save();
};

// Static method to get reports by state
reportSchema.statics.findByState = function(state) {
  return this.find({ 'location.state': state }).sort({ createdAt: -1 });
};

// Static method to get urgent reports
reportSchema.statics.findUrgent = function() {
  return this.find({ 
    $or: [
      { priority: 'urgent' },
      { isUrgent: true }
    ]
  }).sort({ createdAt: -1 });
};

// Static method to get statistics
reportSchema.statics.getCategoryStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
        },
        resolved: {
          $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
        }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Middleware to set isUrgent based on priority
reportSchema.pre('save', function(next) {
  if (this.priority === 'urgent') {
    this.isUrgent = true;
  }
  next();
});

// Ensure virtual fields are serialized
reportSchema.set('toJSON', { virtuals: true });
reportSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Report', reportSchema);