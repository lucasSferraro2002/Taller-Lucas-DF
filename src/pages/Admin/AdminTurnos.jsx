import { useTaller } from "../../context/TallerContext";
import { useAuth } from "../../context/AuthContext";
import BadgeEstado from "../../components/BadgeEstado";

export default function AdminTurnos() {
    const { turnos, vehiculos, servicios, actualizarEstadoTurno, eliminarTurno } =
        useTaller();
    const { usuarios } = useAuth();

    const getVehiculo = (id) => vehiculos.find((v) => v.id === id);
    const getServicio = (id) => servicios.find((s) => s.id === id);
    const getUsuario = (id) => usuarios.find((u) => u.id === id);

    const turnosOrdenados = [...turnos].sort((a, b) =>
        (a.fecha + a.hora).localeCompare(b.fecha + b.hora)
    );

    const handleEliminar = (turno) => {
        const ok = window.confirm(
            `¿Eliminar el turno de ${getVehiculo(turno.vehiculoId)?.patente || "vehículo"}?`
        );
        if (ok) eliminarTurno(turno.id);
    };

    return (
        <div className="page-wrapper container">
            <h2 className="mb-1" style={{ fontSize: "2.2rem" }}>TURNOS</h2>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                Listado completo — {turnos.length} turnos
            </p>

            <div className="card-taller p-3">
                <div className="table-responsive">
                    <table className="table tabla-taller mb-0">
                        <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Cliente</th>
                            <th>Vehículo</th>
                            <th>Servicio</th>
                            <th>Notas</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {turnosOrdenados.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-4" style={{ color: "#666" }}>
                                    No hay turnos cargados.
                                </td>
                            </tr>
                        )}

                        {turnosOrdenados.map((turno) => {
                            const vehiculo = getVehiculo(turno.vehiculoId);
                            const servicio = getServicio(turno.servicioId);
                            const usuario = getUsuario(turno.usuarioId);

                            return (
                                <tr key={turno.id}>
                                    <td>{turno.fecha}</td>
                                    <td>{turno.hora}</td>
                                    <td>{usuario?.nombre || "—"}</td>
                                    <td>
                                        {vehiculo
                                            ? `${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.patente})`
                                            : "—"}
                                    </td>
                                    <td>{servicio?.nombre || "—"}</td>
                                    <td style={{ maxWidth: 180, fontSize: "0.82rem", color: "var(--texto-muted)" }}>
                                        {turno.notas || "—"}
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-dark"
                                            style={{ minWidth: 130, fontSize: "0.82rem" }}
                                            value={turno.estado}
                                            onChange={(e) =>
                                                actualizarEstadoTurno(turno.id, e.target.value)
                                            }
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en_proceso">En proceso</option>
                                            <option value="listo">Listo</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-rojo"
                                            onClick={() => handleEliminar(turno)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}