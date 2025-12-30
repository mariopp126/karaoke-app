import { db, auth } from "./firebaseConfig";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const karaokeService = {
  // Escucha cambios en tiempo real
  subscribeToRequests: (callback) => {
    const q = query(collection(db, "requests"), orderBy("timestamp", "asc"));
    return onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(docs);
    }, (error) => {
      console.error("Error al suscribirse a solicitudes:", error);
    });
  },

  addRequest: async (song) => {
    await addDoc(collection(db, "requests"), {
      ...song,
      timestamp: Date.now()
    });
  },

  deleteRequest: async (id) => {
    await deleteDoc(doc(db, "requests", id));
  }
};

export const authService = {
  login: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logout: () => signOut(auth),
  onAuthStateChange: (callback) => onAuthStateChanged(auth, callback)
};