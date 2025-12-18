import { useState } from "react";
import { FormSolicitud } from "../components/Karaoke/FormSolicitud";
import { ColaSolicitudes } from "../components/Karaoke/ColaSolicitudes";
import { IconoMicrofono } from "../components/Icons/icons";
import { karaokeService } from "../services/api";

function PublicView() {
  const [requests, setRequests] = useState([]);

  const addRequest = (newRequest) => {
    karaokeService.addRequest(newRequest);
    setRequests(karaokeService.getRequests());
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">

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
        <FormSolicitud onAdd={addRequest}/>
        <ColaSolicitudes requests={requests} />
      </div>
    </div>
  );
}

export default PublicView;