import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const result = login(form.email, form.password);
        if (result.ok) {
            navigate(result.rol === "admin" ? "/admin/dashboard" : "/cliente/dashboard");
        } else {
            setError("Email o contraseña incorrectos.");
        }
    };

    return (
        <div className="page-wrapper d-flex align-items-center justify-content-center">
            <div style={{ width: "100%", maxWidth: 420 }} className="px-3">
                <div className="card-taller p-4">
                    <h2 className="mb-1" style={{ fontSize: "2rem" }}>INICIAR SESIÓN</h2>
                    <hr className="divider-rojo mb-4" style={{ width: 50 }} />

                    {error && <div className="alert-dark-danger p-3 mb-3">{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                        <div className="mb-4">
                            <label className="form-label" style={{ fontSize: "0.85rem", color: "#aaa" }}>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control form-control-dark"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-rojo w-100 py-2">
                            Entrar
                        </button>
                    </form>

                    <p className="text-center mt-3" style={{ fontSize: "0.85rem", color: "#888" }}>
                        ¿No tenés cuenta?{" "}
                        <Link to="/registro" style={{ color: "var(--rojo)" }}>Registrate</Link>
                    </p>

                    <hr className="divider-rojo mt-4 mb-3" />
                    <div style={{ fontSize: "0.78rem", color: "#666" }}>
                        <strong style={{ color: "#aaa" }}>Cuentas de prueba:</strong><br />
                        Admin: admin@tallerlucasdf.com / admin123<br />
                        Cliente: carlos@gmail.com / cliente123
                    </div>
                </div>
            </div>
        </div>
    );
}