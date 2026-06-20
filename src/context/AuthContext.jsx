import { createContext, useContext, useState, useEffect } from "react";
import { usuariosIniciales } from "../data/data.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [usuarios, setUsuarios] = useState(() => {
        const guardados = localStorage.getItem("taller_usuarios");
        return guardados ? JSON.parse(guardados) : usuariosIniciales;
    });

    useEffect(() => {
        const sesion = localStorage.getItem("taller_sesion");
        if (sesion) setUsuarioActual(JSON.parse(sesion));
    }, []);

    useEffect(() => {
        localStorage.setItem("taller_usuarios", JSON.stringify(usuarios));
    }, [usuarios]);

    const login = (email, password) => {
        const user = usuarios.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            setUsuarioActual(user);
            localStorage.setItem("taller_sesion", JSON.stringify(user));
            return { ok: true, rol: user.rol };
        }
        return { ok: false };
    };

    const logout = () => {
        setUsuarioActual(null);
        localStorage.removeItem("taller_sesion");
    };

    const registrarUsuario = (nuevoUsuario) => {
        const existe = usuarios.find((u) => u.email === nuevoUsuario.email);
        if (existe) return { ok: false, mensaje: "El email ya está registrado." };
        const user = {
            ...nuevoUsuario,
            id: Date.now(),
            rol: "cliente",
        };
        setUsuarios((prev) => [...prev, user]);
        setUsuarioActual(user);
        localStorage.setItem("taller_sesion", JSON.stringify(user));
        return { ok: true };
    };

    const actualizarUsuario = (id, datos) => {
        const actualizados = usuarios.map((u) =>
            u.id === id ? { ...u, ...datos } : u
        );
        setUsuarios(actualizados);
        if (usuarioActual?.id === id) {
            const actualizado = actualizados.find((u) => u.id === id);
            setUsuarioActual(actualizado);
            localStorage.setItem("taller_sesion", JSON.stringify(actualizado));
        }
    };

    const eliminarUsuario = (id) => {
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <AuthContext.Provider
            value={{
                usuarioActual,
                usuarios,
                login,
                logout,
                registrarUsuario,
                actualizarUsuario,
                eliminarUsuario,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}