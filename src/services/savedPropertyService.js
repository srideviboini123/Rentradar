
const STORAGE_KEY = "rentRadarSavedProperties";

// Get saved properties for a particular user
export function getSavedProperties(userId) {
    const savedData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    return savedData[userId] || [];
}

// Save a property for a particular user
export function saveProperty(userId, propertyId) {
    const savedData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const userProperties = savedData[userId] || [];

    const id = String(propertyId);

    if (!userProperties.includes(id)) {
        userProperties.push(id);
    }

    savedData[userId] = userProperties;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedData)
    );
}

// Remove a saved property
export function removeSavedProperty(userId, propertyId) {
    const savedData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const userProperties = savedData[userId] || [];

    savedData[userId] = userProperties.filter(
        id => id !== String(propertyId)
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedData)
    );
}

// Check whether a property is already saved
export function isPropertySaved(userId, propertyId) {
    const savedProperties = getSavedProperties(userId);

    return savedProperties.includes(String(propertyId));
}
