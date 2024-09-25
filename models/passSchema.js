const passwordValidator = require('password-validator');

// Create a schema
const passSchema = new passwordValidator();

// Add properties to it
passSchema
.is().min(8) // Minimum length 8
.is().max(20) // Maximum length 20
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
.has().digits(2) // Must have at least 2 digits
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Password', 'Password123']); // Blacklist these values

// Validate against a password string
console.log(passSchema.validate('validPASS123'));
// => true
console.log(passSchema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(passSchema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]

module.exports = passSchema;