import { useState, useEffect } from "react";
import { FormSolicitud } from "../components/Karaoke/FormSolicitud";
import { ColaSolicitudes } from "../components/Karaoke/ColaSolicitudes";
import { IconoMicrofono } from "../components/Icons/icons";
import { karaokeService } from "../services/api";
import logoAniversary from "../assets/14 Aniversario Logo TSE-1_page-0001.jpg";

function PublicView() {
  const [requests, setRequests] = useState([]);

  const addRequest = async (newRequest) => {
    try {
      await karaokeService.addRequest(newRequest);
      // No necesitas setRequests aquí porque el listener de subscribeToRequests
      // ya actualizará el estado automáticamente
    } catch (error) {
      console.error("Error al agregar solicitud:", error);
    }
  }

  // Cargar solicitudes al montar el componente
    useEffect(() => {
    // En lugar de llamar a getRequests(), nos suscribimos
    const unsubscribe = karaokeService.subscribeToRequests((data) => {
      setRequests(data); // Firebase nos enviará la lista actualizada aquí
    });

    // Importante: cancelar la suscripción al cerrar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-8">

      <header className="text-center mb-10">
        <img
          src={logoAniversary}
          alt="TSE Aniversario"
          className="mx-auto mb-6 w-48 h-48 rounded-full shadow-lg object-cover"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-accent-green flex items-center justify-center gap-3">
          <IconoMicrofono size={36} className="text-primary-light" />
          Solicitudes de Karaoke
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Envía tus canciones favoritas y únete a la diversión
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