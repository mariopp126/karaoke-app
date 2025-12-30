import { db, auth } from "./firebaseConfig";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
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

  // src/services/api.js
addRequest: async (song) => {
    try {
      // Usamos await para esperar la respuesta de Firebase
      const docRef = await addDoc(collection(db, "requests"), {
        ...song,
        // Es mejor usar el tiempo del servidor que el del cliente
        timestamp: serverTimestamp() 
      });
      console.log("¡Éxito! Canción guardada con ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error real de Firebase al guardar:", error);
      throw error;
    }
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