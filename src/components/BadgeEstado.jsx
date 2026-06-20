const labels = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  listo: "Listo",
};

export default function BadgeEstado({ estado }) {
  return (
    <span className={`badge-${estado}`}>
      {labels[estado] || estado}
    </span>
  );
}