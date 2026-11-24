
import { Link } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {

    return (

        <div className="property-card">

            {/* Property Image */}
            <img
                src={property.image}
                alt={property.title}
                className="property-image"
            />

            <div className="property-info">

                {/* Property Type */}
                <span className="property-type">
                    {property.type}
                </span>

                {/* Property Title */}
                <h3>{property.title}</h3>

                {/* Location */}
                <p className="property-location">
                    📍 {property.location}
                </p>

                {/* Monthly Rent */}
                <h2>
                    ₹{property.rent.toLocaleString("en-IN")}
                    <span>/ month</span>
                </h2>

                {/* Property Features */}
                <div className="property-features">

                    <span>🛏 {property.bedrooms} Beds</span>

                    <span>🚿 {property.bathrooms} Baths</span>

                    <span>📐 {property.area} sqft</span>

                </div>

                {/* View Details */}
                <Link
                    to={`/property/${property.id}`}
                    className="property-button"
                >
                    View Details
                </Link>

            </div>

        </div>

    );
}

export default PropertyCard;
