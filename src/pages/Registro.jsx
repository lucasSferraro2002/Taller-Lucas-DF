import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
    const { registrarUsuario } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "", confirmar: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (form.password !== form.confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        const result = registrarUsuario({
            nombre: form.nombre,
            email: form.email,
            telefono: form.telefono,
            password: form.password,
        });
        if (result.ok) {
            navigate("/cliente/dashboard");
        } else {
            setError(result.mensaje);
        }
    };

    return (
        <div className="page-wrapper d-flex align-items-center justify-content-center">
            <div style={{ width: "100%", maxWidth: 460 }} className="px-3">
                <div className="card-taller p-4">
                    <h2 className="mb-1" style={{ fontSize: "2rem" }}>CREAR CUENTA</h2>
                    <hr className="divider-rojo mb-4" style={{ width: 50 }} />

                    {error && <div className="alert-dark-danger p-3 mb-3">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control form-control-dark"
                                placeholder="Juan Pérez"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control form-control-dark"
                                placeholder="tu@email.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                className="form-control form-control-dark"
                                placeholder="11-1234-5678"
                                value={form.telefono}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control form-control-dark"
                                placeholder="Mínimo 6 caracteres"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Confirmar contraseña</label>
                            <input
                                type="password"
                                name="confirmar"
                                className="form-control form-control-dark"
                                placeholder="••••••••"
                                value={form.confirmar}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-rojo w-100 py-2">
                            Registrarse
                        </button>
                    </form>

                    <p className="text-center mt-3" style={{ fontSize: "0.85rem", color: "#888" }}>
                        ¿Ya tenés cuenta?{" "}
                        <Link to="/login" style={{ color: "var(--rojo)" }}>Iniciá sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}