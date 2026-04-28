require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmailHtml(entry) {
  const merknadRow = entry.merknader
    ? `<tr><td style="font-weight:bold;color:#003366;width:44%;padding:10px 12px;border-bottom:1px solid #eee;">Merknader</td><td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.merknader}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @media print {
    body { max-width: 100% !important; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:680px;margin:0 auto;padding:0;">

  <div style="background:linear-gradient(135deg,#003366,#004d99);color:white;padding:28px 32px;text-align:center;">
    <div style="font-size:28px;font-weight:900;letter-spacing:1px;margin-bottom:4px;">NL</div>
    <h1 style="margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase;">RYKKATTEST / RELEASE CERTIFICATE</h1>
    <p style="margin:6px 0 0;font-size:13px;opacity:0.8;">Nor-Log AS &bull; Tollklarering</p>
  </div>

  <div style="padding:28px 32px;border:1px solid #ddd;border-top:none;">

    <div style="text-align:center;margin-bottom:24px;">
      <span style="background:#28a745;color:white;padding:8px 20px;border-radius:24px;font-weight:700;font-size:15px;display:inline-block;">
        Fortollet ✓
      </span>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr>
        <td style="font-weight:bold;color:#003366;width:44%;padding:10px 12px;border-bottom:1px solid #eee;">Referansenummer</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.referansenummer}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;color:#003366;padding:10px 12px;border-bottom:1px solid #eee;">Tollkvittering nr.</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.tollkvittering}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;color:#003366;padding:10px 12px;border-bottom:1px solid #eee;">Klientnavn</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.klientnavn}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;color:#003366;padding:10px 12px;border-bottom:1px solid #eee;">Varebeskrivelse</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.varebeskrivelse}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;color:#003366;padding:10px 12px;border-bottom:1px solid #eee;">Fortollingsdato</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.fortollingsdato}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;color:#003366;padding:10px 12px;border-bottom:1px solid #eee;">Saksbehandler</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${entry.saksbehandler}</td>
      </tr>
      ${merknadRow}
    </table>

    <div style="background:#f5f8fc;border-top:3px solid #003366;margin-top:28px;padding:20px 24px;text-align:center;font-size:14px;">
      <strong>Varene er fortollet og kan disponeres fritt.</strong><br>
      <em style="color:#555;">The goods have been cleared through customs and are free for disposal.</em>
    </div>

  </div>

  <div style="text-align:center;padding:16px;font-size:12px;color:#aaa;">
    Nor-Log AS &bull; north.automation26@gmail.com
  </div>

</body>
</html>`;
}

app.post('/api/agent/submit', async (req, res) => {
  const {
    pin, referansenummer, tollkvittering, klientnavn,
    klientEmail, varebeskrivelse, fortollingsdato,
    saksbehandler, merknader
  } = req.body;

  if (!pin || pin !== process.env.AGENT_PIN) {
    return res.status(401).json({ error: 'Feil PIN-kode. Prøv igjen.' });
  }

  const required = { referansenummer, tollkvittering, klientnavn, klientEmail, varebeskrivelse, fortollingsdato, saksbehandler };
  for (const [key, val] of Object.entries(required)) {
    if (!val || !val.trim()) {
      return res.status(400).json({ error: `Manglende felt: ${key}` });
    }
  }

  const entry = {
    id: crypto.randomUUID(),
    referansenummer: referansenummer.trim(),
    tollkvittering: tollkvittering.trim(),
    klientnavn: klientnavn.trim(),
    klientEmail: klientEmail.trim().toLowerCase(),
    varebeskrivelse: varebeskrivelse.trim(),
    fortollingsdato: fortollingsdato.trim(),
    saksbehandler: saksbehandler.trim(),
    merknader: (merknader || '').trim(),
    timestamp: new Date().toISOString()
  };

  const data = loadData();
  data.push(entry);
  saveData(data);

  try {
    const { error } = await resend.emails.send({
      from: 'Nor-Log AS <onboarding@resend.dev>',
      to: [entry.klientEmail],
      subject: `Rykkattest – Ref: ${entry.referansenummer}`,
      html: buildEmailHtml(entry)
    });
    if (error) throw new Error(error.message);
    res.json({ success: true, id: entry.id });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: `Rykkatten ble lagret, men e-post feilet: ${err.message}` });
  }
});

app.post('/api/client/lookup', async (req, res) => {
  const { query, email } = req.body;

  if (!query || !email) {
    return res.status(400).json({ error: 'Referansenummer/tollkvittering og e-post er påkrevd.' });
  }

  const data = loadData();
  const q = query.trim();
  const e = email.trim().toLowerCase();

  const entry = data.find(item =>
    item.klientEmail === e &&
    (item.referansenummer === q || item.tollkvittering === q)
  );

  if (!entry) {
    return res.status(404).json({ error: 'Ingen treff. Sjekk referansenummer/tollkvittering og e-postadresse.' });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Nor-Log AS <onboarding@resend.dev>',
      to: [entry.klientEmail],
      subject: `Rykkattest – Ref: ${entry.referansenummer}`,
      html: buildEmailHtml(entry)
    });
    if (error) console.error('Resend error:', error.message);
  } catch (err) {
    console.error('Resend error:', err.message);
  }

  res.json({ success: true, entry });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rykkattest Portal kjører på http://localhost:${PORT}`);
});
