const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend Vite dev server (http://localhost:5173)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// In-memory inquiry store & local JSON backup file
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Helper to load existing inquiries
function loadInquiries() {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries.json:', err.message);
  }
  return [];
}

// Helper to save inquiries
function saveInquiry(inquiry) {
  const current = loadInquiries();
  current.unshift(inquiry); // Newest first
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(current, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing inquiries.json:', err.message);
  }
  return current;
}

// Health Check API Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Max Water B2B Process Water API Server',
    timestamp: new Date().toISOString()
  });
});

// GET /api/inquiries - List submitted B2B inquiries
app.get('/api/inquiries', (req, res) => {
  const inquiries = loadInquiries();
  res.status(200).json({
    success: true,
    count: inquiries.length,
    inquiries
  });
});

// POST /api/contact - Submit new B2B supply inquiry
app.post('/api/contact', (req, res) => {
  try {
    const { name, company, phone, email, quantity, city, message } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full Name and Phone/WhatsApp Number are required.'
      });
    }

    const newInquiry = {
      id: `MW-${Date.now()}`,
      name: name.trim(),
      company: company ? company.trim() : 'N/A',
      phone: phone.trim(),
      email: email ? email.trim() : 'N/A',
      quantity: quantity || 'Not Specified',
      city: city || 'Surat',
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString(),
      status: 'NEW'
    };

    saveInquiry(newInquiry);

    console.log(`[B2B INQUIRY RECEIVED] ${newInquiry.id} - ${newInquiry.name} (${newInquiry.company}) - Phone: ${newInquiry.phone}`);

    let messageText = `*MAX WATER - B2B SUPPLY INQUIRY*\n`;
    messageText += `----------------------------------------\n`;
    messageText += `Hello Max Water team, I would like to inquire about industrial process water bulk supply.\n\n`;
    messageText += `*Client Name:* ${newInquiry.name}\n`;
    if (newInquiry.company && newInquiry.company !== 'N/A') {
      messageText += `*Company / Plant:* ${newInquiry.company}\n`;
    }
    messageText += `*Phone:* ${newInquiry.phone}\n`;
    if (newInquiry.email && newInquiry.email !== 'N/A') {
      messageText += `*Email:* ${newInquiry.email}\n`;
    }
    messageText += `*Packaging:* ${newInquiry.quantity}\n`;
    messageText += `*Delivery City / Hub:* ${newInquiry.city}\n`;
    if (newInquiry.message) {
      messageText += `*Specific Notes:* ${newInquiry.message}\n`;
    }
    messageText += `----------------------------------------`;

    return res.status(201).json({
      success: true,
      message: 'B2B Process Water inquiry submitted successfully!',
      inquiryId: newInquiry.id,
      whatsappMessage: encodeURIComponent(messageText)
    });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing inquiry.'
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 MAX WATER B2B Backend API running on port ${PORT}`);
  console.log(`👉 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================`);
});
