export const properties = {
    EMAIL_REGEX: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$",
    USER_REGEX: "^\[A-z\][A-z0-9-_]{3,23}$",
    PASSWORD_REGEX: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$",
    USERNAME_HELP: "Use 3 or max of 23 characters. You can use letters, numbers, underscores, hyphens",
    USERNAME_LENGTH_ERROR: "Length of your username must be 3 to 23 characters",
    USERNAME_INVALID: "Username must begin with a letter and you can use letters, numbers, underscores, hyphens.",
    EMAIL_INVALID: "Email address is invalid",
    PASSWORD_HELP: "Use 8 or max of 24 characters with a mix of uppercase and lowercase letters, numbers & symbols(!, @, #, $, %)",
    PASSWORD_LENGTH_ERROR: "Length of your password must be 8 to 24 characters",
    PASSWORD_WEAK: "Please choose a stronger password. Try a mix of uppercase and lowercase letters, numbers, and symbols(!, @, #, $, %).",
    CONFIRM_PASSWORD_ERROR: "These passwords didn’t match. Try again.",
    NO_SERVER_RESPONSE: "No Server Response",
    USERNAME_NOT_AVAILABLE: "Username Taken",
    SIGNUP_FAILED: "Failed to create account"
};
