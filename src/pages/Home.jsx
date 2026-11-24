
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProperties } from "../services/propertyService";
import "./Home.css";
import PropertyCard from "../components/PropertyCard";
function Home() {
    const navigate = useNavigate();

    // Store all properties
    const [properties, setProperties] = useState([]);

    // Store selected filter values
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [maxRent, setMaxRent] = useState("");

    // Fetch properties from JSON Server
    useEffect(() => {
        async function loadProperties() {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                console.error("Error loading properties:", error);
            }
        }

        loadProperties();
    }, []);

    // Navigate to Properties page with selected filters
    function handleSearch() {
        const params = new URLSearchParams();

        if (selectedLocation) {
            params.set("location", selectedLocation);
        }

        if (selectedType) {
            params.set("type", selectedType);
        }

        if (maxRent) {
            params.set("maxRent", maxRent);
        }

        const queryString = params.toString();

        navigate(
            queryString
                ? `/properties?${queryString}`
                : "/properties"
        );
    }

    // Clear all selected filters
    function handleClearFilters() {
        setSelectedLocation("");
        setSelectedType("");
        setMaxRent("");
    }

    return (
        <div className="home">

            {/* Hero Section */}
            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        FIND YOUR HAPPY PLACE
                    </span>

                    <h1>
                        Find a place
                        <br />
                        you'll love to
                        <span> call home.</span>
                    </h1>

                    <p>
                        Discover beautiful houses and apartments
                        that match your lifestyle and budget.
                    </p>

                    <Link to="/properties" className="hero-button">
                        Explore Properties →
                    </Link>

                </div>

            </section>

            {/* Search Section */}
            <section className="search-section">

                <div className="search-heading">

                    <h2>Find Your Perfect Home</h2>

                    <p>
                        Search properties based on your preferences.
                    </p>

                </div>

                <div className="search-box">

                    {/* Location Filter */}
                    <div className="search-field">

                        <label>Location</label>

                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value="">Choose Location</option>
                            <option value="Gachibowli, Hyderabad">Gachibowli</option>
                            <option value="Miyapur, Hyderabad">Miyapur</option>
                            <option value="Kukatpally, Hyderabad">Kukatpally</option>
                        </select>

                    </div>

                    {/* Property Type Filter */}
                    <div className="search-field">

                        <label>Property Type</label>

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">All Properties</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Independent House">Independent House</option>
                        </select>

                    </div>

                    {/* Maximum Rent Filter */}
                    <div className="search-field">

                        <label>Maximum Rent</label>

                        <select
                            value={maxRent}
                            onChange={(e) => setMaxRent(e.target.value)}
                        >
                            <option value="">Select Budget</option>
                            <option value="15000">₹15,000</option>
                            <option value="20000">₹20,000</option>
                            <option value="25000">₹25,000</option>
                            <option value="30000">₹30,000</option>
                        </select>

                    </div>

                    {/* Search Button */}
                    <button
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {/* Clear Filters Button */}
                    <button
                        className="clear-button"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            </section>

            {/* Popular Locations Section */}
            <section className="popular-locations-section">

                <div className="popular-locations-heading">

                    <span>EXPLORE BY LOCATION</span>

                    <h2>Popular Locations</h2>

                    <p>
                        Discover rental homes in Hyderabad's most popular areas.
                    </p>

                </div>

                <div className="popular-locations-grid">

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Gachibowli, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                            alt="Gachibowli"
                        />

                        <div className="location-card-overlay">
                            <h3>Gachibowli</h3>
                            <p>Modern homes and premium apartments</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Miyapur, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800"
                            alt="Miyapur"
                        />

                        <div className="location-card-overlay">
                            <h3>Miyapur</h3>
                            <p>Comfortable family rental homes</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Kukatpally, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                            alt="Kukatpally"
                        />

                        <div className="location-card-overlay">
                            <h3>Kukatpally</h3>
                            <p>Affordable apartments and homes</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Kondapur, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
                            alt="Kondapur"
                        />

                        <div className="location-card-overlay">
                            <h3>Kondapur</h3>
                            <p>Stylish apartments and gated communities</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Madhapur, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
                            alt="Madhapur"
                        />

                        <div className="location-card-overlay">
                            <h3>Madhapur</h3>
                            <p>Modern homes close to IT hubs</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                    <div
                        className="location-card"
                        onClick={() => navigate("/properties?location=" + encodeURIComponent("Nizampet, Hyderabad"))}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
                            alt="Nizampet"
                        />

                        <div className="location-card-overlay">
                            <h3>Nizampet</h3>
                            <p>Budget-friendly family residences</p>
                            <span>Explore Properties →</span>
                        </div>
                    </div>

                </div>

            </section>

            {/* Why Choose RentRadar Section */}
            <section className="why-choose-section">

                <div className="why-choose-heading">

                    <span>WHY RENTRADAR</span>

                    <h2>Why Choose RentRadar?</h2>

                    <p>
                        We make your rental home search simple,
                        convenient and organized.
                    </p>

                </div>

                <div className="why-choose-grid">

                    <div className="why-card">
                        <div className="why-icon">🔍</div>

                        <h3>Easy Property Search</h3>

                        <p>
                            Find rental homes easily using location,
                            property type and budget filters.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">⚖️</div>

                        <h3>Compare Properties</h3>

                        <p>
                            Compare different properties and
                            understand their features before choosing.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">❤️</div>

                        <h3>Save Your Favorites</h3>

                        <p>
                            Save your favorite properties and
                            access them whenever you need.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">🏠</div>

                        <h3>Simple Experience</h3>

                        <p>
                            Explore rental properties through
                            a clean and user-friendly interface.
                        </p>
                    </div>

                </div>

            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">

                <div className="how-it-works-heading">

                    <span>SIMPLE PROCESS</span>

                    <h2>How RentRadar Works</h2>

                    <p>
                        Finding your perfect rental home is just three
                        simple steps away.
                    </p>

                </div>

                <div className="steps-container">

                    <div className="step-card">

                        <div className="step-number">01</div>

                        <div className="step-icon">🔍</div>

                        <h3>Search Properties</h3>

                        <p>
                            Explore rental homes using your preferred
                            location, property type and budget.
                        </p>

                    </div>

                    <div className="step-card">

                        <div className="step-number">02</div>

                        <div className="step-icon">⚖️</div>

                        <h3>Compare & Save</h3>

                        <p>
                            Compare property features and save your
                            favorite homes for later.
                        </p>

                    </div>

                    <div className="step-card">

                        <div className="step-number">03</div>

                        <div className="step-icon">🏡</div>

                        <h3>Choose Your Home</h3>

                        <p>
                            View property details and find a home
                            that matches your needs.
                        </p>

                    </div>

                </div>

            </section>

            {/* Featured Properties Section */}
            <section className="featured-section">

                <div className="section-heading">

                    <div>

                        <span>HANDPICKED FOR YOU</span>

                        <h2>Featured Properties</h2>

                        <p>
                            Explore some of our popular rental homes.
                        </p>

                    </div>

                    <Link to="/properties">
                        View All →
                    </Link>

                </div>

{/* Display only 3 featured properties */}
<div className="property-grid">

    {properties.length > 0 ? (

        properties.slice(0, 3).map((property) => (

            <PropertyCard
                key={property.id}
                property={property}
            />

        ))

    ) : (

        <p>Loading featured properties...</p>

    )}

</div>


            </section>

            {/* Call To Action Section */}
            <section className="home-cta-section">

                <div className="home-cta-content">

                    <span>YOUR NEXT HOME IS WAITING</span>

                    <h2>
                        Ready to Find Your
                        <br />
                        Perfect Home?
                    </h2>

                    <p>
                        Explore rental properties, compare your options
                        and discover a place that feels like home.
                    </p>

                    <Link to="/properties" className="home-cta-button">
                        Explore Properties →
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;


