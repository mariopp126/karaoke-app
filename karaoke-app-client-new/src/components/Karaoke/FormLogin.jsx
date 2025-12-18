import { useState } from "react";
import { authService } from "../../services/api"; // Importación directa del servicio
import { useNavigate } from "react-router";

export function FormLogin() {
  const [formLoginData, setFormLoginData] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const loginRequest = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formLoginData.username.trim() || !formLoginData.password.trim()) {
      setFormError("Por favor, completa todos los campos.");
      return;
    }

    // Usamos el servicio que definiste en api.js
    const success = authService.login(formLoginData.password);

    if (success) {
      console.log("Sesión iniciada correctamente");
      navigate("/admin"); // Redirigir al panel si es exitoso
    } else {
      setFormError("Contraseña incorrecta. Intenta con 'admin123'");
    }
  };

  return (
    <div className="bg-card-dark p-6 sm:p-8 rounded-xl shadow-2xl max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-primary-light pb-3 text-center">
        Inicio de Sesión
      </h2>
      <form className="space-y-6" onSubmit={loginRequest}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
          <input
            type="text"
            value={formLoginData.username}
            onChange={(e) => setFormLoginData({...formLoginData, username: e.target.value})}
            className="w-full px-4 py-2 bg-gray-800 border border-primary-light rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
          <input
            type="password"
            value={formLoginData.password}
            onChange={(e) => setFormLoginData({...formLoginData, password: e.target.value})}
            className="w-full px-4 py-2 bg-gray-800 border border-primary-light rounded-lg text-white"
          />
        </div>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-background-dark font-bold py-2 rounded-lg transition transform hover:scale-105">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}