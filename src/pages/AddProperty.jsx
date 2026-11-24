
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addProperty } from "../services/propertyService";
import "./AddProperty.css";
function AddProperty() {

    const navigate = useNavigate();
    const { user } = useAuth();

    // Store all property form values
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        rent: "",
        deposit: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        type: "Apartment",
        image: "",
        description: "",
        furnishing: "Unfurnished",
        amenities: "",
        parking: false,
        availableFrom: ""
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    // Handle form submission
    async function handleSubmit(event) {

        event.preventDefault();
        setError("");

        try {
            setIsSubmitting(true);

            const newProperty = {
                ...formData,
                rent: Number(formData.rent),
                deposit: Number(formData.deposit),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                area: Number(formData.area),
                amenities: formData.amenities
                    .split(",")
                    .map(item => item.trim())
                    .filter(item => item !== ""),
                ownerId: user.id,
                isDemo: false
            };

            await addProperty(newProperty);

            alert("Property added successfully!");

            navigate("/owner/properties");

        } catch (err) {
            setError("Failed to add property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

return (
    <div className="add-property-page">

        <div className="add-property-header">
            <h1>Add New Property</h1>
            <p>
                Enter your property details to list your
                rental property on RentRadar.
            </p>
        </div>

        <form
            className="add-property-form"
            onSubmit={handleSubmit}
        >

            {/* Basic Information */}
            <div className="form-section">
                <h2>Basic Information</h2>

                <div className="form-group">
                    <label>Property Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter property title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Example: Gachibowli, Hyderabad"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Property Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Independent House">
                            Independent House
                        </option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>
            </div>

            {/* Pricing Details */}
            <div className="form-section">
                <h2>Pricing Details</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Monthly Rent (₹)</label>
                        <input
                            type="number"
                            name="rent"
                            placeholder="Enter monthly rent"
                            value={formData.rent}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Security Deposit (₹)</label>
                        <input
                            type="number"
                            name="deposit"
                            placeholder="Enter security deposit"
                            value={formData.deposit}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                </div>
            </div>

            {/* Property Features */}
            <div className="form-section">
                <h2>Property Features</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Area (sqft)</label>
                        <input
                            type="number"
                            name="area"
                            placeholder="Example: 1200"
                            value={formData.area}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label>Furnishing</label>
                    <select
                        name="furnishing"
                        value={formData.furnishing}
                        onChange={handleChange}
                    >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">
                            Semi-Furnished
                        </option>
                        <option value="Fully-Furnished">
                            Fully-Furnished
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Amenities</label>
                    <input
                        type="text"
                        name="amenities"
                        placeholder="Lift, Security, Gym, Power Backup"
                        value={formData.amenities}
                        onChange={handleChange}
                    />
                    <small>Separate each amenity with a comma.</small>
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="parking"
                            checked={formData.parking}
                            onChange={handleChange}
                        />
                        Parking Available
                    </label>
                </div>
            </div>

            {/* Additional Details */}
            <div className="form-section">
                <h2>Additional Details</h2>

                <div className="form-group">
                    <label>Property Image URL</label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Paste property image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your property..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Available From</label>
                    <input
                        type="date"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Submit */}
            {error && (
                <p className="form-error">{error}</p>
            )}

            <button
                type="submit"
                className="add-property-btn"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Adding Property..."
                    : "Add Property"}
            </button>

        </form>
    </div>
);

}
export default AddProperty;
