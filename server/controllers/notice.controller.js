const Notice = require('../models/notice.model');

// Get all notices
exports.getAllNotices = async (req, res) => {
  try {
    // Get notices sorted by date (newest first)
    const notices = await Notice.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    
    res.json(notices);
  } catch (error) {
    console.error('Get all notices error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get notice by ID
exports.getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notice = await Notice.findById(id).populate('author', 'name');
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    res.json(notice);
  } catch (error) {
    console.error('Get notice by ID error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new notice (teachers and admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Create new notice
    const notice = new Notice({
      title,
      content,
      author: req.user._id,
      postedBy: req.user.name
    });
    
    // Save notice to database
    await notice.save();
    
    res.status(201).json(notice);
  } catch (error) {
    console.error('Create notice error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a notice (only by the author or admin)
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    // Find notice by id
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    // Check if user is the author or admin
    if (notice.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this notice' });
    }
    
    // Update notice fields
    if (title) notice.title = title;
    if (content) notice.content = content;
    
    // Save updated notice
    await notice.save();
    
    res.json(notice);
  } catch (error) {
    console.error('Update notice error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a notice (only by the author or admin)
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find notice by id
    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    // Check if user is the author or admin
    if (notice.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this notice' });
    }
    
    // Delete notice
    await Notice.findByIdAndDelete(id);
    
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Delete notice error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
