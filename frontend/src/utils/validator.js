// ----------------------------------------------- Register Validation --------------------------------------
export function validateRegistration(data) {
  const errors = {};

  // Name
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  // Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(data.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = "Password must contain at least one number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ----------------------------------------------- Login Validation --------------------------------------
export function validateLogin(data) {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
