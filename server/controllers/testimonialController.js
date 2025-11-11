const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const t = new Testimonial(req.body);
    const saved = await t.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
