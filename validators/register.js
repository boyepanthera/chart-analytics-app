import dataValidator from 'validator';
import isEmpty from 'is-empty';

function validateRegistration(data) {

    let errors = {};
    // Conversion of empty inputs to string since validator doesn't accept undefined
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";//    Name checks
    if (dataValidator.isEmpty(data.firstName)) {
      errors.firsName = "First Name field is required";
    }
    if (dataValidator.isEmpty(data.lastName)) {
      errors.lastName = "Last Name field is required";
    }
    
    // email validation
    if (dataValidator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!dataValidator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }// Password validation
    if (dataValidator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }if (dataValidator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }if (!dataValidator.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be at least 7 characters";
    }if (!dataValidator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
        return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateRegistration;