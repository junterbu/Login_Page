const BACKEND_URL = "https://backend-test-phase.vercel.app";

document.getElementById('registerBtn').addEventListener('click', async () => {
  const matrikelnummer = document.getElementById('regUserId').value.trim();
  const password = document.getElementById('regPassword').value;
  const statusMsg = document.getElementById('statusMessage');

  // UI Reset
  statusMsg.className = 'hidden';

  if (!matrikelnummer || !password) {
    statusMsg.textContent = 'Bitte fülle alle Felder aus.';
    statusMsg.className = 'error';
    return;
  }

  try {
    const resp = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrikelnummer, password })
    });

    const json = await resp.json();
    
    if (!resp.ok || !json.ok) {
      statusMsg.textContent = json.message || 'Registrierung fehlgeschlagen.';
      statusMsg.className = 'error';
      return;
    }

    // Erfolg
    let textLines = [
    'Erfolgreich! Du kannst dich jetzt im Labor einloggen.',
    "Link: https://junterbu.github.io/Laboruebung_SS2026/"
    ];
    statusMsg.textContent = textLines;
    statusMsg.className = 'success';
    
    // Felder leeren
    document.getElementById('regUserId').value = '';
    document.getElementById('regPassword').value = '';

  } catch (e) {
    console.error('Error', e);
    statusMsg.textContent = 'Netzwerkfehler. Ist der Server erreichbar?';
    statusMsg.className = 'error';
  }
});