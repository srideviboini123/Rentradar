
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import "./Properties.css";

function Properties() {
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Properties data states
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 2. Filter states - initialize from URL
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedLocation, setSelectedLocation] = useState(
        searchParams.get("location") || ""
    );

    const [selectedType, setSelectedType] = useState(
        searchParams.get("type") || ""
    );

    const [maxRent, setMaxRent] = useState(
        searchParams.get("maxRent") || ""
    );

    // 3. Fetch all properties from JSON Server
    useEffect(() => {
        async function loadProperties() {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (err) {
                setError("Unable to load properties. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadProperties();
    }, []);

    // 4. Filter properties
    const filteredProperties = properties.filter((property) => {
        const searchMatch =
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());

        const locationMatch =
            selectedLocation === "" ||
            property.location === selectedLocation;

        const typeMatch =
            selectedType === "" ||
            property.type === selectedType;

        const rentMatch =
            maxRent === "" ||
            property.rent <= Number(maxRent);

        return searchMatch && locationMatch && typeMatch && rentMatch;
    });

    // 5. Clear all filters
    function handleClearFilters() {
        setSearchTerm("");
        setSelectedLocation("");
        setSelectedType("");
        setMaxRent("");

        // Remove filters from URL
        setSearchParams({});
    }

    return (
        <div className="properties-page">

            {/* Page Header */}
            <section className="properties-header">
                <span>EXPLORE RENTAL HOMES</span>

                <h1>Find Your Perfect Home</h1>

                <p>
                    Discover rental properties across Hyderabad
                    that match your lifestyle and budget.
                </p>
            </section>

            <section className="properties-content">

                {/* Properties Heading */}
                <div className="properties-heading">
                    <div>
                        <h2>Available Properties</h2>
                        <p>Explore our collection of rental homes.</p>
                    </div>

                    {!loading && !error && (
                        <span className="properties-count">
                            {filteredProperties.length} Properties
                        </span>
                    )}
                </div>

                {/* Search and Filter Section */}
                <div className="properties-filters">

                    <input
                        type="text"
                        placeholder="Search by property name or location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="">All Locations</option>

                        {[...new Set(properties.map((property) => property.location))]
                            .map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All Property Types</option>

                        {[...new Set(properties.map((property) => property.type))]
                            .map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                    </select>

                    <select
                        value={maxRent}
                        onChange={(e) => setMaxRent(e.target.value)}
                    >
                        <option value="">Any Budget</option>
                        <option value="15000">Up to ₹15,000</option>
                        <option value="20000">Up to ₹20,000</option>
                        <option value="30000">Up to ₹30,000</option>
                        <option value="40000">Up to ₹40,000</option>
                        <option value="50000">Up to ₹50,000</option>
                    </select>

                    <button
                        className="clear-filters-button"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

                {/* Loading */}
                {loading && (
                    <p className="properties-message">
                        Loading properties...
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p className="properties-error">
                        {error}
                    </p>
                )}

                {/* No Results */}
                {!loading && !error && filteredProperties.length === 0 && (
                    <div className="properties-message">
                        <h3>No Properties Found!</h3>
                        <p>Try changing your search or filters.</p>
                    </div>
                )}

                {/* Property Cards */}
                {!loading && !error && filteredProperties.length > 0 && (
                    <div className="properties-grid">
                        {filteredProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>
                )}

            </section>
        </div>
    );
}

export default Properties;

