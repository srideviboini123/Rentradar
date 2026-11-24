
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import AddProperty from "./pages/AddProperty";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import CompareProperties from "./pages/CompareProperties";
import SavedProperties from "./pages/SavedProperties";

import Login from "./pages/Login";
import Register from "./pages/Register";

import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import MyListings from "./pages/MyListings";
import EditProperty from "./pages/EditProperty";
import OwnerVisitRequests from "./pages/OwnerVisitRequests";
import OwnerInquiries from "./pages/OwnerInquiries";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />

                <Route
                    path="/properties"
                    element={<Properties />}
                />

                <Route
                    path="/property/:id"
                    element={<PropertyDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/saved"
                        element={<SavedProperties />}
                    />

                    <Route
                        path="/compare"
                        element={<CompareProperties />}
                    />

                    {/* Tenant Routes */}
                    <Route
                        element={
                            <ProtectedRoute allowedRoles={["tenant"]} />
                        }
                    >
                        <Route
                            path="/tenant-dashboard"
                            element={<TenantDashboard />}
                        />
                    </Route>

                    {/* Owner Routes */}
                    <Route
                        element={
                            <ProtectedRoute allowedRoles={["owner"]} />
                        }
                    >
                        <Route
                            path="/owner-dashboard"
                            element={<OwnerDashboard />}
                        />

                        <Route
                            path="/owner/add-property"
                            element={<AddProperty />}
                        />

                        <Route
                            path="/owner/properties"
                            element={<MyListings />}
                        />

                        <Route
                            path="/owner/edit-property/:id"
                            element={<EditProperty />}
                        />

                        {/* Owner Visit Requests */}
                        <Route
                            path="/owner/visit-requests"
                            element={<OwnerVisitRequests />}
                        />

                        {/* Owner Tenant Inquiries */}
                        <Route
                            path="/owner/inquiries"
                            element={<OwnerInquiries />}
                        />

                    </Route>

                </Route>

            </Routes>

            <Footer />
        </>
    );
}

export default App;









