import { useTaller } from "../../context/TallerContext";
import { useAuth } from "../../context/AuthContext";
import BadgeEstado from "../../components/BadgeEstado";

const COLUMNAS = [
    { estado: "pendiente", titulo: "PENDIENTE" },
    { estado: "en_proceso", titulo: "EN PROCESO" },
    { estado: "listo", titulo: "LISTO" },
];

export default function AdminDashboard() {
    const { turnos, vehiculos, servicios, actualizarEstadoTurno } = useTaller();
    const { usuarios } = useAuth();

    const getVehiculo = (id) => vehiculos.find((v) => v.id === id);
    const getServicio = (id) => servicios.find((s) => s.id === id);
    const getUsuario = (id) => usuarios.find((u) => u.id === id);

    const turnosPorEstado = (estado) =>
        turnos
            .filter((t) => t.estado === estado)
            .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

    const avanzarEstado = (turno) => {
        const orden = ["pendiente", "en_proceso", "listo"];
        const i = orden.indexOf(turno.estado);
        if (i < orden.length - 1) {
            actualizarEstadoTurno(turno.id, orden[i + 1]);
        }
    };

    return (
        <div className="page-wrapper container">
            <h2 className="mb-1" style={{ fontSize: "2.2rem" }}>DASHBOARD</h2>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                Vista general de turnos en taller — {turnos.length} turnos totales
            </p>

            <div className="row g-3 mb-4">
                {COLUMNAS.map((col) => (
                    <div className="col-12 col-md-4" key={col.estado}>
                        <div
                            className="card-taller p-3 h-100"
                            style={{ borderTop: "3px solid var(--rojo)" }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{col.titulo}</h3>
                                <span
                                    style={{
                                        background: "var(--gris-medio)",
                                        color: "var(--blanco)",
                                        borderRadius: "20px",
                                        padding: "2px 10px",
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {turnosPorEstado(col.estado).length}
                                </span>
                            </div>

                            <div className="d-flex flex-column gap-2">
                                {turnosPorEstado(col.estado).length === 0 && (
                                    <p style={{ color: "#666", fontSize: "0.85rem" }}>
                                        Sin turnos en este estado.
                                    </p>
                                )}

                                {turnosPorEstado(col.estado).map((turno) => {
                                    const vehiculo = getVehiculo(turno.vehiculoId);
                                    const servicio = getServicio(turno.servicioId);
                                    const usuario = getUsuario(turno.usuarioId);

                                    return (
                                        <div
                                            key={turno.id}
                                            className="p-2"
                                            style={{
                                                background: "var(--gris-medio)",
                                                border: "1px solid var(--gris-claro)",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                                                    {vehiculo
                                                        ? `${vehiculo.marca} ${vehiculo.modelo}`
                                                        : "Vehículo eliminado"}
                                                </div>
                                                <BadgeEstado estado={turno.estado} />
                                            </div>

                                            <div style={{ fontSize: "0.78rem", color: "var(--texto-muted)" }}>
                                                {vehiculo?.patente} · {usuario?.nombre || "Cliente eliminado"}
                                            </div>

                                            <div style={{ fontSize: "0.82rem", marginTop: 4 }}>
                                                {servicio?.nombre || "Servicio no especificado"}
                                            </div>

                                            <div style={{ fontSize: "0.75rem", color: "var(--texto-muted)" }}>
                                                📅 {turno.fecha} — {turno.hora}
                                            </div>

                                            {turno.estado !== "listo" && (
                                                <button
                                                    className="btn btn-sm btn-outline-rojo w-100 mt-2"
                                                    style={{ fontSize: "0.75rem" }}
                                                    onClick={() => avanzarEstado(turno)}
                                                >
                                                    Avanzar →{" "}
                                                    {turno.estado === "pendiente" ? "En proceso" : "Listo"}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}