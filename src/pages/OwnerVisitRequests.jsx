
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import {
    getVisitRequests,
    updateVisitRequest
} from "../services/propertyService";

import "./OwnerVisitRequests.css";

function OwnerVisitRequests() {
    const { user } = useAuth();

    const [visitRequests, setVisitRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        async function loadVisitRequests() {
            try {
                const data = await getVisitRequests();

                const myRequests = data.filter(
                    (request) =>
                        String(request.ownerId) === String(user.id)
                );

                setVisitRequests(myRequests);
            } catch (err) {
                setError(
                    "Unable to load visit requests. Please try again."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadVisitRequests();
    }, [user.id]);

    function formatDate(date) {
        if (!date) return "Not specified";

        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    }

    function formatStatus(status) {
        return status || "Pending";
    }

    // Approve or Reject Visit Request
    async function handleUpdateStatus(requestId, newStatus) {
        try {
            setUpdatingId(requestId);
            setError("");

            const updatedRequest = await updateVisitRequest(
                requestId,
                { status: newStatus }
            );

            setVisitRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request.id === requestId
                        ? updatedRequest
                        : request
                )
            );

        } catch (err) {
            setError(
                "Unable to update visit request. Please try again."
            );
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div className="owner-visits-page">

            <div className="owner-visits-header">
                <div>
                    <span>OWNER DASHBOARD</span>
                    <h1>Property Visit Requests</h1>
                    <p>
                        View and manage visit requests submitted by
                        interested tenants.
                    </p>
                </div>
            </div>

            {!loading && !error && (
                <div className="owner-visits-count">
                    <h2>Tenant Visit Requests</h2>
                    <span>
                        {visitRequests.length} Requests
                    </span>
                </div>
            )}

            {loading && (
                <p className="owner-visits-message">
                    Loading visit requests...
                </p>
            )}

            {error && (
                <p className="owner-visits-error">
                    {error}
                </p>
            )}

            {!loading && !error && visitRequests.length === 0 && (
                <div className="owner-visits-empty">
                    <h2>No Visit Requests Yet!</h2>
                    <p>
                        You haven't received any property visit requests
                        from tenants yet.
                    </p>
                </div>
            )}

            {!loading && !error && visitRequests.length > 0 && (
                <div className="owner-visits-list">

                    {visitRequests.map((request) => {
                        const status = formatStatus(request.status);
                        const isPending = status === "Pending";

                        return (
                            <div
                                key={request.id}
                                className="owner-visit-card"
                            >

                                <div className="owner-visit-card-header">
                                    <h2>{request.propertyTitle}</h2>

                                    <span
                                        className={`visit-status ${status.toLowerCase()}`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                <div className="owner-visit-details">

                                    <p>
                                        <strong>Tenant Name:</strong>{" "}
                                        {request.tenantName || "Not available"}
                                    </p>

                                    <p>
                                        <strong>Visit Date:</strong>{" "}
                                        {formatDate(request.visitDate)}
                                    </p>

                                    <p>
                                        <strong>Visit Time:</strong>{" "}
                                        {request.visitTime || "Not specified"}
                                    </p>

                                    <p>
                                        <strong>Request Submitted:</strong>{" "}
                                        {request.createdAt
                                            ? new Date(
                                                request.createdAt
                                            ).toLocaleString()
                                            : "Not available"}
                                    </p>

                                    <div className="owner-visit-message">
                                        <strong>Tenant Message:</strong>
                                        <p>
                                            {request.message ||
                                                "No additional message provided."}
                                        </p>
                                    </div>

                                    {isPending && (
                                        <div className="visit-action-buttons">

                                            <button
                                                type="button"
                                                className="approve-visit-button"
                                                disabled={updatingId !== null}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        request.id,
                                                        "Approved"
                                                    )
                                                }
                                            >
                                                {updatingId === request.id
                                                    ? "Updating..."
                                                    : "✓ Approve"}
                                            </button>

                                            <button
                                                type="button"
                                                className="reject-visit-button"
                                                disabled={updatingId !== null}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        request.id,
                                                        "Rejected"
                                                    )
                                                }
                                            >
                                                {updatingId === request.id
                                                    ? "Updating..."
                                                    : "✕ Reject"}
                                            </button>

                                        </div>
                                    )}

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default OwnerVisitRequests;
