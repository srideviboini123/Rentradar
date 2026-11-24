
const API_URL = "http://localhost:3000/properties";

// Fetch all properties
export async function getProperties() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    const data = await response.json();

    return data;
}

// Add a new property
export async function addProperty(property) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
    });

    if (!response.ok) {
        throw new Error("Failed to add property");
    }

    const data = await response.json();

    return data;
}



// Update an existing property
export async function updateProperty(id, updatedData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update property");
    }

    const data = await response.json();

    return data;
}



// Delete an existing property
export async function deleteProperty(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete property");
    }

    return true;
}

const INQUIRY_API_URL = "http://localhost:3000/inquiries";

// Create a new tenant inquiry
export async function createInquiry(inquiryData) {
    const response = await fetch(INQUIRY_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
    });

    if (!response.ok) {
        throw new Error("Failed to send inquiry");
    }

    return await response.json();
}

// Get all tenant inquiries
export async function getInquiries() {
    const response = await fetch(INQUIRY_API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
    }

    return await response.json();
}

const VISIT_REQUEST_API_URL = "http://localhost:3000/visitRequests";

// Create a new property visit request
export async function createVisitRequest(visitData) {
    const response = await fetch(VISIT_REQUEST_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(visitData)
    });

    if (!response.ok) {
        throw new Error("Failed to create visit request");
    }

    return await response.json();
}

// Fetch all property visit requests
export async function getVisitRequests() {
    const response = await fetch(VISIT_REQUEST_API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch visit requests");
    }

    return await response.json();
}


 
// Update an existing property visit request
export async function updateVisitRequest(id, updatedData) {
    const response = await fetch(`${VISIT_REQUEST_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
        throw new Error("Failed to update visit request");
    }

    return await response.json();
}
