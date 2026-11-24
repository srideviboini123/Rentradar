
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
    getProperties,
    deleteProperty
} from "../services/propertyService";

import PropertyCard from "../components/PropertyCard";

import "./MyListings.css";

function MyListings() {
    const { user } = useAuth();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMyProperties() {
            try {
                const data = await getProperties();

                const myProperties = data.filter(
                    (property) =>
                        String(property.ownerId) === String(user.id)
                );

                setProperties(myProperties);
            } catch (err) {
                setError("Unable to load your properties. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadMyProperties();
    }, [user.id]);

    // Delete property
    async function handleDelete(propertyId) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProperty(propertyId);

            setProperties((previousProperties) =>
                previousProperties.filter(
                    (property) => property.id !== propertyId
                )
            );
        } catch (err) {
            setError("Unable to delete property. Please try again.");
            console.error(err);
        }
    }

    return (
        <div className="my-listings-page">

            <div className="my-listings-header">
                <div>
                    <span>OWNER DASHBOARD</span>
                    <h1>My Listings</h1>
                    <p>Manage the properties you have listed on RentRadar.</p>
                </div>

                <Link
                    to="/owner/add-property"
                    className="add-listing-button"
                >
                    + Add New Property
                </Link>
            </div>

            {!loading && !error && (
                <div className="my-listings-count">
                    <h2>Your Properties</h2>
                    <span>{properties.length} Listings</span>
                </div>
            )}

            {loading && (
                <p className="my-listings-message">
                    Loading your properties...
                </p>
            )}

            {error && (
                <p className="my-listings-error">
                    {error}
                </p>
            )}

            {!loading && !error && properties.length === 0 && (
                <div className="my-listings-empty">
                    <h2>No Properties Listed Yet!</h2>
                    <p>
                        You haven't added any rental properties.
                        Start by listing your first property.
                    </p>

                    <Link
                        to="/owner/add-property"
                        className="add-listing-button"
                    >
                        Add Your First Property
                    </Link>
                </div>
            )}

            {!loading && !error && properties.length > 0 && (
                <div className="my-listings-grid">
                    {properties.map((property) => (
                        <div key={property.id} className="owner-listing-item">

                            <PropertyCard property={property} />

                            <Link
                                to={`/owner/edit-property/${property.id}`}
                                className="edit-property-button"
                            >
                                ✏️ Edit Property
                            </Link>

                            <button
                                type="button"
                                className="delete-property-button"
                                onClick={() => handleDelete(property.id)}
                            >
                                🗑️ Delete Property
                            </button>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default MyListings;


