const BACKEND_URL = "https://backend-test-phase.vercel.app";

document.getElementById('registerBtn').addEventListener('click', async () => {
  const matrikelnummer = document.getElementById('regUserId').value.trim();
  const password = document.getElementById('regPassword').value;
  const honeypot = document.getElementById('hp-website').value; // Honeypot auslesen
  const statusMsg = document.getElementById('statusMessage');

  // UI Reset
  statusMsg.className = 'hidden';

  // 1. HONEYPOT CHECK
  if (honeypot !== "") {
    // Wenn das Feld Text enthält, ist es ein Bot. 
    // Wir brechen leise ab, ohne dem Bot eine Fehlermeldung zu geben.
    console.warn("Bot-Aktivität blockiert.");
    return;
  }

  // 2. LEERFELDER PRÜFEN
  if (!matrikelnummer || !password) {
    statusMsg.textContent = 'Bitte fülle alle Felder aus.';
    statusMsg.className = 'error';
    return;
  }

  // 3. MATRIKELNUMMER VALIDIEREN (Nur Zahlen, exakt 7 oder 8 Stellen)
  const matrikelRegex = /^\d{7,8}$/;
  if (!matrikelRegex.test(matrikelnummer)) {
    statusMsg.textContent = 'Bitte gib eine gültige Matrikelnummer ein (7-8 Ziffern).';
    statusMsg.className = 'error';
    return;
  }

  try {
    const resp = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Wir schicken den Honeypot zur Sicherheit auch ans Backend
      body: JSON.stringify({ matrikelnummer, password, honeypot }) 
    });

    // ... (ab hier bleibt dein Code exakt gleich)
    const json = await resp.json();
    
    if (!resp.ok || !json.ok) {
      statusMsg.textContent = json.message || 'Registrierung fehlgeschlagen.';
      statusMsg.className = 'error';
      return;
    }

    // Erfolg
    statusMsg.innerHTML = `
    Erfolgreich! Du kannst dich jetzt im Labor einloggen.<br>
    <a href="https://junterbu.github.io/Laboruebung_SS2026/" target="_blank">Hier geht's zum virtuellen Labor</a>
    `;
    statusMsg.className = 'success';
    
    // Felder leeren
    document.getElementById('regUserId').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('hp-website').value = '';

  } catch (e) {
    console.error('Error', e);
    statusMsg.textContent = 'Netzwerkfehler. Ist der Server erreichbar?';
    statusMsg.className = 'error';
  }
});