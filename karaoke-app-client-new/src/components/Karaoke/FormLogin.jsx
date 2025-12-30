import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../services/api"; // Asegúrate que la ruta sea correcta

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!email.trim() || !password.trim()) {
      setError("Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      // Intentamos loguear con Firebase
      await authService.login(email, password);
      // Si funciona, redirigimos al admin
      navigate("/admin");
    } catch (err) {
      console.error("Error de login:", err);
      // Firebase devuelve códigos de error, aquí simplificamos el mensaje
      setError("Acceso denegado: Verifica tus credenciales.");
    }
  };

  return (
    <div className="bg-card-dark p-6 sm:p-8 rounded-xl shadow-2xl max-w-md mx-auto w-full">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-primary-light pb-3 text-center">
        Acceso Administrativo
      </h2>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="admin.karaoke@tse.do"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green text-white"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-accent-green hover:bg-green-600 text-background-dark font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          Entrar al Sistema
        </button>
      </form>
    </div>
  );
}