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

// Root API Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'Max Water B2B Process Water API Server',
    status: 'ONLINE',
    endpoints: {
      health: '/api/health',
      inquiries: '/api/inquiries',
      contact: 'POST /api/contact'
    }
  });
});

// Health Check API Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Max Water B2B Process Water API Server',
    timestamp: new Date().toISOString()
  });
});

// GET /api/inquiries - List submitted B2B inquiries (JSON API)
app.get('/api/inquiries', (req, res) => {
  const inquiries = loadInquiries();
  res.status(200).json({
    success: true,
    count: inquiries.length,
    inquiries
  });
});

// GET /admin & GET /dashboard - Clean Light Theme B2B Admin Inquiry Dashboard GUI
app.get(['/admin', '/dashboard', '/inquiries-panel'], (req, res) => {
  const inquiries = loadInquiries();
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MAX WATER | B2B Inquiries Admin Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #F4F8FA; color: #10202B; }
    .font-heading { font-family: 'Chakra Petch', sans-serif; }
  </style>
</head>
<body class="min-h-screen pb-12">

  <!-- Header Banner (Clean Light Theme & Fully Responsive) -->
  <header class="bg-white border-b border-[#EBEBEB] px-3 sm:px-8 py-3.5 sticky top-0 z-50 shadow-xs">
    <div class="max-w-[98%] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#087EAA] flex items-center justify-center font-heading font-bold text-white text-lg sm:text-xl shadow-sm shrink-0">
          W
        </div>
        <div>
          <h1 class="font-heading font-semibold text-lg sm:text-2xl tracking-wider uppercase text-[#10202B] flex items-center gap-2 flex-wrap">
            MAX WATER <span class="text-[#087EAA] text-[10px] sm:text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-[#087EAA]/10 border border-[#087EAA]/20">ADMIN PORTAL</span>
          </h1>
          <p class="text-[11px] sm:text-xs text-[#5D7180] font-medium">B2B Process Water Inquiry Management System (maxwater.in)</p>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Server Online
        </span>
        <button onclick="downloadCSV()" class="bg-[#087EAA] hover:bg-[#063B5C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-heading font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          📥 Export CSV
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="max-w-[98%] mx-auto px-2 sm:px-4 mt-4 sm:mt-6 space-y-4 sm:space-y-6">

    <!-- Summary Stats Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <div class="bg-white border border-[#EBEBEB] rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div>
          <p class="text-[11px] sm:text-xs font-semibold text-[#5D7180] uppercase tracking-wider">Total B2B Inquiries</p>
          <p class="font-heading font-bold text-2xl sm:text-3xl text-[#087EAA] mt-1" id="totalCount">${inquiries.length}</p>
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#087EAA]/10 border border-[#087EAA]/20 flex items-center justify-center text-xl sm:text-2xl">
          📋
        </div>
      </div>

      <div class="bg-white border border-[#EBEBEB] rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div>
          <p class="text-[11px] sm:text-xs font-semibold text-[#5D7180] uppercase tracking-wider">Top Industrial Hubs</p>
          <p class="font-heading font-semibold text-base sm:text-lg text-[#10202B] mt-1">Surat • Ankleshwar • Dahej</p>
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-xl sm:text-2xl">
          🏭
        </div>
      </div>

      <div class="bg-white border border-[#EBEBEB] rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div>
          <p class="text-[11px] sm:text-xs font-semibold text-[#5D7180] uppercase tracking-wider">System Status</p>
          <p class="font-heading font-semibold text-sm sm:text-base text-emerald-600 mt-1">WhatsApp Direct Sync Active</p>
        </div>
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl sm:text-2xl">
          💬
        </div>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="bg-white border border-[#EBEBEB] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
      <div class="relative w-full sm:w-80 md:w-96">
        <input 
          type="text" 
          id="searchInput" 
          onkeyup="filterTable()" 
          placeholder="Search client, company, phone or city..." 
          class="w-full bg-[#F4F8FA] border border-[#EBEBEB] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#10202B] placeholder-slate-400 focus:outline-none focus:border-[#087EAA] transition-all"
        />
      </div>
      <div class="text-xs text-[#5D7180] font-medium self-end sm:self-center">
        Showing <span id="visibleCount" class="text-[#10202B] font-bold">${inquiries.length}</span> of ${inquiries.length} inquiries
      </div>
    </div>

    <!-- Inquiries Table (Light Theme, Fully Responsive & Delete Option) -->
    <div class="bg-white border border-[#EBEBEB] rounded-xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]" id="inquiriesTable">
          <thead>
            <tr class="bg-[#F9FBFD] border-b border-[#EBEBEB] text-[#5D7180] text-xs font-heading font-semibold uppercase tracking-wider">
              <th class="py-3.5 px-4 whitespace-nowrap">Inquiry ID / Date</th>
              <th class="py-3.5 px-4 whitespace-nowrap">Client & Company</th>
              <th class="py-3.5 px-4 whitespace-nowrap">Contact Details</th>
              <th class="py-3.5 px-4 whitespace-nowrap">Packaging Sizing</th>
              <th class="py-3.5 px-4 whitespace-nowrap">Delivery City</th>
              <th class="py-3.5 px-4">Specific Notes</th>
              <th class="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EBEBEB] text-sm">
            ${inquiries.length === 0 ? `
              <tr>
                <td colspan="7" class="py-12 text-center text-[#5D7180] font-medium">
                  No B2B inquiries received yet.
                </td>
              </tr>
            ` : inquiries.slice().reverse().map(item => `
              <tr id="row-${item.id}" class="hover:bg-[#F4F8FA] transition-colors group">
                <td class="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                  <span class="text-[#087EAA] font-bold block">${item.id || 'MW-INQ'}</span>
                  <span class="text-[#5D7180] text-[11px] block mt-0.5">${item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Just now'}</span>
                </td>

                <td class="py-3.5 px-4 whitespace-nowrap">
                  <span class="font-semibold text-[#10202B] block text-sm">${item.name || 'Client'}</span>
                  ${item.company ? `<span class="inline-block mt-1 px-2.5 py-0.5 rounded bg-[#087EAA]/10 border border-[#087EAA]/25 text-[#087EAA] text-xs font-medium">${item.company}</span>` : '<span class="text-slate-400 text-xs">-</span>'}
                </td>

                <td class="py-3.5 px-4 whitespace-nowrap">
                  <span class="text-[#10202B] font-medium block">${item.phone || '-'}</span>
                  ${item.email ? `<span class="text-[#5D7180] text-xs block mt-0.5">${item.email}</span>` : ''}
                </td>

                <td class="py-3.5 px-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-md bg-[#F4F8FA] text-[#10202B] text-xs font-semibold border border-[#EBEBEB] inline-block">
                    📦 ${item.quantity || 'Bulk Water'}
                  </span>
                </td>

                <td class="py-3.5 px-4 whitespace-nowrap">
                  <span class="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-xs inline-flex items-center gap-1">
                    📍 ${item.city || 'Gujarat'}
                  </span>
                </td>

                <td class="py-3.5 px-4 min-w-[180px] max-w-xs text-xs text-[#5D7180] leading-relaxed">
                  ${item.message && item.message.trim() ? `"${item.message}"` : '<span class="text-slate-400">-</span>'}
                </td>

                <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                  ${item.phone ? `
                    <a 
                      href="https://wa.me/91${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name || '')},%20regarding%20your%20Max%20Water%20B2B%20inquiry..." 
                      target="_blank"
                      class="inline-flex items-center gap-1 bg-[#10B981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      💬 WhatsApp
                    </a>
                  ` : ''}
                  <button 
                    onclick="deleteInquiry('${item.id}')"
                    class="inline-flex items-center gap-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    title="Delete Inquiry"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <script>
    function filterTable() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const rows = document.querySelectorAll('#inquiriesTable tbody tr');
      let visible = 0;

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(input)) {
          row.style.display = '';
          visible++;
        } else {
          row.style.display = 'none';
        }
      });

      document.getElementById('visibleCount').innerText = visible;
    }

    async function deleteInquiry(id) {
      if (!confirm('Are you sure you want to delete inquiry ' + id + '?')) return;
      try {
        const res = await fetch('/api/inquiries/' + id, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          const row = document.getElementById('row-' + id);
          if (row) row.remove();
          location.reload();
        } else {
          alert('Failed to delete inquiry: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Error deleting inquiry: ' + err.message);
      }
    }

    function downloadCSV() {
      const inquiriesData = ${JSON.stringify(inquiries)};
      let csv = 'Inquiry ID,Date,Client Name,Company,Phone,Email,Packaging,Delivery City,Message\\n';
      
      inquiriesData.forEach(item => {
        const line = [
          \`"\${item.id || ''}"\`,
          \`"\${item.createdAt || ''}"\`,
          \`"\${item.name || ''}"\`,
          \`"\${item.company || ''}"\`,
          \`"\${item.phone || ''}"\`,
          \`"\${item.email || ''}"\`,
          \`"\${item.quantity || ''}"\`,
          \`"\${item.city || ''}"\`,
          \`"\${(item.message || '').replace(/"/g, '""')}"\`
        ].join(',');
        csv += line + '\\n';
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', \`MaxWater_Inquiries_\${new Date().toISOString().slice(0,10)}.csv\`);
      a.click();
    }
  </script>
</body>
</html>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
});

// DELETE /api/inquiries/:id - Delete an inquiry by ID
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    let inquiries = loadInquiries();
    const initialCount = inquiries.length;
    inquiries = inquiries.filter(item => item.id !== id);

    if (inquiries.length === initialCount) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    console.log(`[B2B INQUIRY DELETED] ${id}`);
    return res.status(200).json({ success: true, message: `Inquiry ${id} deleted successfully` });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
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
