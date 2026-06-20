import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { usuarioActual, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-taller px-3">
            <Link className="navbar-brand" to="/">
                TALLER <span>LUCAS DF</span>
            </Link>

            <button
                className="navbar-toggler border-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navMenu"
            >
                <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }} />
            </button>

            <div className="collapse navbar-collapse" id="navMenu">
                <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                    {!usuarioActual ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registro">Registrarse</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {usuarioActual.rol === "admin" ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/turnos">Turnos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/usuarios">Usuarios</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cliente/dashboard">Mi Panel</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cliente/turnos">Mis Turnos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cliente/vehiculos">Mis Vehículos</Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                <span className="nav-link text-muted" style={{ fontSize: "0.82rem" }}>
                  {usuarioActual.nombre}
                    <span
                        className="ms-2 px-2 py-1 rounded"
                        style={{
                            background: usuarioActual.rol === "admin" ? "var(--rojo)" : "#2a2a2a",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                        }}
                    >
                    {usuarioActual.rol}
                  </span>
                </span>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-sm btn-outline-rojo"
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}