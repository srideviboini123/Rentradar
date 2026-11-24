
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProperties } from "../services/propertyService";
import {
    getSavedProperties,
    removeSavedProperty
} from "../services/savedPropertyService";
import PropertyCard from "../components/PropertyCard";
import "./SavedProperties.css";

function SavedProperties() {
    const { user } = useAuth();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load saved properties for logged-in user
    async function loadSavedProperties() {
        try {
            setLoading(true);
            setError("");

            const allProperties = await getProperties();

            const savedIds = getSavedProperties(user.id);

            const savedPropertyList = allProperties.filter(
                property => savedIds.includes(String(property.id))
            );

            setProperties(savedPropertyList);

        } catch (err) {
            setError("Unable to load saved properties.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSavedProperties();
    }, [user.id]);

    // Remove property from saved list
    function handleRemove(propertyId) {
        removeSavedProperty(user.id, propertyId);

        setProperties(previousProperties =>
            previousProperties.filter(
                property => String(property.id) !== String(propertyId)
            )
        );
    }

    return (
        <div className="saved-page">

            <section className="saved-header">
                <h1>My Saved Properties</h1>
                <p>
                    Your favorite rental homes, all in one place.
                </p>
            </section>

            <section className="saved-content">

                <div className="saved-heading">
                    <h2>Saved Homes</h2>
                    <span>{properties.length} Properties</span>
                </div>

                {loading && (
                    <p className="saved-message">
                        Loading saved properties...
                    </p>
                )}

                {error && (
                    <p className="saved-error">{error}</p>
                )}

                {!loading && !error && properties.length === 0 && (
                    <div className="saved-empty">
                        <h2>No Saved Properties Yet!</h2>
                        <p>
                            Explore properties and save your favorite homes.
                        </p>
                        <a href="/properties">
                            Explore Properties
                        </a>
                    </div>
                )}

                {!loading && !error && properties.length > 0 && (
                    <div className="saved-grid">
                        {properties.map(property => (
                            <div
                                className="saved-property-item"
                                key={property.id}
                            >
                                <PropertyCard property={property} />

                                <button
                                    className="remove-saved-button"
                                    onClick={() => handleRemove(property.id)}
                                >
                                    Remove from Saved
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </section>

        </div>
    );
}

export default SavedProperties;
