export default function Footer() {
    return (
        <footer className="footer-taller">
            <div className="container">
        <span>
          © {new Date().getFullYear()} <strong style={{ color: "var(--blanco)" }}>Taller Lucas DF</strong> — Todos los derechos reservados.
        </span>
                <span className="ms-3" style={{ color: "var(--rojo)" }}>●</span>
                <span className="ms-3">Av. San Martín 1111, CABA</span>
            </div>
        </footer>
    );
}