/**
 * Booking validation utilities (string error = invalid, "" = valid)
 */

/**
 * Validates that a value exists and is not just whitespace
 * @param {string} value
 * @param {string} fieldName
 * @returns {string}
 */
export const validateRequiredText = (value, fieldName) => {
    const criteria = [
        { test: (v) => v === undefined || v === null, message: `${fieldName} is required` },
        { test: (v) => typeof v !== 'string' || v.trim().length === 0, message: `${fieldName} must be a string.`},
        { test: (v) => v.trim().length === 0, message: `${fieldName} cannot be empty` }
    ];

    return validate(value,criteria);
};

/**
 * Validate SalonID
 * @param {any} salonId
 * @returns {string}
 */
export const validateSalonId = (salonId) => {
    const criteria = [
        { test: (v) => v === undefined || v === null, message: "SalonID is required" },
        { test: (v) => Number.isNaN(Number(v)), message: "SalonID must be a number"},
        { test: (v) => !Number.isInteger(Number(v)), message: "SalonID must be an integer"},
        { test: (v) => Number(v) < 1 || Number(v) > 12, message: "SalonID must be between 1 and 12"}
    ];

    return validate(salonId,criteria);
};

/**
 * Validates email
 * @param {string} email
 * @returns {string}
 */
export const validateKundeEmail = (email) => {
    const criteria = [
        { test: (v) => v === undefined || v === null, message: "Email is required" },
        { test: (v) => typeof v !== 'string', message: "Email must be a string."},
        { test: (v) => v.trim().length === 0, message: "Email cannot be empty" },
        { test: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: "Email must be a valid email address"}
    ];

    return validate(email,criteria);
};

/**
 * Validates phone number (basic)
 * Accept digits/spaces/+/()- and requires at least 8 digits total
 * @param {string} KundeTelefon
 * @returns {string}
 */
export const validateKundeTelefon = (KundeTelefon) => {
    const criteria = [
        { test: (v) => v === undefined || v === null, message: "Telefonnummer is required" },
        { test: (v) => typeof v !== 'string', message: "Telefonnummer must be a string."},
        { test: (v) => v.trim().length === 0, message: "Telefonnummer cannot be empty" },
        { test: (v) => !/^\d{8,}$/.test(v.trim()), message: "Telefonnummer must be at least 8 digits long"}
    ];

    return validate(KundeTelefon,criteria);
};

/**
 * Validates BestillingDato as DATEONLY string: YYYY-MM-DD
 * @param {string} dateStr
 * @returns {string}
 */
export const validateBestillingDato = (dateStr) => {
    const criteria = [
        { test: (v) => v === undefined || v === null, message: "Bestillingsdato is required" },
        { test: (v) => typeof v !== 'string', message: "Bestillingsdato must be a string."},
        { test: (v) => v.trim().length === 0, message: "Bestillingsdato cannot be empty" },
        {
            test: (v) => !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(v.trim()),
            message: "Bestillingsdato must be in format YYYY-MM-DDTHH:mm (optionally with :ss)."
        },
        {
            test: (v) => Number.isNaN(Date.parse(v.trim())),
            message: "Bestillingsdato must be a valid date/time."
        }
    ];

    return validate(dateStr,criteria);
};


/**
 * Validates the full booking payload.
 * Returns an object (more useful for APIs than a single string).
 * @param {Object} bookingData
 * @returns {{isValid: boolean, errors: {}}}
 */
export const validateBookingData = (bookingData) => {
    const errors = {};
    const data = bookingData ?? {};

    const checks = [
        { field: "SalonID", errorMessage: validateSalonId(data.SalonID) },
        { field: "KundeFornavn", errorMessage: validateRequiredText(data.KundeFornavn, "KundeFornavn") },
        { field: "KundeEfternavn", errorMessage: validateRequiredText(data.KundeEfternavn, "KundeEfternavn") },
        { field: "KundeTelefon", errorMessage: validateKundeTelefon(data.KundeTelefon) },
        { field: "KundeEmail", errorMessage: validateKundeEmail(data.KundeEmail) },
        { field: "BestillingDato", errorMessage: validateBestillingDato(data.BestillingDato) }
    ];

    for (const check of checks) {
        if (check.errorMessage) {
            errors[check.field] = check.errorMessage;
        }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Generic validation function
 * @param {any} value
 * @param {Array<{test: Function, message: string}>} criteria
 * @returns {string}
 */
function validate(value, criteria) {
    for (let criterion of criteria) {
        if (criterion.test(value)) {
            return criterion.message;
        }
    }
    return "";
}