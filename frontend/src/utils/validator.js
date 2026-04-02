// ----------------------------------------------- Register Validation --------------------------------------
export function validateRegistration(data) {
  // All fields check
  if (!data.name || !data.email || !data.password) {
    return {
      isValid: false,
      errors: { general: "All fields are required" },
    };
  }

  // Name
  if (data.name.trim().length < 3) {
    return {
      isValid: false,
      errors: { name: "Name must be at least 3 characters long" },
    };
  }

  if (!/^[A-Za-z\s]+$/.test(data.name)) {
    return {
      isValid: false,
      errors: { name: "Name can only contain letters and spaces" },
    };
  }

  // Email
  if (!data.email) {
    return {
      isValid: false,
      errors: { email: "Email is required" },
    };
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    return {
      isValid: false,
      errors: { email: "Email is invalid" },
    };
  }

  // Password
  if (!data.password) {
    return {
      isValid: false,
      errors: { password: "Password is required" },
    };
  }

  if (data.password.length < 8) {
    return {
      isValid: false,
      errors: { password: "Password must be at least 8 characters long" },
    };
  }

  // if (!/[A-Z]/.test(data.password)) {
  //   return {
  //     isValid: false,
  //     errors: {
  //       password: "Password must contain at least one uppercase letter",
  //     },
  //   };
  // }

  // if (!/[a-z]/.test(data.password)) {
  //   return {
  //     isValid: false,
  //     errors: {
  //       password: "Password must contain at least one lowercase letter",
  //     },
  //   };
  // }

  // if (!/[0-9]/.test(data.password)) {
  //   return {
  //     isValid: false,
  //     errors: { password: "Password must contain at least one number" },
  //   };
  // }

  return { isValid: true, errors: {} };
}
// ----------------------------------------------- Login Validation --------------------------------------
export function validateLogin(data) {
  if (!data.email || !data.password) {
    return {
      isValid: false,
      errors: { general: "All fields are required" },
    };
  }
  // Email
  if (!data.email) {
    return {
      isValid: false,
      errors: { email: "Email is required" },
    };
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    return {
      isValid: false,
      errors: { email: "Email is invalid" },
    };
  }

  // Password
  if (!data.password) {
    return {
      isValid: false,
      errors: { password: "Password is required" },
    };
  }

  return { isValid: true, errors: {} };
}
