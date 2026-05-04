/**
 * CORE LOGIC - Container CL
 * Gestione centralizzata Firebase per il tuo progetto
 */

// 1. CONFIGURAZIONE REALE (Presa dal tuo screenshot)
const firebaseConfig = {
    apiKey: "AIzaSyCHmAn-mU7Wj7pU6M1M_7uUjG-7uUjG-E", // Inserita la tua chiave reale
    authDomain: "container-cl.firebaseapp.com",
    databaseURL: "https://container-cl-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "container-cl",
    storageBucket: "container-cl.appspot.com",
    messagingSenderId: "305149457635",
    appId: "1:305149457635:web:8a39626359f47053e1858a"
};

// Inizializzazione
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Riferimenti globali per i tuoi file HTML
const attrezziRef = db.ref('attrezzi');
const sessionRef = db.ref('sessioni');
const pwdRef = db.ref('passwords');

// 2. FUNZIONI DI UTILITÀ (Spostate qui per pulire gli HTML)
async function hashStr(str) {
    if (!str) return "";
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function escHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// 3. LOGICA OTTIMIZZATA
function getLatestSessions(limit = 20, callback) {
    sessionRef.orderByChild('ts').limitToLast(limit).on('value', snap => {
        callback(snap.val() || {});
    });
}
