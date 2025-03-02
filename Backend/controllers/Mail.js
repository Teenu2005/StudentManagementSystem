const nodemailer = require('nodemailer');
const Student = require("../models/Studentmodels");
const twilio = require('twilio');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'palani20872@gmail.com',
    pass: 'pcgi vfif robh bfbl',
  },
});

exports.messageToAll= async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  try {
    const students = await Student.find();

    // Send email to each student
    for (const student of students) {
      const mailOptions = {
        from: 'palani20872@gmail.com',
        to: student.email,
        subject: 'Message from College Management',
        text: `Dear ${student.name},\n\n${message}\n\nBest regards,\n Principal`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Message sent to ${student.name} at ${student.email}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ success: false, error: 'Failed to send messages' });
  }
};



const accountSid = 'AC'; 
const authToken = 'your_auth_token'; 

const client = new twilio(accountSid, authToken);

const sendSMS = (to, from, body) => {
  client.messages
    .create({
      body: body,        
      from: from,        
      to: to             
    })
    .then((message) => {
        console.log('Message sent successfully!');
        console.log('SID:', message.sid);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
};

exports.sendMessageToAllStudents = async (req, res) => {
    const { message } = req.body;
    try {
        const students = await Student.find();
    
        // Send SMS to each student
        for (const student of students) {
          await twilioClient.messages.create({
            body: message,
            from: 'your_twilio_number',
            to: student.contact.phone1,  
          });
        }
    
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
    };
