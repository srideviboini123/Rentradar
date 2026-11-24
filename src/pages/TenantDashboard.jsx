
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getVisitRequests } from "../services/propertyService";
import "./TenantDashboard.css";

function TenantDashboard() {
    const { user } = useAuth();

    const [visitRequests, setVisitRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchVisitRequests() {
            try {
                const data = await getVisitRequests();

                const tenantRequests = data.filter(
                    (request) =>
                        String(request.tenantId) === String(user?.id)
                );

                setVisitRequests(tenantRequests);
            } catch (err) {
                setError("Unable to load your visit requests.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (user?.id) {
            fetchVisitRequests();
        }
    }, [user?.id]);

    return (
        <div className="tenant-dashboard">

            {/* Dashboard Welcome */}
            <div className="tenant-welcome">
                <div>
                    <p className="dashboard-label">
                        TENANT DASHBOARD
                    </p>

                    <h1>
                        Welcome back, {user?.name}!
                    </h1>

                    <p>
                        Find your perfect rental home and
                        manage your property activities.
                    </p>
                </div>

                <Link to="/properties" className="dashboard-primary-btn">
                    Explore Properties
                </Link>
            </div>

            {/* Dashboard Quick Actions */}
            <div className="tenant-dashboard-grid">

                <div className="tenant-dashboard-card">
                    <h3>Saved Properties</h3>
                    <p>
                        View the properties you have saved
                        for later.
                    </p>
                    <Link to="/saved">View Saved Properties →</Link>
                </div>

                <div className="tenant-dashboard-card">
                    <h3>Compare Homes</h3>
                    <p>
                        Compare different rental properties
                        before making a decision.
                    </p>
                    <Link to="/compare">Compare Properties →</Link>
                </div>

                <div className="tenant-dashboard-card">
                    <h3>Visit Bookings</h3>
                    <p>
                        Your property visit requests:
                        <strong> {visitRequests.length}</strong>
                    </p>
                    <a href="#my-visit-requests">
                        View Visit Requests →
                    </a>
                </div>

                <div className="tenant-dashboard-card">
                    <h3>Contact Owners</h3>
                    <p>
                        Explore rental properties and
                        connect with property owners.
                    </p>
                    <Link to="/properties">Browse Properties →</Link>
                </div>

            </div>

            {/* Tenant Visit Requests */}
            <section className="tenant-visit-section" id="my-visit-requests">
                <h2>My Property Visit Requests</h2>

                {loading ? (
                    <p>Loading visit requests...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : visitRequests.length === 0 ? (
                    <p>You have not requested any property visits yet.</p>
                ) : (
                    <div className="tenant-visit-list">
                        {visitRequests.map((request) => (
                            <div className="tenant-visit-card" key={request.id}>
                                <h3>{request.propertyTitle}</h3>

                                <p>
                                    <strong>Visit Date:</strong>{" "}
                                    {request.visitDate}
                                </p>

                                <p>
                                    <strong>Visit Time:</strong>{" "}
                                    {request.visitTime}
                                </p>

                                <p>
                                    <strong>Message:</strong>{" "}
                                    {request.message || "No message"}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`visit-status ${request.status?.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}

export default TenantDashboard;


