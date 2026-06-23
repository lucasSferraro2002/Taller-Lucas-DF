import { Link } from "react-router-dom";
import { servicios } from "../data/data.js";

export default function Home() {
return (
<>
<section className="hero-section">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-7">
                <p style={{ color: "var(--rojo)", fontWeight: 600, letterSpacing: 3, fontSize: "0.85rem", textTransform: "uppercase" }}>
                Taller mecánico profesional
                </p>
                <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1, color: "var(--blanco)" }}>
                TALLER<br />
                <span style={{ color: "var(--rojo)" }}>LUCAS DF</span>
                </h1>
                <p className="mt-3 mb-4" style={{ color: "#aaa", fontSize: "1.05rem", maxWidth: 480 }}>
                Tu vehículo en las mejores manos. Turnos online, seguimiento en tiempo real y atención personalizada.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                    <Link to="/registro" className="btn btn-rojo btn-lg px-4">
                    Sacar turno
                    </Link>
                    <Link to="/login" className="btn btn-outline-rojo btn-lg px-4">
                    Iniciar sesión
                    </Link>
                </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                <div style={{
                     fontSize: "9rem",
                opacity: 0.12,
                userSelect: "none",
                fontFamily: "'Bebas Neue', cursive",
                lineHeight: 1,
                color: "var(--rojo)",
                letterSpacing: -4
                }}>
                🔧
            </div>
        </div>
    </div>
    </div>
</section>

<section className="py-5" style={{ background: "var(--gris-oscuro)", borderBottom: "1px solid var(--gris-claro)" }}>
<div className="container">
    <div className="row g-4 text-center">
        {[
        { numero: "+500", label: "Clientes atendidos" },
        { numero: "+12", label: "Años de experiencia" },
        { numero: "6", label: "Servicios disponibles" },
        { numero: "100%", label: "Satisfacción garantizada" },
        ].map((s) => (
        <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
                <div className="stat-number">{s.numero}</div>
                <div className="stat-label">{s.label}</div>
            </div>
        </div>
        ))}
    </div>
</div>
</section>

<section className="py-5">
    <div className="container">
        <h2 className="mb-1" style={{ fontSize: "2.5rem" }}>NUESTROS SERVICIOS</h2>
        <hr className="divider-rojo mb-4" style={{ width: 60 }} />
        <div className="row g-3">
            {servicios.map((s) => (
            <div className="col-md-6 col-lg-4" key={s.id}>
                <div className="card-taller p-3 h-100" style={{ borderLeft: "3px solid var(--rojo)" }}>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>{s.nombre}</div>
            <div className="mt-1" style={{ color: "var(--texto-muted)", fontSize: "0.85rem" }}>
            ⏱ {s.duracion}
        </div>
        <div className="mt-2" style={{ color: "var(--rojo)", fontFamily: "'Bebas Neue', cursive", fontSize: "1.4rem" }}>
        ${s.precio.toLocaleString("es-AR")}
    </div>
    </div>
    </div>
    ))}
    </div>
    </div>
</section>

<section className="py-5" style={{ background: "var(--gris-oscuro)", borderTop: "1px solid var(--gris-claro)" }}>
<div className="container text-center">
    <h2 style={{ fontSize: "2.2rem" }}>¿LISTO PARA RESERVAR?</h2>
    <p style={{ color: "#aaa" }} className="mt-2 mb-4">
    Registrate y gestioná tus turnos desde cualquier lugar.
    </p>
    <Link to="/registro" className="btn btn-rojo btn-lg px-5">
    Crear cuenta gratis
    </Link>
</div>
</section>
</>
);
}