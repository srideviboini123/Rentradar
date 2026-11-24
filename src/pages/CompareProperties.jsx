
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProperties } from "../services/propertyService";
import {
    getCompareProperties,
    removeCompareProperty
} from "../services/comparePropertyService";
import { Link } from "react-router-dom";
import "./CompareProperties.css";

function CompareProperties() {
    const { user } = useAuth();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load comparison properties
    async function loadCompareProperties() {
        try {
            setLoading(true);
            setError("");

            const allProperties = await getProperties();

            const compareIds = getCompareProperties(user.id);

            const selectedProperties = allProperties.filter(
                property => compareIds.includes(String(property.id))
            );

            setProperties(selectedProperties);

        } catch (err) {
            setError("Unable to load comparison properties.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCompareProperties();
    }, [user.id]);

    // Remove property from comparison
    function handleRemove(propertyId) {
        removeCompareProperty(user.id, propertyId);

        setProperties(previousProperties =>
            previousProperties.filter(
                property => String(property.id) !== String(propertyId)
            )
        );
    }

    return (
        <div className="compare-page">

            {/* Header */}
            <section className="compare-header">
                <h1>Compare Properties</h1>
                <p>
                    Compare your favorite rental homes and choose the best one.
                </p>
            </section>

            {/* Comparison Content */}
            <section className="compare-content">

                <div className="compare-heading">
                    <h2>Property Comparison</h2>
                    <span>{properties.length} / 3 Properties</span>
                </div>

                {loading && (
                    <p className="compare-message">
                        Loading comparison properties...
                    </p>
                )}

                {error && (
                    <p className="compare-error">{error}</p>
                )}

                {!loading && !error && properties.length === 0 && (
                    <div className="compare-empty">
                        <h2>No Properties to Compare!</h2>
                        <p>
                            Explore properties and add homes to your comparison list.
                        </p>
                        <Link to="/properties">
                            Explore Properties
                        </Link>
                    </div>
                )}

                {!loading && !error && properties.length > 0 && (
                    <div className="compare-table-wrapper">

                        <table className="compare-table">

                            <thead>
                                <tr>
                                    <th>Property Details</th>

                                    {properties.map(property => (
                                        <th key={property.id}>
                                            <img
                                                src={property.image}
                                                alt={property.title}
                                            />

                                            <h3>{property.title}</h3>

                                            <button
                                                className="compare-remove-button"
                                                onClick={() =>
                                                    handleRemove(property.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Location</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.location}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Property Type</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.type}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Monthly Rent</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            ₹{property.rent.toLocaleString("en-IN")}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Security Deposit</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            ₹{property.deposit.toLocaleString("en-IN")}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Bedrooms</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.bedrooms}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Bathrooms</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.bathrooms}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Area</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.area} sqft
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Furnishing</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.furnishing}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Parking</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.parking
                                                ? "Available"
                                                : "Not Available"}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>Available From</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            {property.availableFrom}
                                        </td>
                                    ))}
                                </tr>

                                <tr>
                                    <td>View Property</td>
                                    {properties.map(property => (
                                        <td key={property.id}>
                                            <Link
                                                to={`/property/${property.id}`}
                                                className="compare-view-button"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>

                        </table>

                    </div>
                )}

            </section>
        </div>
    );
}

export default CompareProperties;
