
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    getProperties,
    getInquiries,
    getVisitRequests
} from "../services/propertyService";

import "./OwnerDashboard.css";

function OwnerDashboard() {
    const { user } = useAuth();

    const [totalListings, setTotalListings] = useState(0);
    const [activeListings, setActiveListings] = useState(0);
    const [totalInquiries, setTotalInquiries] = useState(0);
    const [totalVisitRequests, setTotalVisitRequests] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOwnerStats() {
            try {
                const [data, inquiries, visitRequests] = await Promise.all([
                    getProperties(),
                    getInquiries(),
                    getVisitRequests()
                ]);

                // Get properties belonging to the logged-in owner
                const myProperties = data.filter(
                    (property) =>
                        String(property.ownerId) === String(user.id)
                );

                setTotalListings(myProperties.length);
                setActiveListings(myProperties.length);

                // Get inquiries belonging to the logged-in owner
                const myInquiries = inquiries.filter(
                    (inquiry) =>
                        String(inquiry.ownerId) === String(user.id)
                );

                setTotalInquiries(myInquiries.length);

                // Get visit requests belonging to the logged-in owner
                const myVisitRequests = visitRequests.filter(
                    (request) =>
                        String(request.ownerId) === String(user.id)
                );

                setTotalVisitRequests(myVisitRequests.length);

            } catch (err) {
                console.error(
                    "Unable to load dashboard statistics:",
                    err
                );

                setError(
                    "Unable to load dashboard statistics. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        if (user?.id) {
            loadOwnerStats();
        }
    }, [user?.id]);

    return (
        <div className="owner-dashboard">

            {/* Welcome Section */}
            <div className="owner-welcome">
                <div>
                    <p className="dashboard-label">
                        PROPERTY OWNER DASHBOARD
                    </p>

                    <h1>Welcome back, {user?.name}!</h1>

                    <p>
                        Manage your rental listings and connect
                        with potential tenants.
                    </p>
                </div>

                <Link
                    to="/owner/add-property"
                    className="owner-primary-btn"
                >
                    + Add New Property
                </Link>
            </div>

            {/* Statistics Section */}
            <div className="owner-stats-grid">

                <div className="owner-stat-card">
                    <h3>{loading ? "..." : totalListings}</h3>
                    <p>Total Listings</p>
                </div>

                <div className="owner-stat-card">
                    <h3>{loading ? "..." : activeListings}</h3>
                    <p>Active Listings</p>
                </div>

                <div className="owner-stat-card">
                    <h3>{loading ? "..." : totalInquiries}</h3>
                    <p>Total Inquiries</p>
                </div>

                <div className="owner-stat-card">
                    <h3>{loading ? "..." : totalVisitRequests}</h3>
                    <p>Visit Requests</p>
                </div>

            </div>

            {error && (
                <p className="dashboard-error">{error}</p>
            )}

            {/* Quick Actions */}
            <div className="owner-section">

                <h2>Manage Your Properties</h2>

                <div className="owner-dashboard-grid">

                    <div className="owner-dashboard-card">
                        <h3>My Listings</h3>

                        <p>
                            View and manage all your rental property listings.
                        </p>

                        <Link to="/owner/properties">
                            View My Listings →
                        </Link>
                    </div>

                    <div className="owner-dashboard-card">
                        <h3>Add New Property</h3>

                        <p>
                            List your rental property and reach potential tenants.
                        </p>

                        <Link to="/owner/add-property">
                            Add Property →
                        </Link>
                    </div>

                    <div className="owner-dashboard-card">
                        <h3>Tenant Inquiries</h3>

                        <p>
                            Check messages and inquiries from interested tenants.
                        </p>

                        <Link to="/owner/inquiries">
                            View Tenant Inquiries →
                        </Link>
                    </div>

                    <div className="owner-dashboard-card">
                        <h3>Visit Requests</h3>

                        <p>
                            Manage property visit requests submitted by tenants.
                        </p>

                        <Link to="/owner/visit-requests">
                            View Visit Requests →
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard;



