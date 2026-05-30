import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5jbEn9pV-vL_XkNk_H9slthEuiWcghmU",
  authDomain: "chaana-davi-vagner.firebaseapp.com",
  projectId: "chaana-davi-vagner",
  storageBucket: "chaana-davi-vagner.firebasestorage.app",
  messagingSenderId: "172399061527",
  appId: "1:172399061527:web:e2dcbb5af3a6c9504d0a52"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const DOC_REF = doc(db, "chaana", "shared");
const auth = getAuth(app);

window.__firebase = {
  async load() {
    try {
      const snap = await getDoc(DOC_REF);
      return snap.exists() ? snap.data() : null;
    } catch(e) { console.warn("Firebase load error:", e); return null; }
  },
  async save(state) {
    try {
      const toSave = {
        ratings: state.ratings.map(r => ({...r, poster: ''})),
        dates: state.dates,
        poems: state.poems,
        garden: state.garden.slice(-500),
        clicks: state.clicks,
        bankIdx: state.bankIdx || { b2:0, b10:0, b50:0, b100:0 },
        _updatedAt: Date.now(),
      };
      await setDoc(DOC_REF, toSave);
      try { localStorage.setItem('chaana_posters', JSON.stringify(
        state.ratings.reduce((acc,r) => { if(r.poster) acc[r.id]=r.poster; return acc; }, {})
      )); } catch{}
    } catch(e) { console.warn("Firebase save error:", e); }
  },
  subscribe(callback) {
    return onSnapshot(DOC_REF, (snap) => {
      if (snap.exists()) callback(snap.data());
    });
  }
};

window.__firebaseAuth = {
  async signIn() {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch(e) { console.warn("Auth error:", e); return null; }
  },
  getUser() {
    return new Promise(resolve => {
      const unsub = onAuthStateChanged(auth, user => { unsub(); resolve(user); });
    });
  }
};

window.__firebaseReady = true;
window.dispatchEvent(new Event('firebase-ready'));
