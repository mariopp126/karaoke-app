export const ModalConfirmacion = ({ show, onConfirm, onCancel, message }) => {
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