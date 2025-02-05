// utils/formatNumber.js
export const formatNumber = (number) => {
    if (number >= 1e4) { // Only format if the number is 10000 or more
        if (number >= 1e9) {
            return `${(number / 1e9).toFixed(1)}B`; // Billions
        } else if (number >= 1e6) {
            return `${(number / 1e6).toFixed(1)}M`; // Millions
        } else if (number >= 1e3) {
            return `${(number / 1e3).toFixed(1)}k`; // Thousands
        }
    }
    return number.toString(); // Display full number if less than 10000
};