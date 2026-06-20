import { createContext, useContext, useState, useEffect } from "react";
import { turnosIniciales, vehiculosIniciales, servicios } from "../data/data.js";

const TallerContext = createContext();

export function TallerProvider({ children }) {
    const [turnos, setTurnos] = useState(() => {
        const guardados = localStorage.getItem("taller_turnos");
        return guardados ? JSON.parse(guardados) : turnosIniciales;
    });

    const [vehiculos, setVehiculos] = useState(() => {
        const guardados = localStorage.getItem("taller_vehiculos");
        return guardados ? JSON.parse(guardados) : vehiculosIniciales;
    });

    useEffect(() => {
        localStorage.setItem("taller_turnos", JSON.stringify(turnos));
    }, [turnos]);

    useEffect(() => {
        localStorage.setItem("taller_vehiculos", JSON.stringify(vehiculos));
    }, [vehiculos]);

    // --- TURNOS ---
    const agregarTurno = (turno) => {
        const nuevo = { ...turno, id: Date.now(), estado: "pendiente" };
        setTurnos((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const actualizarEstadoTurno = (id, estado) => {
        setTurnos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, estado } : t))
        );
    };

    const eliminarTurno = (id) => {
        setTurnos((prev) => prev.filter((t) => t.id !== id));
    };

    const turnosDeUsuario = (usuarioId) =>
        turnos.filter((t) => t.usuarioId === usuarioId);

    // --- VEHICULOS ---
    const agregarVehiculo = (vehiculo) => {
        const nuevo = { ...vehiculo, id: Date.now() };
        setVehiculos((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const eliminarVehiculo = (id) => {
        setVehiculos((prev) => prev.filter((v) => v.id !== id));
    };

    const vehiculosDeUsuario = (usuarioId) =>
        vehiculos.filter((v) => v.usuarioId === usuarioId);

    return (
        <TallerContext.Provider
            value={{
                turnos,
                vehiculos,
                servicios,
                agregarTurno,
                actualizarEstadoTurno,
                eliminarTurno,
                turnosDeUsuario,
                agregarVehiculo,
                eliminarVehiculo,
                vehiculosDeUsuario,
            }}
        >
            {children}
        </TallerContext.Provider>
    );
}

export function useTaller() {
    return useContext(TallerContext);
}