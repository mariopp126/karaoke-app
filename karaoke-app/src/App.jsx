import React, { useState } from "react";
import { Send, Trash2, Mic2, ListMusic } from "lucide-react";

// --- DEFINICIÓN DE ICONOS SVG (Traducción de nombres de clases para consistencia) ---
const IconoMicrofono = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
    <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
  </svg>
);

const IconoEnviar = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const IconoListaMusica = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M17 17v-13h4" />
    <path d="M13 5h-10" />
    <path d="M3 9l10 0" />
    <path d="M9 13h-6" />
  </svg>
);

const IconoBasura = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);
// --- FIN DEFINICIÓN DE ICONOS SVG ---

// --- MODAL DE CONFIRMACIÓN (Reemplaza window.confirm) ---
const ModalConfirmacion = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-card-dark p-6 rounded-xl shadow-2xl max-w-sm w-full border border-error-red">
        <p className="text-lg font-semibold text-white mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-dark transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-error-red text-white rounded-lg hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA APP ---
const App = () => {
  const [requests, setRequests] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState(""); // Nuevo estado para el artista
  const [requesterName, setRequesterName] = useState("");
  const [formError, setFormError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Manejador de Envío
  const handleSendRequest = (e) => {
    e.preventDefault();
    setFormError("");

    if (!songTitle.trim() || !artist.trim() || !requesterName.trim()) {
      setFormError(
        "Por favor, completa todos los campos: título de la canción, artista y tu nombre."
      );
      return;
    }

    const newRequest = {
      id: crypto.randomUUID(),
      songTitle: songTitle.trim(),
      artist: artist.trim(), // Agregamos el artista al objeto
      requesterName: requesterName.trim(),
      timestamp: Date.now(),
    };

    setRequests((prevRequests) => [...prevRequests, newRequest]);

    setSongTitle("");
    setArtist("");
    setRequesterName("");
  };

  // Abrir Modal de Confirmación
  const openDeleteConfirmation = (id) => {
    setRequestToDelete(id);
    setShowConfirm(true);
  };

  // Confirmar Eliminación
  const confirmDelete = () => {
    setRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestToDelete)
    );
    setShowConfirm(false);
    setRequestToDelete(null);
  };

  // Cancelar Eliminación
  const cancelDelete = () => {
    setShowConfirm(false);
    setRequestToDelete(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <ModalConfirmacion
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="¿Estás seguro de que quieres eliminar esta canción de la cola? (Los datos se perderán al recargar la página)"
      />

      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-accent-green flex items-center justify-center gap-3">
          <IconoMicrofono size={36} className="text-primary-light" /> Tablero de
          Solicitudes de Karaoke
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Envía canciones y gestiona la cola. Los datos se reinician al
          recargar.
        </p>
      </header>

      {/* Layout principal (Responsive) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* COLUMNA IZQUIERDA: Formulario de Solicitud (Vista de Cliente) */}
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
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
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
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
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
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
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

        {/* COLUMNA DERECHA: Cola de Solicitudes (Vista de Administrador) */}
        <div className="bg-card-dark p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white border-b border-error-red pb-3 flex items-center gap-2">
            <IconoListaMusica size={24} className="text-error-red" /> Cola de
            Canciones en Vivo ({requests.length})
          </h2>

          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center p-8 bg-gray-700/50 rounded-lg">
                <p className="text-xl text-gray-400">
                  ¡La cola está vacía actualmente!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Sé el primero en solicitar una canción.
                </p>
              </div>
            ) : (
              requests.map((req, index) => (
                <div
                  key={req.id}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-center transition-all duration-300 hover:shadow-lg border-l-4 border-error-red"
                >
                  <div className="min-w-0 pr-4">
                    <p className="text-lg font-semibold truncate text-white">
                      {index + 1}. {req.songTitle}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Artista:{" "}
                      <span className="text-primary-light">{req.artist}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Solicitado por:{" "}
                      <span className="font-medium text-accent-green">
                        {req.requesterName}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => openDeleteConfirmation(req.id)}
                    className="p-2 bg-error-red hover:bg-red-700 text-white rounded-full transition duration-150 transform active:scale-90 shadow-md flex-shrink-0"
                    title="Marcar como Hecha / Eliminar de la Cola"
                  >
                    <IconoBasura size={20} />
                  </button>
                </div>
              ))
            )};
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
