import { useState, useEffect } from "react"; // Asegúrate de importar esto
import { Routes, Route, Navigate } from "react-router"; // Importación corregida para v6
import PublicView from "./pages/PublicView";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/404";
import { authService } from "./services/api";

// Componente Protegido Actualizado para Firebase
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nos suscribimos a los cambios de sesión
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Ya sabemos si hay usuario o no
    });

    return () => unsubscribe(); // Limpieza al desmontar
  }, []);

  if (loading) {
    // Muestra algo mientras Firebase verifica (evita el "parpadeo" al login)
    return <div className="min-h-screen flex items-center justify-center text-white bg-background-dark">Cargando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicView />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;