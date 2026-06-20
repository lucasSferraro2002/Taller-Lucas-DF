import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTaller } from "../../context/TallerContext";
import BadgeEstado from "../../components/BadgeEstado";

export default function ClienteDashboard() {
    const { usuarioActual } = useAuth();
    const { turnosDeUsuario, vehiculosDeUsuario, servicios, vehiculos } = useTaller();

    const misTurnos = turnosDeUsuario(usuarioActual.id);
    const misVehiculos = vehiculosDeUsuario(usuarioActual.id);

    const proximoTurno = [...misTurnos]
        .filter((t) => t.estado !== "listo")
        .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))[0];

    const getVehiculo = (id) => vehiculos.find((v) => v.id === id);
    const getServicio = (id) => servicios.find((s) => s.id === id);

    const pendientes = misTurnos.filter((t) => t.estado === "pendiente").length;
    const enProceso = misTurnos.filter((t) => t.estado === "en_proceso").length;
    const listos = misTurnos.filter((t) => t.estado === "listo").length;

    return (
        <div className="page-wrapper container">
            <h2 className="mb-1" style={{ fontSize: "2.2rem" }}>
                HOLA, {usuarioActual.nombre.split(" ")[0].toUpperCase()}
            </h2>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                Este es el resumen de tu cuenta en Taller Lucas DF
            </p>

            {proximoTurno ? (
                <div
                    className="card-taller p-4 mb-4"
                    style={{ borderLeft: "4px solid var(--rojo)" }}
                >
                    <div style={{ fontSize: "0.78rem", color: "var(--rojo)", fontWeight: 600, letterSpacing: 1 }}>
                        PRÓXIMO TURNO
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-2">
                        <div>
                            <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                                {getServicio(proximoTurno.servicioId)?.nombre}
                            </div>
                            <div style={{ color: "var(--texto-muted)" }}>
                                {getVehiculo(proximoTurno.vehiculoId)?.marca}{" "}
                                {getVehiculo(proximoTurno.vehiculoId)?.modelo} ·{" "}
                                {proximoTurno.fecha} — {proximoTurno.hora}
                            </div>
                        </div>
                        <BadgeEstado estado={proximoTurno.estado} />
                    </div>
                </div>
            ) : (
                <div className="card-taller p-4 mb-4 text-center">
                    <p style={{ color: "var(--texto-muted)", margin: 0 }}>
                        No tenés turnos próximos.
                    </p>
                    <Link to="/cliente/turnos" className="btn btn-rojo mt-3">
                        Sacar un turno
                    </Link>
                </div>
            )}

            <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                    <div className="stat-card">
                        <div className="stat-number">{misVehiculos.length}</div>
                        <div className="stat-label">Vehículos</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stat-card">
                        <div className="stat-number">{pendientes}</div>
                        <div className="stat-label">Pendientes</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stat-card">
                        <div className="stat-number">{enProceso}</div>
                        <div className="stat-label">En proceso</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stat-card">
                        <div className="stat-number">{listos}</div>
                        <div className="stat-label">Listos</div>
                    </div>
                </div>
            </div>

            <h3 className="mb-3" style={{ fontSize: "1.4rem" }}>MIS VEHÍCULOS</h3>
            <div className="row g-3">
                {misVehiculos.length === 0 && (
                    <p style={{ color: "#666" }}>
                        No registraste vehículos todavía.{" "}
                        <Link to="/cliente/vehiculos" style={{ color: "var(--rojo)" }}>
                            Agregá uno
                        </Link>
                        .
                    </p>
                )}
                {misVehiculos.map((v) => (
                    <div className="col-md-4" key={v.id}>
                        <div className="card-taller p-3" style={{ borderLeft: "3px solid var(--rojo)" }}>
                            <div style={{ fontWeight: 700 }}>
                                {v.marca} {v.modelo}
                            </div>
                            <div style={{ color: "var(--texto-muted)", fontSize: "0.85rem" }}>
                                {v.patente}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}