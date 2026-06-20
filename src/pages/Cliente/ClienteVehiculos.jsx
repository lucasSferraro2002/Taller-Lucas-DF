import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTaller } from "../../context/TallerContext";

const FORM_VACIO = { marca: "", modelo: "", año: "", patente: "", color: "" };

export default function ClienteVehiculos() {
    const { usuarioActual } = useAuth();
    const { vehiculosDeUsuario, agregarVehiculo, eliminarVehiculo, turnos } = useTaller();

    const misVehiculos = vehiculosDeUsuario(usuarioActual.id);

    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState(FORM_VACIO);
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!form.marca || !form.modelo || !form.patente) {
            setError("Marca, modelo y patente son obligatorios.");
            return;
        }

        agregarVehiculo({
            usuarioId: usuarioActual.id,
            marca: form.marca,
            modelo: form.modelo,
            año: form.año ? Number(form.año) : "",
            patente: form.patente.toUpperCase(),
            color: form.color,
        });

        setForm(FORM_VACIO);
        setMostrarForm(false);
    };

    const handleEliminar = (vehiculo) => {
        const tieneTurnos = turnos.some((t) => t.vehiculoId === vehiculo.id);
        if (tieneTurnos) {
            window.alert(
                "Este vehículo tiene turnos asociados. Eliminalo desde Mis Turnos primero, o contactá al taller."
            );
            return;
        }
        const ok = window.confirm(`¿Eliminar ${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.patente})?`);
        if (ok) eliminarVehiculo(vehiculo.id);
    };

    return (
        <div className="page-wrapper container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
                <h2 style={{ fontSize: "2.2rem", margin: 0 }}>MIS VEHÍCULOS</h2>
                <button
                    className="btn btn-rojo"
                    onClick={() => setMostrarForm((v) => !v)}
                >
                    {mostrarForm ? "Cancelar" : "+ Agregar vehículo"}
                </button>
            </div>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                {misVehiculos.length} vehículo(s) registrado(s)
            </p>

            {mostrarForm && (
                <div className="card-taller p-4 mb-4">
                    {error && <div className="alert-dark-danger p-3 mb-3">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Marca
                                </label>
                                <input
                                    className="form-control form-control-dark"
                                    name="marca"
                                    value={form.marca}
                                    onChange={handleChange}
                                    placeholder="Ford"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Modelo
                                </label>
                                <input
                                    className="form-control form-control-dark"
                                    name="modelo"
                                    value={form.modelo}
                                    onChange={handleChange}
                                    placeholder="Focus"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Año
                                </label>
                                <input
                                    type="number"
                                    className="form-control form-control-dark"
                                    name="año"
                                    value={form.año}
                                    onChange={handleChange}
                                    placeholder="2020"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Patente
                                </label>
                                <input
                                    className="form-control form-control-dark"
                                    name="patente"
                                    value={form.patente}
                                    onChange={handleChange}
                                    placeholder="AB123CD"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                                    Color
                                </label>
                                <input
                                    className="form-control form-control-dark"
                                    name="color"
                                    value={form.color}
                                    onChange={handleChange}
                                    placeholder="Gris"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-rojo mt-4">
                            Guardar vehículo
                        </button>
                    </form>
                </div>
            )}

            <div className="row g-3">
                {misVehiculos.length === 0 && !mostrarForm && (
                    <p style={{ color: "#666" }}>
                        Todavía no registraste ningún vehículo. Agregá uno para poder sacar turnos.
                    </p>
                )}

                {misVehiculos.map((v) => (
                    <div className="col-md-6 col-lg-4" key={v.id}>
                        <div
                            className="card-taller p-3 h-100"
                            style={{ borderLeft: "3px solid var(--rojo)" }}
                        >
                            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                                {v.marca} {v.modelo}
                            </div>
                            <div style={{ color: "var(--texto-muted)", fontSize: "0.85rem" }}>
                                {v.año ? `${v.año} · ` : ""}
                                {v.color || "Color no especificado"}
                            </div>
                            <div
                                className="mt-2"
                                style={{
                                    fontFamily: "'Bebas Neue', cursive",
                                    fontSize: "1.3rem",
                                    color: "var(--rojo)",
                                    letterSpacing: 1,
                                }}
                            >
                                {v.patente}
                            </div>
                            <button
                                className="btn btn-sm btn-outline-rojo mt-3"
                                onClick={() => handleEliminar(v)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}