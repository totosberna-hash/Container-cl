/**
 * CORE LOGIC - Container CL
 */

// 1. CONFIGURAZIONE FIREBASE
const firebaseConfig = {
    apiKey: "INSERISCI_QUI_LA_TUA_API_KEY",
    authDomain: "tuo-progetto.firebaseapp.com",
    databaseURL: "https://tuo-progetto.firebaseio.com",
    projectId: "tuo-progetto",
    storageBucket: "tuo-progetto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Inizializzazione
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Riferimenti globali
const attrezziRef = db.ref('attrezzi');
const sessionRef = db.ref('sessioni');
const pwdRef = db.ref('passwords');

// 2. UTILITY
async function hashStr(str) {
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

// 3. QUERY OTTIMIZZATA
function getLatestSessions(limit = 20, callback) {
    sessionRef.orderByChild('ts').limitToLast(limit).on('value', snap => {
        const data = snap.val() || {};
        callback(data);
    });
}