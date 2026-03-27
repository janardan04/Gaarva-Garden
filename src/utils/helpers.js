// Utility / helper functions

/**
 * Format a date string to a readable format
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-IN', options);
};

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  return /^[+]?[0-9\s-]{10,15}$/.test(phone);
};

/**
 * Truncate text to a given length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
