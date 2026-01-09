import { FormLogin } from "../components/Karaoke/FormLogin";
import { IconoMicrofono } from "../components/Icons/icons";
function AdminLogin() {
    return (
        <div className="min-h-screen p-4 sm:p-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-accent-green flex items-center justify-center gap-3 mb-4">
                <IconoMicrofono size={36} className="text-primary-light" /> Panel de Administración
            </h1>
            <FormLogin />
        </div>
    );
}

export default AdminLogin;