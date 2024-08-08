const validatePasswordStrength = (password) => {
    const errors = [];

    // Check if password is at least 8 characters long
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter.');
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter.');
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one digit.');
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character.');
    }

    

    return errors.length === 0 ? { valid: true } : { valid: false, errors };
};

module.exports = { validatePasswordStrength };
