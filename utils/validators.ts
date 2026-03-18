// Form validation helpers

/**
 * Validates an email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (10+ digits, allows spaces/dashes/+)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks if a string is non-empty after trimming
 */
export const isNonEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates that pickup date is not in the past
 */
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date >= now;
};

/**
 * Validates that return date is after pickup date
 */
export const isReturnAfterPickup = (
  pickupDate: string,
  returnDate: string
): boolean => {
  return new Date(returnDate) > new Date(pickupDate);
};
