// This simulates a database. For now, it uses memory.
// Later, replace these with fetch() or firebase calls.

let requests = [];

export const karaokeService = {
  getRequests: () => [...requests],
  
  addRequest: (song) => {
    const newReq = { ...song, id: crypto.randomUUID(), timestamp: Date.now() };
    requests.push(newReq);
    return newReq;
  },

  deleteRequest: (id) => {
    requests = requests.filter(req => req.id !== id);
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