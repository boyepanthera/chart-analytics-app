import dataValidator from 'validator';
import isEmpty from 'is-empty';

const validateLogin = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";// Email checks
    if (dataValidator.isEmpty(data.email)) {
        errors.email = "email field is required";
    } else if (!dataValidator.isEmail(data.email)) {
        errors.email = "input email is invalid";
    }// Password checks
    if (dataValidator.isEmpty(data.password)) {
        errors.password = "password field is required";
    }return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateLogin;