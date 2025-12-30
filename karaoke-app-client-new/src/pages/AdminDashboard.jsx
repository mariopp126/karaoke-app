import React, { useState, useEffect } from "react";
import { karaokeService } from "../services/api"; //
import { ColaSolicitudes } from "../components/Karaoke/ColaSolicitudes";
import { ModalConfirmacion } from "../components/Karaoke/ModalConfirmacion";
import { IconoMicrofono, IconoListaMusica } from "../components/Icons/icons";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    // Esto se conecta a Firebase y se queda escuchando
    const unsubscribe = karaokeService.subscribeToRequests((data) => {
      setRequests(data); // Se actualiza solo cuando alguien pide una canción
    });

    // Limpieza al salir de la página
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Borrar canción?")) {
      await karaokeService.deleteRequest(id);
      
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      {/* <ModalConfirmacion
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="¿Confirmas que esta canción ya fue interpretada? Se eliminará de la lista."
      /> */}

      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-accent-green flex items-center justify-center gap-3">
          <IconoMicrofono size={36} className="text-primary-light" /> 
          Panel de Control TSE
        </h1>
        <p className="text-gray-400 mt-2">Administración de la Cola en Tiempo Real</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Reutilizamos tu componente de lista pasándole la función de borrar */}
        <ColaSolicitudes 
          requests={requests} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;