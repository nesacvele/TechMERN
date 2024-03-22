const regexEmailValidation = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;

export const checkEmailValidation = (email) => {
    return regexEmailValidation.test(email);
};
