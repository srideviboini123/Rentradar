
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
    getProperties,
    updateProperty
} from "../services/propertyService";

import "./AddProperty.css";

function EditProperty() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load existing property details
    useEffect(() => {

        async function loadProperty() {

            try {
                const data = await getProperties();

                const property = data.find(
                    (item) => String(item.id) === String(id)
                );

                if (!property) {
                    setError("Property not found.");
                    return;
                }

                // Check property ownership
                if (
                    String(property.ownerId) !== String(user.id)
                ) {
                    setError("You are not authorized to edit this property.");
                    return;
                }

                // Fill form with existing details
                setFormData({
                    title: property.title || "",
                    location: property.location || "",
                    rent: property.rent ?? "",
                    deposit: property.deposit ?? "",
                    bedrooms: property.bedrooms ?? "",
                    bathrooms: property.bathrooms ?? "",
                    area: property.area ?? "",
                    type: property.type || "Apartment",
                    image: property.image || "",
                    description: property.description || "",
                    furnishing: property.furnishing || "Unfurnished",
                    amenities: Array.isArray(property.amenities)
                        ? property.amenities.join(", ")
                        : property.amenities || "",
                    parking: property.parking || false,
                    availableFrom: property.availableFrom || ""
                });

            } catch (err) {
                console.error(err);
                setError("Unable to load property details.");
            } finally {
                setLoading(false);
            }
        }

        loadProperty();

    }, [id, user.id]);

    // Handle form changes
    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    // Save updated property
    async function handleSubmit(event) {

        event.preventDefault();
        setError("");

        try {
            setIsSubmitting(true);

            const updatedData = {
                ...formData,
                rent: Number(formData.rent),
                deposit: Number(formData.deposit),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                area: Number(formData.area),
                amenities: formData.amenities
                    .split(",")
                    .map(item => item.trim())
                    .filter(item => item !== "")
            };

            await updateProperty(id, updatedData);

            alert("Property updated successfully!");

            navigate("/owner/properties");

        } catch (err) {
            console.error(err);
            setError("Failed to update property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="add-property-page">
                <p>Loading property details...</p>
            </div>
        );
    }

    if (error && !formData.title) {
        return (
            <div className="add-property-page">
                <p className="form-error">{error}</p>

                <button
                    type="button"
                    className="add-property-btn"
                    onClick={() => navigate("/owner/properties")}
                >
                    Back to My Listings
                </button>
            </div>
        );
    }

    return (
        <div className="add-property-page">

            <div className="add-property-header">
                <h1>Edit Property</h1>
                <p>
                    Update your property details on RentRadar.
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
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
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

                {error && (
                    <p className="form-error">{error}</p>
                )}

                <button
                    type="submit"
                    className="add-property-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Updating Property..."
                        : "Update Property"}
                </button>

            </form>
        </div>
    );
}

export default EditProperty;
