export const usuariosIniciales = [
    {
        id: 1,
        nombre: "Lucas Admin",
        email: "admin@tallerlucasdf.com",
        password: "admin123",
        rol: "admin",
        telefono: "11-4444-5555",
    },
    {
        id: 2,
        nombre: "Carlos Pérez",
        email: "carlos@gmail.com",
        password: "cliente123",
        rol: "cliente",
        telefono: "11-2222-3333",
    },
    {
        id: 3,
        nombre: "Martina López",
        email: "martina@gmail.com",
        password: "cliente123",
        rol: "cliente",
        telefono: "11-6666-7777",
    },
];

export const vehiculosIniciales = [
    {
        id: 1,
        usuarioId: 2,
        marca: "Ford",
        modelo: "Focus",
        año: 2019,
        patente: "AB123CD",
        color: "Gris",
    },
    {
        id: 2,
        usuarioId: 2,
        marca: "Chevrolet",
        modelo: "Onix",
        año: 2021,
        patente: "EF456GH",
        color: "Blanco",
    },
    {
        id: 3,
        usuarioId: 3,
        marca: "Toyota",
        modelo: "Corolla",
        año: 2020,
        patente: "IJ789KL",
        color: "Negro",
    },
];

export const servicios = [
    { id: 1, nombre: "Cambio de aceite", precio: 8500, duracion: "1 hora" },
    { id: 2, nombre: "Alineación y balanceo", precio: 12000, duracion: "1.5 horas" },
    { id: 3, nombre: "Frenos", precio: 25000, duracion: "3 horas" },
    { id: 4, nombre: "Revisión general", precio: 15000, duracion: "2 horas" },
    { id: 5, nombre: "Cambio de correa", precio: 35000, duracion: "4 horas" },
    { id: 6, nombre: "Diagnóstico electrónico", precio: 9000, duracion: "1 hora" },
];

export const turnosIniciales = [
    {
        id: 1,
        usuarioId: 2,
        vehiculoId: 1,
        servicioId: 1,
        fecha: "2026-06-22",
        hora: "09:00",
        estado: "pendiente",
        notas: "El aceite lleva 8000km",
    },
    {
        id: 2,
        usuarioId: 3,
        vehiculoId: 3,
        servicioId: 4,
        fecha: "2026-06-22",
        hora: "11:00",
        estado: "en_proceso",
        notas: "",
    },
    {
        id: 3,
        usuarioId: 2,
        vehiculoId: 2,
        servicioId: 2,
        fecha: "2026-06-20",
        hora: "10:00",
        estado: "listo",
        notas: "Vibración al frenar",
    },
];