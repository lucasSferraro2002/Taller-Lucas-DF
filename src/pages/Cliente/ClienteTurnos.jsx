import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTaller } from "../../context/TallerContext";
import BadgeEstado from "../../components/BadgeEstado";

const FORM_VACIO = { vehiculoId: "", servicioId: "", fecha: "", hora: "", notas: "" };

export default function ClienteTurnos() {
    const { usuarioActual } = useAuth();
    const {
        turnosDeUsuario,
        vehiculosDeUsuario,
        servicios,
        vehiculos,
        agregarTurno,
        eliminarTurno,
    } = useTaller();

    const misTurnos = turnosDeUsuario(usuarioActual.id).sort((a, b) =>
        (b.fecha + b.hora).localeCompare(a.fecha + a.hora)
    );
    const misVehiculos = vehiculosDeUsuario(usuarioActual.id);

    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState(FORM_VACIO);
    const [error, setError] = useState("");

    const getVehiculo = (id) => vehiculos.find((v) => v.id === id);
    const getServicio = (id) => servicios.find((s) => s.id === id);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!form.vehiculoId || !form.servicioId || !form.fecha || !form.hora) {
            setError("Completá vehículo, servicio, fecha y hora.");
            return;
        }

        const hoy = new Date().toISOString().split("T")[0];
        if (form.fecha < hoy) {
            setError("La fecha no puede ser anterior a hoy.");
            return;
        }

        agregarTurno({
            usuarioId: usuarioActual.id,
            vehiculoId: Number(form.vehiculoId),
            servicioId: Number(form.servicioId),
            fecha: form.fecha,
            hora: form.hora,
            notas: form.notas,
        });

        setForm(FORM_VACIO);
        setMostrarForm(false);
    };

    const handleEliminar = (turno) => {
        if (turno.estado !== "pendiente") {
            window.alert("Solo podés cancelar turnos que todavía estén pendientes.");
            return;
        }
        const ok = window.confirm("¿Cancelar este turno?");
        if (ok) eliminarTurno(turno.id);
    };

    return (
        <div className="page-wrapper container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
                <h2 style={{ fontSize: "2.2rem", margin: 0 }}>MIS TURNOS</h2>
                <button
                    className="btn btn-rojo"
                    onClick={() => setMostrarForm((v) => !v)}
                    disabled={misVehiculos.length === 0}
                    title={misVehiculos.length === 0 ? "Primero agregá un vehículo" : ""}
                >
                    {mostrarForm ? "Cancelar" : "+ Sacar turno"}
                </button>
            </div>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                {misTurnos.length} turno(s) registrado(s)
            </p>

            {misVehiculos.length === 0 && (
                <div className="alert-dark-danger p-3 mb-4">
                    Necesitás registrar al menos un vehículo antes de poder sacar un turno.
                </div>
            )}

            {mostrarForm && (
                <div className="card-taller p-4 mb-4">
                    {error && <div className="alert-dark-danger p-3 mb-3">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Vehículo
                                </label>
                                <select
                                    className="form-select form-select-dark"
                                    name="vehiculoId"
                                    value={form.vehiculoId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar...</option>
                                    {misVehiculos.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.marca} {v.modelo} ({v.patente})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Servicio
                                </label>
                                <select
                                    className="form-select form-select-dark"
                                    name="servicioId"
                                    value={form.servicioId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar...</option>
                                    {servicios.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nombre} — ${s.precio.toLocaleString("es-AR")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-control-dark"
                                    name="fecha"
                                    value={form.fecha}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Hora
                                </label>
                                <input
                                    type="time"
                                    className="form-control form-control-dark"
                                    name="hora"
                                    value={form.hora}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Notas (opcional)
                                </label>
                                <textarea
                                    className="form-control form-control-dark"
                                    name="notas"
                                    rows={2}
                                    value={form.notas}
                                    onChange={handleChange}
                                    placeholder="Algo que el taller deba saber..."
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-rojo mt-4">
                            Confirmar turno
                        </button>
                    </form>
                </div>
            )}

            <div className="card-taller p-3">
                <div className="table-responsive">
                    <table className="table tabla-taller mb-0">
                        <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Vehículo</th>
                            <th>Servicio</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {misTurnos.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4" style={{ color: "#666" }}>
                                    No tenés turnos registrados todavía.
                                </td>
                            </tr>
                        )}
                        {misTurnos.map((turno) => {
                            const vehiculo = getVehiculo(turno.vehiculoId);
                            const servicio = getServicio(turno.servicioId);
                            return (
                                <tr key={turno.id}>
                                    <td>{turno.fecha}</td>
                                    <td>{turno.hora}</td>
                                    <td>
                                        {vehiculo
                                            ? `${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.patente})`
                                            : "—"}
                                    </td>
                                    <td>{servicio?.nombre || "—"}</td>
                                    <td>
                                        <BadgeEstado estado={turno.estado} />
                                    </td>
                                    <td>
                                        {turno.estado === "pendiente" && (
                                            <button
                                                className="btn btn-sm btn-outline-rojo"
                                                onClick={() => handleEliminar(turno)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
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