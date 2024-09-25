const rateLimit = require("express-rate-limit");

const stopLimit = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 3, // Limit each IP to 3 requests per `window` (here, per 1 minutes).
	message: "trop de tantative veuillez ressayer dans 1 minutes",
});

module.exports = stopLimit;