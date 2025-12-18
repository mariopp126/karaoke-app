// This simulates a database. For now, it uses memory.
// Later, replace these with fetch() or firebase calls.

// src/services/api.js mejorado para persistencia local
let requests = JSON.parse(localStorage.getItem('karaoke_db')) || [];

const saveToLocal = () => {
  localStorage.setItem('karaoke_db', JSON.stringify(requests));
};

export const karaokeService = {
  getRequests: () => [...requests],
  
  addRequest: (song) => {
    const newReq = { ...song, id: crypto.randomUUID(), timestamp: Date.now() };
    requests.push(newReq);
    saveToLocal(); // Guardar cambios
    return newReq;
  },

  deleteRequest: (id) => {
    requests = requests.filter(req => req.id !== id);
    saveToLocal(); // Guardar cambios
    return true;
  }
};

export const authService = {
  login: (password) => {
    // Simple mock: check if password is 'admin123'
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem('isAdmin'),
  isAuthenticated: () => localStorage.getItem('isAdmin') === 'true'
};