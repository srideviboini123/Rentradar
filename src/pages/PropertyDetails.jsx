
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    getProperties,
    createInquiry,
    createVisitRequest
} from "../services/propertyService";

import {
    saveProperty,
    removeSavedProperty,
    isPropertySaved
} from "../services/savedPropertyService";

import { addCompareProperty } from "../services/comparePropertyService";

import "./PropertyDetails.css";

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [compareMessage, setCompareMessage] = useState("");

    // Inquiry states
    const [inquiryMessage, setInquiryMessage] = useState("");
    const [sendingInquiry, setSendingInquiry] = useState(false);
    const [inquiryStatus, setInquiryStatus] = useState("");

    // Property visit request states
    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");
    const [visitMessage, setVisitMessage] = useState("");
    const [sendingVisitRequest, setSendingVisitRequest] = useState(false);
    const [visitStatus, setVisitStatus] = useState("");

    // Get today's date in local format (YYYY-MM-DD)
    const today = new Date();
    const minVisitDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    console.log("Logged-in User ID:", user?.id);
    console.log("Property Owner ID:", property?.ownerId);

    useEffect(() => {
        async function loadProperty() {
            try {
                const data = await getProperties();

                const selectedProperty = data.find(
                    (item) => String(item.id) === String(id)
                );

                if (selectedProperty) {
                    setProperty(selectedProperty);

                    if (isAuthenticated && user?.id) {
                        setIsSaved(
                            isPropertySaved(user.id, selectedProperty.id)
                        );
                    } else {
                        setIsSaved(false);
                    }
                } else {
                    setError("Property not found.");
                }
            } catch (err) {
                setError("Unable to load property details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadProperty();
    }, [id, user?.id, isAuthenticated]);

    // Save or Remove Property
    function handleSaveProperty() {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (isSaved) {
            removeSavedProperty(user.id, property.id);
            setIsSaved(false);
        } else {
            saveProperty(user.id, property.id);
            setIsSaved(true);
        }
    }

    // Compare Property
    function handleCompareProperty() {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (!property) {
            return;
        }

        const result = addCompareProperty(user.id, property.id);
        setCompareMessage(result.message);
    }

    // Send Inquiry to Property Owner
    async function handleSendInquiry(event) {
        event.preventDefault();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (!inquiryMessage.trim()) {
            setInquiryStatus("Please enter your message.");
            return;
        }

        if (String(user.id) === String(property.ownerId)) {
            setInquiryStatus(
                "You cannot send an inquiry for your own property."
            );
            return;
        }

        try {
            setSendingInquiry(true);
            setInquiryStatus("");

            await createInquiry({
                propertyId: property.id,
                propertyTitle: property.title,
                tenantId: user.id,
                tenantName: user.name,
                ownerId: property.ownerId,
                message: inquiryMessage.trim(),
                status: "Pending",
                createdAt: new Date().toISOString()
            });

            setInquiryMessage("");
            setInquiryStatus(
                "Your inquiry has been sent successfully!"
            );
        } catch (err) {
            console.error("Inquiry error:", err);
            setInquiryStatus(
                "Unable to send inquiry. Please try again."
            );
        } finally {
            setSendingInquiry(false);
        }
    }

    // Request a Property Visit
    async function handleSendVisitRequest(event) {
        event.preventDefault();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (String(user.id) === String(property.ownerId)) {
            setVisitStatus(
                "You cannot request a visit for your own property."
            );
            return;
        }

        if (!visitDate || !visitTime) {
            setVisitStatus("Please select a visit date and time.");
            return;
        }

        if (visitDate < minVisitDate) {
            setVisitStatus("Please select today or a future date.");
            return;
        }

        try {
            setSendingVisitRequest(true);
            setVisitStatus("");

            await createVisitRequest({
                propertyId: property.id,
                propertyTitle: property.title,
                ownerId: property.ownerId,
                tenantId: user.id,
                tenantName: user.name,
                visitDate: visitDate,
                visitTime: visitTime,
                message: visitMessage.trim(),
                status: "Pending",
                createdAt: new Date().toISOString()
            });

            setVisitDate("");
            setVisitTime("");
            setVisitMessage("");

            setVisitStatus(
                "Your property visit request has been sent successfully!"
            );
        } catch (err) {
            console.error("Visit request error:", err);
            setVisitStatus(
                "Unable to send visit request. Please try again."
            );
        } finally {
            setSendingVisitRequest(false);
        }
    }

    if (loading) {
        return <p className="details-message">Loading property details...</p>;
    }

    if (error || !property) {
        return (
            <div className="details-message">
                <h2>{error || "Property not found."}</h2>
                <Link to="/properties">Back to Properties</Link>
            </div>
        );
    }

    return (
        <div className="property-details-page">

            <div className="details-image-section">
                <img src={property.image} alt={property.title} />
            </div>

            <div className="details-container">
                <div className="details-main">

                    <span className="details-type">
                        {property.type}
                    </span>

                    <h1>{property.title}</h1>

                    <p className="details-location">
                        📍 {property.location}
                    </p>

                    <h2 className="details-rent">
                        ₹{property.rent.toLocaleString("en-IN")}
                        <span> / month</span>
                    </h2>

                    {/* Save Property */}
                    <button
                        className="save-property-button"
                        onClick={handleSaveProperty}
                    >
                        {isSaved ? "♥ Saved" : "♡ Save Property"}
                    </button>

                    {/* Compare Property */}
                    <button
                        className="compare-property-button"
                        onClick={handleCompareProperty}
                    >
                        ⚖ Add to Compare
                    </button>

                    {compareMessage && (
                        <p className="compare-feedback">
                            {compareMessage}
                        </p>
                    )}

                    <hr />

                    <h2>Property Overview</h2>

                    <div className="details-features">
                        <div>
                            <strong>{property.bedrooms}</strong>
                            <span>Bedrooms</span>
                        </div>

                        <div>
                            <strong>{property.bathrooms}</strong>
                            <span>Bathrooms</span>
                        </div>

                        <div>
                            <strong>{property.area}</strong>
                            <span>Square Feet</span>
                        </div>
                    </div>

                    <hr />

                    <h2>About This Property</h2>

                    <p className="details-description">
                        {property.description}
                    </p>

                    <hr />

                    <h2>Property Information</h2>

                    <div className="details-information">
                        <p>
                            <strong>Security Deposit:</strong>
                            ₹{property.deposit.toLocaleString("en-IN")}
                        </p>

                        <p>
                            <strong>Furnishing:</strong>
                            {property.furnishing}
                        </p>

                        <p>
                            <strong>Parking:</strong>
                            {property.parking ? "Available" : "Not Available"}
                        </p>

                        <p>
                            <strong>Available From:</strong>
                            {property.availableFrom}
                        </p>
                    </div>

                    <hr />

                    <h2>Amenities</h2>

                    <div className="details-amenities">
                        {property.amenities.map((amenity, index) => (
                            <span key={index}>{amenity}</span>
                        ))}
                    </div>

                    {/* Contact Owner */}
                    <hr />

                    <h2>Contact Owner</h2>

                    {property.ownerId ? (
                        String(user?.id) === String(property.ownerId) ? (
                            <p>You are the owner of this property.</p>
                        ) : (
                            <form
                                className="inquiry-form"
                                onSubmit={handleSendInquiry}
                            >
                                <p>
                                    Interested in this property?
                                    Send a message to the owner.
                                </p>

                                <textarea
                                    value={inquiryMessage}
                                    onChange={(event) =>
                                        setInquiryMessage(event.target.value)
                                    }
                                    placeholder="Enter your inquiry message..."
                                    rows="5"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={sendingInquiry}
                                >
                                    {sendingInquiry
                                        ? "Sending..."
                                        : "Send Inquiry"}
                                </button>

                                {inquiryStatus && (
                                    <p className="inquiry-feedback">
                                        {inquiryStatus}
                                    </p>
                                )}
                            </form>
                        )
                    ) : (
                        <p>
                            This is a demo listing. Owner contact is not available.
                        </p>
                    )}

                    {/* Request Property Visit */}
                    {property.ownerId && (
                        <>
                            <hr />

                            <h2>Request Property Visit</h2>

                            {String(user?.id) === String(property.ownerId) ? (
                                <p>
                                    You are the owner of this property.
                                    You cannot request a visit.
                                </p>
                            ) : (
                                <form
                                    className="inquiry-form"
                                    onSubmit={handleSendVisitRequest}
                                >
                                    <p>
                                        Want to see this property in person?
                                        Select your preferred visit date and time.
                                    </p>

                                    <label htmlFor="visitDate">
                                        Preferred Visit Date
                                    </label>

                                    <input
                                        type="date"
                                        id="visitDate"
                                        value={visitDate}
                                        min={minVisitDate}
                                        onChange={(event) =>
                                            setVisitDate(event.target.value)
                                        }
                                        required
                                    />

                                    <label htmlFor="visitTime">
                                        Preferred Visit Time
                                    </label>

                                    <input
                                        type="time"
                                        id="visitTime"
                                        value={visitTime}
                                        onChange={(event) =>
                                            setVisitTime(event.target.value)
                                        }
                                        required
                                    />

                                    <label htmlFor="visitMessage">
                                        Message (Optional)
                                    </label>

                                    <textarea
                                        id="visitMessage"
                                        value={visitMessage}
                                        onChange={(event) =>
                                            setVisitMessage(event.target.value)
                                        }
                                        placeholder="Any additional message for the owner..."
                                        rows="4"
                                    />

                                    <button
                                        type="submit"
                                        disabled={sendingVisitRequest}
                                    >
                                        {sendingVisitRequest
                                            ? "Submitting..."
                                            : "Request Visit"}
                                    </button>

                                    {visitStatus && (
                                        <p className="inquiry-feedback">
                                            {visitStatus}
                                        </p>
                                    )}
                                </form>
                            )}
                        </>
                    )}

                    <Link
                        to="/properties"
                        className="back-properties-button"
                    >
                        ← Back to Properties
                    </Link>

                    {property.isDemo && (
                        <p className="demo-notice">
                            Demo listing: Property information is for
                            demonstration purposes only.
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;



