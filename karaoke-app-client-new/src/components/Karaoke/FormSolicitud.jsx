import { useState } from "react";
import { IconoEnviar } from "../Icons/icons";

export function FormSolicitud({ onAdd }) {
  const [formData, setFormData] = useState({
    songTitle: "",
    artist: "",
    requesterName: "",
  });
  const [formError, setFormError] = useState("");

  // Manejador de Envío
  const handleSendRequest = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.songTitle.trim() || !formData.artist.trim() || !formData.requesterName.trim()) {
      setFormError(
        "Por favor, completa todos los campos: título de la canción, artista y tu nombre."
      );
      return;
    }

    const newRequest = {
      id: crypto.randomUUID(),
      songTitle: formData.songTitle.trim(),
      artist: formData.artist.trim(), // Agregamos el artista al objeto
      requesterName: formData.requesterName.trim(),
      timestamp: Date.now(),
    };

    onAdd(newRequest);
    setFormData({
      songTitle: "",
      artist: "",
      requesterName: ""
    });
  };

  return (
    // COLUMNA IZQUIERDA: Formulario de Solicitud de Canción
    <div className="bg-card-dark p-6 sm:p-8 rounded-xl shadow-2xl h-fit">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-primary-light pb-3 flex items-center gap-2">
        <IconoEnviar size={24} className="text-primary-light" /> Enviar tu
        Solicitud
      </h2>

      <form onSubmit={handleSendRequest} className="space-y-6">
        <div>
          <label
            htmlFor="songTitle"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Título de la Canción
          </label>
          <input
            id="songTitle"
            type="text"
            value={formData.songTitle}
            onChange={(e) => setFormData({...formData, songTitle: e.target.value})}
            placeholder="Ej: Happy Birthday"
            className="w-full px-4 py-3 bg-gray-700 border border-primary-dark rounded-lg focus:ring-accent-green focus:border-accent-green text-white placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="artist"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Artista
          </label>
          <input
            id="artist"
            type="text"
            value={formData.artist}
            onChange={(e) => setFormData({...formData, artist: e.target.value})}
            placeholder="Ej: Stevie Wonder"
            className="w-full px-4 py-3 bg-gray-700 border border-primary-dark rounded-lg focus:ring-accent-green focus:border-accent-green text-white placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="requesterName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Tu Nombre / Apodo
          </label>
          <input
            id="requesterName"
            type="text"
            value={formData.requesterName}
            onChange={(e) => setFormData({...formData, requesterName: e.target.value})}
            placeholder="Ej: Juan Pérez"
            className="w-full px-4 py-3 bg-gray-700 border border-primary-dark rounded-lg focus:ring-accent-green focus:border-accent-green text-white placeholder-gray-400"
            required
          />
        </div>

        {formError && (
          <p className="text-error-red text-sm bg-red-900/30 p-3 rounded-lg border border-red-700">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-background-dark bg-accent-green hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-green transition duration-150 transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <IconoEnviar size={20} className="mr-2" />
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}
