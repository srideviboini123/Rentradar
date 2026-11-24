
const STORAGE_KEY = "rentRadarCompareProperties";

// Get compared property IDs for a user
export function getCompareProperties(userId) {
    const compareData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    return compareData[userId] || [];
}

// Add property to compare list
export function addCompareProperty(userId, propertyId) {
    const compareData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const userProperties = compareData[userId] || [];

    const id = String(propertyId);

    // Avoid duplicate properties
    if (!userProperties.includes(id)) {

        // Allow maximum 3 properties
        if (userProperties.length >= 3) {
            return {
                success: false,
                message: "You can compare up to 3 properties only."
            };
        }

        userProperties.push(id);
    }

    compareData[userId] = userProperties;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(compareData)
    );

    return {
        success: true,
        message: "Property added to compare list."
    };
}

// Remove property from compare list
export function removeCompareProperty(userId, propertyId) {
    const compareData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    );

    const userProperties = compareData[userId] || [];

    compareData[userId] = userProperties.filter(
        id => id !== String(propertyId)
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(compareData)
    );
}

// Check whether property is already added
export function isPropertyInCompare(userId, propertyId) {
    const compareProperties = getCompareProperties(userId);

    return compareProperties.includes(String(propertyId));
}
