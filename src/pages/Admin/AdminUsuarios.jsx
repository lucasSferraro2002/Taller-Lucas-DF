import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsuarios() {
    const { usuarios, usuarioActual, actualizarUsuario, eliminarUsuario } = useAuth();

    const [editandoId, setEditandoId] = useState(null);
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "", rol: "" });

    const handleEditar = (usuario) => {
        setEditandoId(usuario.id);
        setForm({
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono || "",
            rol: usuario.rol,
        });
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleGuardar = (id) => {
        actualizarUsuario(id, form);
        setEditandoId(null);
    };

    const handleCancelar = () => setEditandoId(null);

    const handleEliminar = (usuario) => {
        if (usuario.id === usuarioActual.id) {
            window.alert("No podés eliminar tu propio usuario mientras estás logueado.");
            return;
        }
        const ok = window.confirm(`¿Eliminar a ${usuario.nombre}?`);
        if (ok) eliminarUsuario(usuario.id);
    };

    return (
        <div className="page-wrapper container">
            <h2 className="mb-1" style={{ fontSize: "2.2rem" }}>USUARIOS</h2>
            <p style={{ color: "var(--texto-muted)" }} className="mb-4">
                Gestión de cuentas — {usuarios.length} usuarios registrados
            </p>

            <div className="card-taller p-3">
                <div className="table-responsive">
                    <table className="table tabla-taller mb-0">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map((usuario) => {
                            const editando = editandoId === usuario.id;

                            if (editando) {
                                return (
                                    <tr key={usuario.id}>
                                        <td>
                                            <input
                                                className="form-control form-control-dark"
                                                name="nombre"
                                                value={form.nombre}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="form-control form-control-dark"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="form-control form-control-dark"
                                                name="telefono"
                                                value={form.telefono}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                className="form-select form-select-dark"
                                                name="rol"
                                                value={form.rol}
                                                onChange={handleChange}
                                                disabled={usuario.id === usuarioActual.id}
                                            >
                                                <option value="admin">admin</option>
                                                <option value="cliente">cliente</option>
                                            </select>
                                        </td>
                                        <td className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-rojo"
                                                onClick={() => handleGuardar(usuario.id)}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-rojo"
                                                onClick={handleCancelar}
                                            >
                                                Cancelar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={usuario.id}>
                                    <td>
                                        {usuario.nombre}
                                        {usuario.id === usuarioActual.id && (
                                            <span
                                                className="ms-2"
                                                style={{ fontSize: "0.7rem", color: "var(--rojo)" }}
                                            >
                                                    (vos)
                                                </span>
                                        )}
                                    </td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono || "—"}</td>
                                    <td>
                                            <span
                                                style={{
                                                    background:
                                                        usuario.rol === "admin" ? "var(--rojo)" : "var(--gris-medio)",
                                                    padding: "3px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {usuario.rol}
                                            </span>
                                    </td>
                                    <td className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-rojo"
                                            onClick={() => handleEditar(usuario)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-rojo"
                                            onClick={() => handleEliminar(usuario)}
                                            disabled={usuario.id === usuarioActual.id}
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