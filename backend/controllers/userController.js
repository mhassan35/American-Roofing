// const bcrypt = require('bcrypt');
// const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const contact = require('../models/User');

const FormSubmission = async (req, res) => {


  // Check if all fields are filled
  // if (!name || !email || !password || !role) {
  //   return res.status(400).json({ message: 'Please fill all fields' });
  // }

  try {

const newContact = new contact({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phone: req.body.phone,
  service: req.body.service,
  message: req.body.message,
});

const savedContact = await newContact.save();

// Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,       // your email
        pass: process.env.ADMIN_EMAIL_PASS,  // app-specific password
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_RECEIVER_EMAIL, // where to send
      subject: 'New Contact Form Submission',
      text: `
New contact form submission:

Name: ${savedContact.firstName} ${savedContact.lastName}
Email: ${savedContact.email}
Phone: ${savedContact.phone}
Service: ${savedContact.service}
Message: ${savedContact.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Contact form submitted and email sent',
      data: savedContact,
    });

 

  //   // Check if email already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: 'Email already used' });
  //   }

  //   // Secure the password
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   // Create new user
  //   const newUser = new User({
  //     name,
  //     email,
  //     password: hashedPassword,
  //     role
  //   });

  //   // Save user to MongoDB
  //   await newUser.save();

  //   res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const GetLeads = async (req, res) => {

   try {
    const leads = await contact.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const DeleteContact = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedLead = await contact.findByIdAndDelete(id);
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
