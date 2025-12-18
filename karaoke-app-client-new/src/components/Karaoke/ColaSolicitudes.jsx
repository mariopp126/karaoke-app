import { IconoListaMusica, IconoBasura } from "../Icons/icons";

export function ColaSolicitudes({ requests }) {
  
  return (
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
