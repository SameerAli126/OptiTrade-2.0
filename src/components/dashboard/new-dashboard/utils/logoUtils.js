/**
 * Utility function to fetch the logo URL.
 * If the primary logo URL (logo_light) is not available, fallback to the Clearbit logo.
 * @param {Object} stock - The stock object from the API.
 * @returns {Promise<string>} - The logo URL.
 */
export const getLogoUrl = async (stock) => {
    const primaryLogoUrl = stock.logo_light; // Primary logo URL
    const fallbackLogoUrl = stock.clearbit_logo; // Fallback Clearbit logo URL

    try {
        // Check if the primary logo URL exists and is valid
        const response = await fetch(primaryLogoUrl, { method: 'HEAD' });
        if (response.ok) {
            return primaryLogoUrl; // Return primary logo if available
        }
    } catch (error) {
        console.error(`Error fetching primary logo for ${stock.symbol}:`, error);
    }

    // If primary logo is not available, return the Clearbit logo
    return fallbackLogoUrl;
};