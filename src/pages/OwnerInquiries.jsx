
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInquiries } from "../services/propertyService";
import "./OwnerInquiries.css";

function OwnerInquiries() {
    const { user } = useAuth();

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadInquiries() {
            try {
                const data = await getInquiries();

                const myInquiries = data.filter(
                    (inquiry) =>
                        String(inquiry.ownerId) === String(user.id)
                );

                setInquiries(myInquiries);
            } catch (err) {
                console.error("Unable to load inquiries:", err);
                setError("Unable to load tenant inquiries. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        if (user?.id) {
            loadInquiries();
        }
    }, [user?.id]);

    return (
        <div className="owner-inquiries-page">

            <div className="owner-inquiries-header">
                <p className="dashboard-label">OWNER DASHBOARD</p>
                <h1>Tenant Inquiries</h1>
                <p>
                    View messages and inquiries from tenants interested
                    in your rental properties.
                </p>
            </div>

            <div className="owner-inquiries-section">
                <h2>Received Inquiries</h2>

                <p className="inquiry-count">
                    {inquiries.length} Inquiries
                </p>

                {loading && (
                    <p>Loading inquiries...</p>
                )}

                {error && (
                    <p className="dashboard-error">{error}</p>
                )}

                {!loading && !error && inquiries.length === 0 && (
                    <div className="no-inquiries">
                        <h3>No Inquiries Yet</h3>
                        <p>
                            Tenant messages about your properties
                            will appear here.
                        </p>
                    </div>
                )}

                {!loading && !error && inquiries.map((inquiry) => (
                    <div className="owner-inquiry-card" key={inquiry.id}>

                        <div className="inquiry-card-header">
                            <h3>{inquiry.propertyTitle}</h3>

                            <span className="inquiry-status">
                                {inquiry.status}
                            </span>
                        </div>

                        <p>
                            <strong>Tenant Name:</strong>{" "}
                            {inquiry.tenantName}
                        </p>

                        <p>
                            <strong>Message:</strong>
                        </p>

                        <p className="inquiry-message">
                            {inquiry.message}
                        </p>

                        <p>
                            <strong>Request Submitted:</strong>{" "}
                            {inquiry.createdAt
                                ? new Date(inquiry.createdAt).toLocaleString()
                                : "Not available"}
                        </p>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default OwnerInquiries;
