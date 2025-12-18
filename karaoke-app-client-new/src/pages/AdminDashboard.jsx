import React, { useState, useEffect } from "react";
import { karaokeService } from "../services/api"; //
import { ColaSolicitudes } from "../components/Karaoke/ColaSolicitudes";
import { ModalConfirmacion } from "../components/Karaoke/ModalConfirmacion";
import { IconoMicrofono, IconoListaMusica } from "../components/Icons/icons";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    const data = karaokeService.getRequests(); //
    setRequests(data);
  }, []);

  const openDeleteConfirmation = (id) => {
    setRequestToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    // 1. Llamar al pseudo-backend para borrar
    const success = karaokeService.deleteRequest(requestToDelete); //
    
    if (success) {
      // 2. Actualizar la UI local
      setRequests(karaokeService.getRequests()); //
    }
    
    setShowConfirm(false);
    setRequestToDelete(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <ModalConfirmacion
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="¿Confirmas que esta canción ya fue interpretada? Se eliminará de la lista."
      />

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
          onDeleteClick={openDeleteConfirmation} 
        >
            <button>Eliminar</button>
        </ColaSolicitudes>
      </div>
    </div>
  );
};

export default AdminDashboard;