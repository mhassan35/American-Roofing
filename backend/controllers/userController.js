// const bcrypt = require('bcrypt');
// const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Lead = require('../models/User');

const FormSubmission = async (req, res) => {
  console.log(req.body);

  try {
    // Create new lead with all the data
    const newLead = new Lead({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      message: req.body.message || '',
      source: req.body.source || 'Website Form',
      urgency: req.body.urgency,
      propertyType: req.body.propertyType,
      address: req.body.address,
      zipCode: req.body.zipCode,
      photo: req.body.photo || '',
    });

    const savedLead = await newLead.save();

       const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // Enhanced email content with all lead information
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_RECEIVER_EMAIL,
      subject: `New ${savedLead.urgency.toUpperCase()} Lead - ${savedLead.service}`,
      html: `
        <h2>New Lead Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${savedLead.firstName} ${savedLead.lastName}</p>
          <p><strong>Email:</strong> ${savedLead.email}</p>
          <p><strong>Phone:</strong> ${savedLead.phone}</p>
          
          <h3>Service Details</h3>
          <p><strong>Service:</strong> ${savedLead.service.replace('-', ' ').toUpperCase()}</p>
          <p><strong>Urgency:</strong> ${savedLead.urgency.replace('-', ' ').toUpperCase()}</p>
          <p><strong>Property Type:</strong> ${savedLead.propertyType.toUpperCase()}</p>
          
          <h3>Property Information</h3>
          <p><strong>Address:</strong> ${savedLead.address}</p>
          <p><strong>Zip Code:</strong> ${savedLead.zipCode}</p>
          
          <h3>Message</h3>
          <p>${savedLead.message || 'No message provided'}</p>
          
          <h3>Additional Information</h3>
          <p><strong>Source:</strong> ${savedLead.source}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          ${savedLead.photo ? '<p><strong>Photo:</strong> Included (check database)</p>' : '<p><strong>Photo:</strong> Not provided</p>'}
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Lead submitted successfully and notification sent',
      data: {
        id: savedLead._id,
        firstName: savedLead.firstName,
        lastName: savedLead.lastName,
        email: savedLead.email,
        service: savedLead.service,
        urgency: savedLead.urgency,
        createdAt: savedLead.createdAt
      },
    });

  } catch (error) {
    console.error('Error submitting lead:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Something went wrong while submitting the lead',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const GetLeads = async (req, res) => {

   try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const DeleteContact = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (err) {
    console.error('Error deleting lead:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   // Check if all fields are filled
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please enter both email and password' });
//   }

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '30d' } // Or your preferred expiration time
//     );

//     // Send token with response
//     res.status(200).json({
//       message: 'Login successful',
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };



module.exports = { FormSubmission,GetLeads,DeleteContact  };
