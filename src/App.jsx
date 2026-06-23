import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTurnos from "./pages/admin/AdminTurnos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import ClienteDashboard from "./pages/cliente/ClienteDashboard";
import ClienteTurnos from "./pages/cliente/ClienteTurnos";
import ClienteVehiculos from "./pages/cliente/ClienteVehiculos";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />

                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute rol="admin">
                            { <AdminDashboard /> }
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/turnos"
                    element={
                        <PrivateRoute rol="admin">
                            { <AdminTurnos /> }
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <PrivateRoute rol="admin">
                            { <AdminUsuarios /> }
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/cliente/dashboard"
                    element={
                        <PrivateRoute rol="cliente">
                            { <ClienteDashboard /> }
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cliente/turnos"
                    element={
                        <PrivateRoute rol="cliente">
                            { <ClienteTurnos /> }
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cliente/vehiculos"
                    element={
                        <PrivateRoute rol="cliente">
                            { <ClienteVehiculos /> }
                        </PrivateRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;